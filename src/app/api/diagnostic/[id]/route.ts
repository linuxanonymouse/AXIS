import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { verifyAdminSecret } from "@/lib/request-meta";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/diagnostic/:id internal diagnostic output (admin) */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const { id } = await context.params;
    const view = request.nextUrl.searchParams.get("view") ?? "internal";

    const record = await prisma.diagnosticApplication.findUnique({
      where: { id },
    });

    if (!record) {
      return jsonError("Not found", 404);
    }

    const scores = {
      overallAlignment: record.overallAlignmentScore,
      infrastructure: record.infrastructureScore,
      distribution: record.distributionScore,
      intelligence: record.intelligenceScore,
      monetization: record.monetizationScore,
      expansion: record.expansionScore,
    };

    if (view === "client") {
      return jsonOk({
        id: record.id,
        organizationName: record.organizationName,
        status: record.internalReviewStatus,
        clientFacingSummary: record.clientFacingSummary,
        recommendedAxisPathway: record.recommendedAxisPathway,
        primaryConstraint: record.primaryConstraint,
        scores,
        processedAt: record.isProcessed ? record.updatedAt.toISOString() : null,
      });
    }

    return jsonOk({
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      organizationName: record.organizationName,
      applicantName: record.applicantName,
      email: record.email,
      businessModel: record.businessModel,
      revenueRange: record.revenueRange,
      teamSize: record.teamSize,
      primaryObjective: record.primaryObjective,
      businessStage: record.businessStage,
      website: record.website,
      industry: record.industry,
      location: record.location,
      role: record.role,
      rawResponses: record.rawResponses,
      submissionStatus: record.submissionStatus,
      isProcessed: record.isProcessed,
      scores,
      primaryConstraint: record.primaryConstraint,
      primaryConstraintExplanation: record.primaryConstraintExplanation,
      secondaryConstraints: record.secondaryConstraints,
      recommendedAxisPathway: record.recommendedAxisPathway,
      businessMaturityClass: record.businessMaturityClass,
      strategicInsight: record.strategicInsight,
      internalReviewStatus: record.internalReviewStatus,
      nextStepRecommendation: record.nextStepRecommendation,
      clientFacingSummary: record.clientFacingSummary,
      internalNotes: record.internalNotes,
    });
  } catch (err) {
    return handleRouteError(err);
  }
}

/** PATCH /api/diagnostic/:id update review fields (admin) */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    if (!verifyAdminSecret(request)) {
      return jsonError("Unauthorized", 401);
    }

    const { id } = await context.params;
    const json = await request.json().catch(() => null);

    const allowed = [
      "internalReviewStatus",
      "nextStepRecommendation",
      "clientFacingSummary",
      "internalNotes",
    ] as const;

    const data: Record<string, string> = {};
    if (json && typeof json === "object") {
      for (const key of allowed) {
        if (key in json && typeof (json as Record<string, unknown>)[key] === "string") {
          data[key] = (json as Record<string, string>)[key];
        }
      }
    }

    const record = await prisma.diagnosticApplication.update({
      where: { id },
      data,
    });

    return jsonOk({ success: true, id: record.id });
  } catch (err) {
    return handleRouteError(err);
  }
}
