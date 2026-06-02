import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { verifyAdminSecret } from "@/lib/request-meta";

export const runtime = "nodejs";

function serializeArticle(article: {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: Date;
  readingTime: number;
  featuredImage: string | null;
  shortAbstract: string;
  articleBody?: string;
  seoTitle: string | null;
  seoDescription: string | null;
  ctaModule: string | null;
  isFeatured: boolean;
  relatedSlugs?: string | null;
}) {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    author: article.author,
    publishDate: article.publishDate.toISOString(),
    readingTime: article.readingTime,
    featuredImage: article.featuredImage,
    shortAbstract: article.shortAbstract,
    ...(article.articleBody !== undefined
      ? { articleBody: article.articleBody }
      : {}),
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    ctaModule: article.ctaModule,
    isFeatured: article.isFeatured,
    relatedSlugs: article.relatedSlugs,
  };
}

/** GET /api/insights */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10))
    );
    const skip = (page - 1) * limit;

    if (slug) {
      const article = await prisma.insightArticle.findFirst({
        where: { slug, status: "PUBLISHED" },
      });
      if (!article) {
        return jsonError("Not found", 404);
      }
      return jsonOk(serializeArticle(article), {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      });
    }

    const where = {
      status: "PUBLISHED" as const,
      ...(category ? { category } : {}),
      ...(featured === "true" ? { isFeatured: true } : {}),
    };

    const [articles, total, categoryRows] = await Promise.all([
      prisma.insightArticle.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { publishDate: "desc" }],
        skip,
        take: limit,
      }),
      prisma.insightArticle.count({ where }),
      prisma.insightArticle.findMany({
        where: { status: "PUBLISHED" },
        select: { category: true },
        distinct: ["category"],
      }),
    ]);

    return jsonOk(
      {
        articles: articles.map((a) => serializeArticle(a)),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + limit < total,
        },
        categories: categoryRows.map((c) => c.category).sort(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    return handleRouteError(err);
  }
}

const ArticleSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  category: z.string().min(1).max(100),
  author: z.string().min(1).max(120),
  publishDate: z.string().datetime().optional(),
  readingTime: z.number().int().min(1).max(120),
  featuredImage: z.string().url().optional().nullable(),
  shortAbstract: z.string().min(1).max(500),
  articleBody: z.string().min(1),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  relatedSlugs: z.string().max(500).optional().nullable(),
  ctaModule: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

/** POST /api/insights admin */
export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const json = await request.json().catch(() => null);
    const parsed = ArticleSchema.safeParse(json);
    if (!parsed.success) {
      return jsonError("Invalid payload", 400, parsed.error.flatten());
    }

    const article = await prisma.insightArticle.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        category: parsed.data.category,
        author: parsed.data.author,
        readingTime: parsed.data.readingTime,
        shortAbstract: parsed.data.shortAbstract,
        articleBody: parsed.data.articleBody,
        featuredImage: parsed.data.featuredImage ?? null,
        seoTitle: parsed.data.seoTitle ?? null,
        seoDescription: parsed.data.seoDescription ?? null,
        relatedSlugs: parsed.data.relatedSlugs ?? null,
        ctaModule: parsed.data.ctaModule ?? null,
        publishDate: parsed.data.publishDate
          ? new Date(parsed.data.publishDate)
          : new Date(),
        status: parsed.data.status ?? "DRAFT",
        isFeatured: parsed.data.isFeatured ?? false,
      },
    });

    return jsonOk(
      { id: article.id, slug: article.slug, status: article.status },
      { status: 201 }
    );
  } catch (err) {
    return handleRouteError(err);
  }
}

/** PATCH /api/insights?slug=... admin */
export async function PATCH(request: NextRequest) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) {
      return jsonError("slug required", 400);
    }

    const json = await request.json().catch(() => null);
    const parsed = ArticleSchema.partial().safeParse(json);
    if (!parsed.success) {
      return jsonError("Invalid payload", 400, parsed.error.flatten());
    }

    const { publishDate, ...rest } = parsed.data;
    const article = await prisma.insightArticle.update({
      where: { slug },
      data: {
        ...rest,
        ...(publishDate ? { publishDate: new Date(publishDate) } : {}),
      },
    });

    return jsonOk({
      id: article.id,
      slug: article.slug,
      status: article.status,
    });
  } catch (err) {
    return handleRouteError(err);
  }
}

/** DELETE /api/insights?slug=... admin */
export async function DELETE(request: NextRequest) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) {
      return jsonError("slug required", 400);
    }

    await prisma.insightArticle.delete({ where: { slug } });
    return jsonOk({ success: true, slug });
  } catch (err) {
    return handleRouteError(err);
  }
}
