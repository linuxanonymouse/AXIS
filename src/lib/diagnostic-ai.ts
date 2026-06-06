import type { DiagnosticApplication } from "@prisma/client";

export type DiagnosticAiResult = {
  overallAlignmentScore: number;
  infrastructureScore: number;
  distributionScore: number;
  intelligenceScore: number;
  monetizationScore: number;
  expansionScore: number;
  primaryConstraint: string;
  primaryConstraintExplanation: string;
  secondaryConstraints: string;
  recommendedAxisPathway: string;
  businessMaturityClass: string;
  strategicInsight: string;
  internalReviewStatus: string;
  nextStepRecommendation: string;
  clientFacingSummary: string;
  internalNotes: string;
};

const PATHWAYS = [
  "Axis Operations Only",
  "Axis Operations → Axis Studio",
  "Axis Operations → Axis Studio → Axis Intelligence",
  "Axis Operations → Axis Media",
  "Axis Intelligence → Axis Operations",
  "Axis Media → Axis Ventures",
  "Full Axis Ecosystem",
] as const;

const REVIEW_STATUSES = [
  "Aligned",
  "Potential Fit",
  "Not Currently Aligned",
  "Requires Follow Up",
  "Needs More Information",
] as const;

const NEXT_STEPS = [
  "Schedule strategic review call",
  "Send custom proposal",
  "Request more information",
  "Send division brief",
  "Place in nurture sequence",
  "Decline politely",
  "Revisit later",
] as const;

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(100, Math.max(0, Math.round(n)));
}

function pickEnum<T extends readonly string[]>(
  value: unknown,
  options: T,
  fallback: T[number]
): T[number] {
  if (typeof value === "string" && options.includes(value as T[number])) {
    return value as T[number];
  }
  return fallback;
}

export function heuristicDiagnostic(
  app: DiagnosticApplication
): DiagnosticAiResult {
  const revenueBoost =
    app.revenueRange.includes("25m") || app.revenueRange.includes("5m")
      ? 12
      : app.revenueRange.includes("1m")
        ? 8
        : 4;
  const teamBoost =
    app.teamSize === "51_200" || app.teamSize === "200_plus"
      ? 10
      : app.teamSize === "16_50"
        ? 6
        : 2;
  const stageBoost =
    app.businessStage === "scaling" || app.businessStage === "established"
      ? 10
      : app.businessStage === "growth"
        ? 6
        : 0;

  const infrastructureScore = clampScore(52 + teamBoost + stageBoost);
  const distributionScore = clampScore(48 + revenueBoost);
  const intelligenceScore = clampScore(50 + stageBoost);
  const monetizationScore = clampScore(50 + revenueBoost);
  const expansionScore = clampScore(46 + stageBoost);
  const overallAlignmentScore = clampScore(
    (infrastructureScore +
      distributionScore +
      intelligenceScore +
      monetizationScore +
      expansionScore) /
      5
  );

  const primaryConstraint =
    infrastructureScore < 55
      ? "Infrastructure maturity"
      : distributionScore < 55
        ? "Distribution capacity"
        : intelligenceScore < 55
          ? "Performance visibility"
          : "Operational execution";

  return {
    overallAlignmentScore,
    infrastructureScore,
    distributionScore,
    intelligenceScore,
    monetizationScore,
    expansionScore,
    primaryConstraint,
    primaryConstraintExplanation: `${app.organizationName} shows pressure in ${primaryConstraint.toLowerCase()} relative to stated objective: ${app.primaryObjective.slice(0, 280)}.`,
    secondaryConstraints: [
      distributionScore < 60 ? "Distribution systems" : null,
      monetizationScore < 60 ? "Monetization structure" : null,
      expansionScore < 60 ? "Expansion readiness" : null,
    ]
      .filter(Boolean)
      .join("; ") || "Secondary constraints require internal validation.",
    recommendedAxisPathway:
      overallAlignmentScore >= 72
        ? "Full Axis Ecosystem"
        : infrastructureScore < distributionScore
          ? "Axis Operations → Axis Studio"
          : "Axis Operations Only",
    businessMaturityClass:
      app.businessStage === "established"
        ? "Established optimization phase"
        : app.businessStage === "scaling"
          ? "Scaling infrastructure pressure"
          : "Growth structural installation required",
    strategicInsight: `Axis evaluation indicates ${primaryConstraint.toLowerCase()} as the primary limiter before additional growth spend. Revenue range (${app.revenueRange}) and team scale (${app.teamSize}) suggest readiness for structured installation if alignment is confirmed.`,
    internalReviewStatus:
      overallAlignmentScore >= 70
        ? "Aligned"
        : overallAlignmentScore >= 55
          ? "Potential Fit"
          : "Requires Follow Up",
    nextStepRecommendation:
      overallAlignmentScore >= 70
        ? "Schedule strategic review call"
        : overallAlignmentScore >= 55
          ? "Request more information"
          : "Place in nurture sequence",
    clientFacingSummary: `Thank you for completing the Axis Strategic Diagnostic. Our initial review suggests focus on ${primaryConstraint.toLowerCase()} as the highest-leverage structural priority. Axis will confirm next steps after internal alignment review.`,
    internalNotes: `Auto-generated diagnostic for ${app.applicantName} (${app.email}). Model: heuristic fallback. Review before client-facing release.`,
  };
}

export async function generateDiagnosticAi(
  app: DiagnosticApplication
): Promise<DiagnosticAiResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return heuristicDiagnostic(app);

  const system = `You are the Axis Strategic Diagnostic engine. Output ONLY valid JSON matching this schema:
{
  "overallAlignmentScore": number 0-100,
  "infrastructureScore": number 0-100,
  "distributionScore": number 0-100,
  "intelligenceScore": number 0-100,
  "monetizationScore": number 0-100,
  "expansionScore": number 0-100,
  "primaryConstraint": string,
  "primaryConstraintExplanation": string,
  "secondaryConstraints": string,
  "recommendedAxisPathway": one of ${JSON.stringify(PATHWAYS)},
  "businessMaturityClass": string,
  "strategicInsight": string,
  "internalReviewStatus": one of ${JSON.stringify(REVIEW_STATUSES)},
  "nextStepRecommendation": one of ${JSON.stringify(NEXT_STEPS)},
  "clientFacingSummary": string,
  "internalNotes": string
}
Be institutional, selective, and concise. Scores are out of 100.
IMPORTANT: The applicant has indicated a Target Axis Service in their rawResponses. You MUST evaluate their alignment specifically for this targeted service pathway. Structure your strategicInsight and clientFacingSummary around their fit for this specific service.`;

  const user = JSON.stringify({
    organizationName: app.organizationName,
    applicantName: app.applicantName,
    email: app.email,
    businessModel: app.businessModel,
    revenueRange: app.revenueRange,
    teamSize: app.teamSize,
    primaryObjective: app.primaryObjective,
    businessStage: app.businessStage,
    website: app.website,
    industry: app.industry,
    location: app.location,
    role: app.role,
    rawResponses: app.rawResponses,
  });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.35,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenAI API Error:", res.status, errorText);
      return heuristicDiagnostic(app);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return heuristicDiagnostic(app);

    const parsed = JSON.parse(content) as Partial<DiagnosticAiResult>;

    return {
      overallAlignmentScore: clampScore(parsed.overallAlignmentScore),
      infrastructureScore: clampScore(parsed.infrastructureScore),
      distributionScore: clampScore(parsed.distributionScore),
      intelligenceScore: clampScore(parsed.intelligenceScore),
      monetizationScore: clampScore(parsed.monetizationScore),
      expansionScore: clampScore(parsed.expansionScore),
      primaryConstraint: String(parsed.primaryConstraint ?? "Structural constraint"),
      primaryConstraintExplanation: String(
        parsed.primaryConstraintExplanation ?? ""
      ),
      secondaryConstraints: String(parsed.secondaryConstraints ?? ""),
      recommendedAxisPathway: pickEnum(
        parsed.recommendedAxisPathway,
        PATHWAYS,
        "Axis Operations Only"
      ),
      businessMaturityClass: String(parsed.businessMaturityClass ?? ""),
      strategicInsight: String(parsed.strategicInsight ?? ""),
      internalReviewStatus: pickEnum(
        parsed.internalReviewStatus,
        REVIEW_STATUSES,
        "Requires Follow Up"
      ),
      nextStepRecommendation: pickEnum(
        parsed.nextStepRecommendation,
        NEXT_STEPS,
        "Request more information"
      ),
      clientFacingSummary: String(parsed.clientFacingSummary ?? ""),
      internalNotes: String(parsed.internalNotes ?? ""),
    };
  } catch (err) {
    console.error("OpenAI call failed:", err);
    return heuristicDiagnostic(app);
  }
}
