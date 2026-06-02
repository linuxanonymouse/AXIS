import { z } from "zod";

export const ApplySchema = z.object({
  organizationName: z.string().min(1).max(200),
  applicantName: z.string().min(1).max(120),
  email: z.string().email().max(160),
  businessModel: z.string().min(1).max(500),
  revenueRange: z.enum([
    "under_100k",
    "100k_500k",
    "500k_1m",
    "1m_5m",
    "5m_25m",
    "25m_plus",
  ]),
  teamSize: z.enum(["solo", "2_5", "6_15", "16_50", "51_200", "200_plus"]),
  primaryObjective: z.string().min(1).max(1000),
  businessStage: z.enum([
    "pre_revenue",
    "early_traction",
    "growth",
    "scaling",
    "established",
  ]),
  website: z.string().max(300).optional(),
  industry: z.string().max(120).optional(),
  location: z.string().max(120).optional(),
  role: z.string().max(120).optional(),
  rawResponses: z.record(z.string(), z.unknown()).optional(),
  draftToken: z.string().max(80).optional(),
});

export type ApplyInput = z.infer<typeof ApplySchema>;

export function normalizeApplyInput(data: ApplyInput) {
  return {
    organizationName: data.organizationName.trim(),
    applicantName: data.applicantName.trim(),
    email: data.email.trim().toLowerCase(),
    businessModel: data.businessModel.trim(),
    primaryObjective: data.primaryObjective.trim(),
    revenueRange: data.revenueRange,
    teamSize: data.teamSize,
    businessStage: data.businessStage,
    website: data.website?.trim() || null,
    industry: data.industry?.trim() || null,
    location: data.location?.trim() || null,
    role: data.role?.trim() || null,
    rawResponses: data.rawResponses ?? undefined,
  };
}
