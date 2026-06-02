import { z } from "zod";
import { ApplySchema, normalizeApplyInput, type ApplyInput } from "./apply";

/** Loose payload supports current 6-step form and full spec intake */
const LooseApplySchema = z
  .object({
    organizationName: z.string().max(200).optional(),
    organization: z.string().max(200).optional(),
    applicantName: z.string().max(120).optional(),
    name: z.string().max(120).optional(),
    email: z.string().max(160).optional(),
    businessModel: z.string().max(2000).optional(),
    businessModelOther: z.string().max(500).optional(),
    revenueRange: z.string().max(80).optional(),
    monthlyRevenue: z.string().max(80).optional(),
    teamSize: z.string().max(80).optional(),
    primaryObjective: z.string().max(2000).optional(),
    primaryObjectiveOther: z.string().max(500).optional(),
    businessStage: z.string().max(80).optional(),
    businessStageOther: z.string().max(500).optional(),
    website: z.string().max(300).optional(),
    industry: z.string().max(120).optional(),
    location: z.string().max(120).optional(),
    role: z.string().max(120).optional(),
    roleOther: z.string().max(200).optional(),
    draftToken: z.string().max(80).optional(),
    infrastructure: z.record(z.string(), z.unknown()).optional(),
    distribution: z.record(z.string(), z.unknown()).optional(),
    intelligence: z.record(z.string(), z.unknown()).optional(),
    monetization: z.record(z.string(), z.unknown()).optional(),
    expansion: z.record(z.string(), z.unknown()).optional(),
    constraints: z.record(z.string(), z.unknown()).optional(),
    confirmedAccurate: z.boolean().optional(),
  })
  .passthrough();

const CORE_REVENUE = [
  "under_100k",
  "100k_500k",
  "500k_1m",
  "1m_5m",
  "5m_25m",
  "25m_plus",
] as const;

const CORE_TEAM = ["solo", "2_5", "6_15", "16_50", "51_200", "200_plus"] as const;

const CORE_STAGE = [
  "pre_revenue",
  "early_traction",
  "growth",
  "scaling",
  "established",
] as const;

function mapRevenue(value?: string): ApplyInput["revenueRange"] {
  if (!value) return "under_100k";
  if ((CORE_REVENUE as readonly string[]).includes(value)) {
    return value as ApplyInput["revenueRange"];
  }
  const v = value.toLowerCase();
  if (v.includes("25m") || v.includes("1m+") || v === "1m+") return "25m_plus";
  if (v.includes("250k") || v.includes("1m")) return "1m_5m";
  if (v.includes("50k") && v.includes("250")) return "500k_1m";
  if (v.includes("10k") && v.includes("50")) return "100k_500k";
  if (v.includes("10k") || v.includes("0 to")) return "under_100k";
  if (v.includes("prefer")) return "under_100k";
  return "100k_500k";
}

function mapTeam(value?: string): ApplyInput["teamSize"] {
  if (!value) return "solo";
  if ((CORE_TEAM as readonly string[]).includes(value)) {
    return value as ApplyInput["teamSize"];
  }
  const v = value.toLowerCase();
  if (v === "1" || v.includes("solo")) return "solo";
  if (v.includes("2") && v.includes("5")) return "2_5";
  if (v.includes("6") && v.includes("15")) return "6_15";
  if (v.includes("16") && v.includes("50")) return "16_50";
  if (v.includes("50+") || v.includes("200")) return "200_plus";
  if (v.includes("51")) return "51_200";
  return "2_5";
}

function mapStage(value?: string): ApplyInput["businessStage"] {
  if (!value) return "early_traction";
  if ((CORE_STAGE as readonly string[]).includes(value)) {
    return value as ApplyInput["businessStage"];
  }
  const v = value.toLowerCase();
  if (v.includes("pre")) return "pre_revenue";
  if (v.includes("established") || v.includes("expansion stage"))
    return "established";
  if (v.includes("scaling") || v.includes("operational pressure"))
    return "scaling";
  if (v.includes("growth")) return "growth";
  if (v.includes("restructur")) return "established";
  return "early_traction";
}

function buildBusinessModel(data: z.infer<typeof LooseApplySchema>): string {
  if (data.businessModel?.trim()) return data.businessModel.trim();
  if (data.businessModelOther?.trim()) return data.businessModelOther.trim();
  return "Not specified";
}

function buildObjective(data: z.infer<typeof LooseApplySchema>): string {
  if (data.primaryObjective?.trim()) return data.primaryObjective.trim();
  if (data.primaryObjectiveOther?.trim()) return data.primaryObjectiveOther.trim();
  const broken = data.constraints as Record<string, unknown> | undefined;
  if (typeof broken?.mostBroken === "string") return broken.mostBroken;
  return "Not specified";
}

export function parseApplyPayload(json: unknown) {
  const core = ApplySchema.safeParse(json);
  if (core.success) {
    return {
      data: normalizeApplyInput(core.data),
      draftToken: core.data.draftToken,
    };
  }

  const loose = LooseApplySchema.safeParse(json);
  if (!loose.success) {
    return { error: loose.error.flatten() as unknown };
  }

  const d = loose.data;
  const organizationName = (d.organizationName ?? d.organization ?? "").trim();
  const applicantName = (d.applicantName ?? d.name ?? "").trim();
  const email = (d.email ?? "").trim();

  if (!organizationName || !applicantName || !email) {
    return {
      error: {
        formErrors: [
          "organizationName (or organization), applicantName (or name), and email are required",
        ],
      },
    };
  }

  const rawResponses = {
    ...d,
    infrastructure: d.infrastructure,
    distribution: d.distribution,
    intelligence: d.intelligence,
    monetization: d.monetization,
    expansion: d.expansion,
    constraints: d.constraints,
    confirmedAccurate: d.confirmedAccurate,
  };

  const normalized = normalizeApplyInput({
    organizationName,
    applicantName,
    email,
    businessModel: buildBusinessModel(d),
    revenueRange: mapRevenue(d.revenueRange ?? d.monthlyRevenue),
    teamSize: mapTeam(d.teamSize),
    primaryObjective: buildObjective(d),
    businessStage: mapStage(d.businessStage ?? d.businessStageOther),
    website: d.website,
    industry: d.industry,
    location: d.location,
    role: d.roleOther?.trim() || d.role,
    rawResponses,
    draftToken: d.draftToken,
  });

  return { data: normalized, draftToken: d.draftToken };
}
