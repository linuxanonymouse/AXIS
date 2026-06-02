import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, handleRouteError } from "@/lib/api";
import { getRequestMeta } from "@/lib/request-meta";
import { dispatchAutomation } from "@/lib/automation";
import { queueDiagnosticProcessing } from "@/lib/process-application";
import { parseApplyPayload } from "@/lib/validators/apply-payload";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    const meta = getRequestMeta(request);

    if (json?.type === "deployment") {
      const record = await prisma.deploymentRequest.create({
        data: {
          projectName: json.projectName,
          email: json.email,
          requestCategory: json.requestCategory,
          techStack: json.techStack,
          currentProcess: json.currentProcess,
          bottleneck: json.bottleneck,
          desiredOutcome: json.desiredOutcome,
          businessImpact: json.businessImpact,
          systemAccess: json.systemAccess,
          completionDate: json.completionDate,
          internalOwner: json.internalOwner,
          priority: json.priority,
          supportUrl: json.supportUrl,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        }
      });

      await dispatchAutomation({
        type: "deployment_request",
        id: record.id,
        createdAt: record.createdAt.toISOString(),
        email: record.email,
        name: record.projectName,
        projectType: record.requestCategory,
      });

      return jsonOk({ success: true, id: record.id });
    }

    if (json?.type === "operator") {
      const record = await prisma.operatorApplication.create({
        data: {
          name: json.name,
          email: json.email,
          currentRole: json.currentRole,
          experienceDuration: json.experienceDuration,
          activeClients: json.activeClients,
          clientAcquisition: json.clientAcquisition,
          realisticClients: json.realisticClients,
          revenueRange: json.revenueRange,
          primaryLimitation: json.primaryLimitation,
          deliveryMethod: json.deliveryMethod,
          relationshipManagement: json.relationshipManagement,
          interestReason: json.interestReason,
          timeline: json.timeline,
          bringClients: json.bringClients,
          whiteLabelComfort: json.whiteLabelComfort,
          portfolioUrl: json.portfolioUrl,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        }
      });

      await dispatchAutomation({
        type: "operator_application",
        id: record.id,
        createdAt: record.createdAt.toISOString(),
        email: record.email,
        name: record.name,
      });

      return jsonOk({ success: true, id: record.id });
    }

    // Default Diagnostic Flow
    const parsed = parseApplyPayload(json);

    if ("error" in parsed) {
      return jsonError("Invalid payload", 400, parsed.error);
    }

    const { data, draftToken } = parsed;
    let record;

    if (draftToken) {
      const draft = await prisma.diagnosticApplication.findFirst({
        where: { draftToken },
      });
      record = draft
        ? await prisma.diagnosticApplication.update({
            where: { id: draft.id },
            data: {
              ...data, rawResponses: data.rawResponses as any,
              submissionStatus: "submitted",
              isProcessed: false,
              internalReviewStatus: "Pending",
              ipHash: meta.ipHash,
              userAgent: meta.userAgent,
            },
          })
        : await prisma.diagnosticApplication.create({
            data: {
              ...data, rawResponses: data.rawResponses as any,
              draftToken,
              submissionStatus: "submitted",
              internalReviewStatus: "Pending",
              ipHash: meta.ipHash,
              userAgent: meta.userAgent,
            },
          });
    } else {
      record = await prisma.diagnosticApplication.create({
        data: {
          ...data, rawResponses: data.rawResponses as any,
          submissionStatus: "submitted",
          internalReviewStatus: "Pending",
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        },
      });
    }

    await dispatchAutomation({
      type: "diagnostic_application",
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      ...data, rawResponses: data.rawResponses as any,
    });

    queueDiagnosticProcessing(record.id);

    return jsonOk(
      {
        success: true,
        message:
          "Application received. Axis will review your submission and issue next steps if alignment is confirmed.",
        id: record.id,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return handleRouteError(err);
  }
}

