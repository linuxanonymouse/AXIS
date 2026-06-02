import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { getRequestMeta } from "@/lib/request-meta";
import { dispatchAutomation } from "@/lib/automation";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  organization: z.string().min(1).max(160),
  email: z.string().email().max(160),
  brief: z.string().min(1).max(4000),
  phone: z.string().max(30).optional().default(""),
  website: z.string().max(300).optional().default(""),
  projectType: z.string().max(100).optional().default(""),
  budget: z.string().max(60).optional().default(""),
  timeline: z.string().max(60).optional().default(""),
  referralSource: z.string().max(300).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return jsonError("Invalid payload", 400, parsed.error.flatten());
    }

    const meta = getRequestMeta(request);

    const record = await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name.trim(),
        organization: parsed.data.organization.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        brief: parsed.data.brief.trim(),
        phone: parsed.data.phone?.trim() || null,
        website: parsed.data.website?.trim() || null,
        projectType: parsed.data.projectType?.trim() || null,
        budget: parsed.data.budget?.trim() || null,
        timeline: parsed.data.timeline?.trim() || null,
        referralSource: parsed.data.referralSource?.trim() || null,
        sourcePath: meta.sourcePath,
        userAgent: meta.userAgent,
        ipHash: meta.ipHash,
      },
    });

    await dispatchAutomation({
      type: "contact_submission",
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      name: record.name,
      organization: record.organization,
      email: record.email,
      brief: record.brief,
      phone: record.phone,
      website: record.website,
      projectType: record.projectType,
      budget: record.budget,
      timeline: record.timeline,
      referralSource: record.referralSource,
    });

    return jsonOk(
      {
        success: true,
        message:
          "Project request received. Our operations team will respond within 24 hours.",
        id: record.id,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return handleRouteError(err);
  }
}
