import { NextRequest } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { getRequestMeta } from "@/lib/request-meta";
import { parseApplyPayload } from "@/lib/validators/apply-payload";

export const runtime = "nodejs";

const PLACEHOLDER = {
  organizationName: "",
  applicantName: "",
  email: "draft@axis.local",
  businessModel: "",
  revenueRange: "under_100k",
  teamSize: "solo",
  primaryObjective: "",
  businessStage: "pre_revenue",
} as const;

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    if (!json || typeof json !== "object") {
      return jsonError("Invalid payload", 400);
    }

    const meta = getRequestMeta(request);
    const incoming = json as Record<string, unknown>;
    const rawJson = JSON.parse(JSON.stringify(incoming));
    const draftToken =
      typeof incoming.draftToken === "string" && incoming.draftToken
        ? incoming.draftToken
        : crypto.randomUUID();

    const parsed = parseApplyPayload(json);
    const hasCore = !("error" in parsed);

    const existing = await prisma.diagnosticApplication.findFirst({
      where: { draftToken },
    });

    const record = existing
      ? await prisma.diagnosticApplication.update({
          where: { id: existing.id },
          data: {
            ...(hasCore ? parsed.data : {}),
            rawResponses: rawJson,
            submissionStatus: "draft",
            internalReviewStatus: "Draft",
            ipHash: meta.ipHash,
            userAgent: meta.userAgent,
          },
        })
      : await prisma.diagnosticApplication.create({
          data: {
            ...PLACEHOLDER,
            ...(hasCore ? parsed.data : {}),
            rawResponses: rawJson,
            draftToken,
            submissionStatus: "draft",
            internalReviewStatus: "Draft",
            ipHash: meta.ipHash,
            userAgent: meta.userAgent,
          },
        });

    return jsonOk({
      success: true,
      draftToken: record.draftToken,
      id: record.id,
    });
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) return jsonError("token required", 400);

    const record = await prisma.diagnosticApplication.findFirst({
      where: { draftToken: token },
    });

    if (!record || record.submissionStatus !== "draft") {
      return jsonError("Not found", 404);
    }

    const stored =
      record.rawResponses && typeof record.rawResponses === "object"
        ? (record.rawResponses as Record<string, unknown>)
        : {};

    return jsonOk({
      organizationName: record.organizationName,
      applicantName: record.applicantName,
      email: record.email === "draft@axis.local" ? "" : record.email,
      businessModel: record.businessModel,
      revenueRange: record.revenueRange,
      teamSize: record.teamSize,
      primaryObjective: record.primaryObjective,
      businessStage: record.businessStage,
      website: record.website,
      industry: record.industry,
      location: record.location,
      role: record.role,
      draftToken: record.draftToken,
      ...stored,
    });
  } catch (err) {
    return handleRouteError(err);
  }
}
