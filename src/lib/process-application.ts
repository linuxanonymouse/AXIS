import { prisma } from "@/lib/prisma";
import { generateDiagnosticAi } from "@/lib/diagnostic-ai";
import { dispatchAutomation } from "@/lib/automation";
import { internalDiagnosticHtml, sendEmail } from "@/lib/email";

export async function processDiagnosticApplication(applicationId: string) {
  const app = await prisma.diagnosticApplication.findUnique({
    where: { id: applicationId },
  });

  if (!app || app.isProcessed) return;

  const ai = await generateDiagnosticAi(app);

  const updated = await prisma.diagnosticApplication.update({
    where: { id: applicationId },
    data: {
      ...ai,
      isProcessed: true,
      internalReviewStatus: ai.internalReviewStatus,
    },
  });

  await dispatchAutomation({
    type: "diagnostic_processed",
    id: updated.id,
    createdAt: updated.createdAt.toISOString(),
    organizationName: updated.organizationName,
    applicantName: updated.applicantName,
    email: updated.email,
    scores: {
      overall: updated.overallAlignmentScore,
      infrastructure: updated.infrastructureScore,
      distribution: updated.distributionScore,
      intelligence: updated.intelligenceScore,
      monetization: updated.monetizationScore,
      expansion: updated.expansionScore,
    },
    primaryConstraint: updated.primaryConstraint,
    recommendedAxisPathway: updated.recommendedAxisPathway,
    internalReviewStatus: updated.internalReviewStatus,
    nextStepRecommendation: updated.nextStepRecommendation,
    clientFacingSummary: updated.clientFacingSummary,
  });

  const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL;
  if (internalEmail) {
    await sendEmail({
      to: internalEmail,
      subject: `Axis Diagnostic ${updated.organizationName}`,
      html: internalDiagnosticHtml({
        id: updated.id,
        organizationName: updated.organizationName,
        applicantName: updated.applicantName,
        email: updated.email,
        overallAlignmentScore: updated.overallAlignmentScore,
        primaryConstraint: updated.primaryConstraint,
        recommendedAxisPathway: updated.recommendedAxisPathway,
      }),
    });
  }
}

export function queueDiagnosticProcessing(applicationId: string) {
  void processDiagnosticApplication(applicationId).catch((err) => {
    console.error("[axis] diagnostic processing failed", applicationId, err);
  });
}
