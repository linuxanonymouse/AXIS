export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { jsonOk } from "@/lib/api";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.$runCommandRaw({ ping: 1 });
    const counts = await Promise.all([
      prisma.diagnosticApplication.count(),
      prisma.contactSubmission.count(),
      prisma.insightArticle.count({ where: { status: "PUBLISHED" } }),
      prisma.newsletterSubscriber.count(),
    ]);

    return jsonOk({
      ok: true,
      database: "connected",
      counts: {
        applications: counts[0],
        contacts: counts[1],
        publishedInsights: counts[2],
        briefSubscribers: counts[3],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const anyErr = err as { code?: string; message?: string } | undefined;
    if (anyErr?.code === "ECONNREFUSED") {
      return Response.json(
        {
          ok: false,
          database: "unavailable",
          reason: "PostgreSQL connection refused",
          hint:
            "Make sure Postgres is installed and running on localhost:5432, then run `npm run prisma:migrate`.",
        },
        { status: 503 }
      );
    }

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

