import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { verifyAdminSecret } from "@/lib/request-meta";

export const runtime = "nodejs";

/** GET /api/admin/contacts */
export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count(),
    ]);

    return jsonOk({
      contacts: rows.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + limit < total,
      },
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
