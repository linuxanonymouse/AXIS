import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { verifyAdminSecret } from "@/lib/request-meta";
import { processDiagnosticApplication } from "@/lib/process-application";

export const runtime = "nodejs";

/** POST /api/diagnostic/process process pending diagnostics (admin/cron) */
export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const id = request.nextUrl.searchParams.get("id");
    const force = request.nextUrl.searchParams.get("force") === "true";

    if (id) {
      if (force) {
        await prisma.diagnosticApplication.update({
          where: { id },
          data: { isProcessed: false },
        });
      }
      await processDiagnosticApplication(id);
      return jsonOk({ success: true, processed: [id] });
    }

    const pending = await prisma.diagnosticApplication.findMany({
      where: { isProcessed: false, submissionStatus: "submitted" },
      select: { id: true },
      take: 25,
    });

    for (const row of pending) {
      await processDiagnosticApplication(row.id);
    }

    return jsonOk({
      success: true,
      processed: pending.map((p) => p.id),
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
