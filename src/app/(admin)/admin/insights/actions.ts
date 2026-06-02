"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveInsightAction(data: any) {
  const isEditing = !!data.id;
  
  if (isEditing) {
    await prisma.insightArticle.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        author: data.author,
        readingTime: parseInt(data.readingTime, 10) || 5,
        featuredImage: data.featuredImage || null,
        shortAbstract: data.shortAbstract,
        articleBody: data.articleBody,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        relatedSlugs: data.relatedSlugs || null,
        ctaModule: data.ctaModule || null,
        isFeatured: data.isFeatured === "true" || data.isFeatured === true,
        status: data.status,
      }
    });
  } else {
    await prisma.insightArticle.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        author: data.author,
        readingTime: parseInt(data.readingTime, 10) || 5,
        featuredImage: data.featuredImage || null,
        shortAbstract: data.shortAbstract,
        articleBody: data.articleBody,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        relatedSlugs: data.relatedSlugs || null,
        ctaModule: data.ctaModule || null,
        isFeatured: data.isFeatured === "true" || data.isFeatured === true,
        status: data.status,
      }
    });
  }

  revalidatePath("/insights");
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}

export async function deleteInsightAction(id: string) {
  await prisma.insightArticle.delete({
    where: { id },
  });
  revalidatePath("/insights");
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}
