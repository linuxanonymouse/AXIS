import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { getRequestMeta } from "@/lib/request-meta";
import { dispatchAutomation } from "@/lib/automation";

export const runtime = "nodejs";

const BriefsSchema = z.object({
  email: z.string().email().max(160),
  role: z.string().max(120).optional(),
  company: z.string().max(160).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = BriefsSchema.safeParse(json);

    if (!parsed.success) {
      return jsonError("Invalid payload", 400, parsed.error.flatten());
    }

    const meta = getRequestMeta(request);
    const email = parsed.data.email.trim().toLowerCase();

    const record = await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: {
        email,
        role: parsed.data.role?.trim() || null,
        company: parsed.data.company?.trim() || null,
        sourcePath: meta.sourcePath,
      },
      update: {
        role: parsed.data.role?.trim() || null,
        company: parsed.data.company?.trim() || null,
        sourcePath: meta.sourcePath,
      },
    });

    await dispatchAutomation({
      type: "axis_briefs_subscription",
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      email: record.email,
      role: record.role,
      company: record.company,
    });

    return jsonOk({
      success: true,
      message: "Subscribed to Axis Briefs.",
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
