"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const TOTAL_STEPS = 7;

type FormData = {
  organizationName: string;
  applicantName: string;
  email: string;
  website: string;
  industry: string;
  location: string;
  role: string;
  businessModel: string;
  revenueRange: string;
  teamSize: string;
  primaryObjective: string;
  businessStage: string;
  targetService: string;
  // Extended Fields
  monthlyTraffic: string;
  conversionFunnel: string;
  toolsIntegrated: string;
  automationLevel: string;
  primaryTrafficSource: string;
  contentConsistency: string;
  paidAds: string;
  ugc: string;
  kpiTracking: string;
  decisionMaking: string;
  reportingSystem: string;
  offerDefined: string;
  pricingOptimized: string;
  partnerships: string;
  revenueLoss: string;
  mostBroken: string;
  timeline: string;
};

const INITIAL: FormData = {
  organizationName: "",
  applicantName: "",
  email: "",
  website: "",
  industry: "",
  location: "",
  role: "",
  businessModel: "",
  revenueRange: "",
  teamSize: "",
  primaryObjective: "",
  businessStage: "",
  targetService: "",
  monthlyTraffic: "",
  conversionFunnel: "",
  toolsIntegrated: "",
  automationLevel: "",
  primaryTrafficSource: "",
  contentConsistency: "",
  paidAds: "",
  ugc: "",
  kpiTracking: "",
  decisionMaking: "",
  reportingSystem: "",
  offerDefined: "",
  pricingOptimized: "",
  partnerships: "",
  revenueLoss: "",
  mostBroken: "",
  timeline: "",
};

const REVENUE_OPTIONS = [
  { value: "under_100k", label: "Under $100K" },
  { value: "100k_500k", label: "$100K - $500K" },
  { value: "500k_1m", label: "$500K - $1M" },
  { value: "1m_5m", label: "$1M - $5M" },
  { value: "5m_25m", label: "$5M - $25M" },
  { value: "25m_plus", label: "$25M+" },
];

const TEAM_OPTIONS = [
  { value: "solo", label: "Solo" },
  { value: "2_5", label: "2-5" },
  { value: "6_15", label: "6-15" },
  { value: "16_50", label: "16-50" },
  { value: "51_200", label: "51-200" },
  { value: "200_plus", label: "200+" },
];

const STAGE_OPTIONS = [
  { value: "pre_revenue", label: "Pre-Revenue", desc: "Building toward first revenue" },
  { value: "early_traction", label: "Early Traction", desc: "Revenue exists, not yet consistent" },
  { value: "growth", label: "Growth", desc: "Consistent revenue, scaling challenges" },
  { value: "scaling", label: "Scaling", desc: "Proven model, deploying infrastructure" },
  { value: "established", label: "Established", desc: "Mature organization, optimizing systems" },
];

const SERVICE_OPTIONS = [
  { value: "Axis Operations Only", label: "Axis Operations" },
  { value: "Axis Operations → Axis Studio", label: "Axis Studio Deployment" },
  { value: "Axis Operations → Axis Studio → Axis Intelligence", label: "Axis Intelligence" },
  { value: "Axis Operations → Axis Media", label: "Axis Media" },
  { value: "Full Axis Ecosystem", label: "Full Ecosystem Evaluation" },
];

export default function DiagnosticFlow({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep(s: number): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.organizationName.trim()) errs.organizationName = "Required";
      if (!form.applicantName.trim()) errs.applicantName = "Required";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    }
    if (s === 2) {
      if (!form.industry.trim()) errs.industry = "Required";
      if (!form.location.trim()) errs.location = "Required";
      if (!form.role.trim()) errs.role = "Required";
    }
    if (s === 3) {
      if (!form.businessModel.trim()) errs.businessModel = "Required";
      if (!form.revenueRange) errs.revenueRange = "Required";
      if (!form.teamSize) errs.teamSize = "Required";
      if (!form.businessStage) errs.businessStage = "Required";
    }
    if (s === 4) {
      if (!form.toolsIntegrated) errs.toolsIntegrated = "Required";
      if (!form.automationLevel) errs.automationLevel = "Required";
      if (!form.kpiTracking) errs.kpiTracking = "Required";
      if (!form.reportingSystem) errs.reportingSystem = "Required";
      if (!form.decisionMaking) errs.decisionMaking = "Required";
    }
    if (s === 5) {
      if (!form.monthlyTraffic) errs.monthlyTraffic = "Required";
      if (!form.primaryTrafficSource) errs.primaryTrafficSource = "Required";
      if (!form.conversionFunnel) errs.conversionFunnel = "Required";
      if (!form.paidAds) errs.paidAds = "Required";
      if (!form.contentConsistency) errs.contentConsistency = "Required";
      if (!form.ugc) errs.ugc = "Required";
      if (!form.partnerships) errs.partnerships = "Required";
    }
    if (s === 6) {
      if (!form.offerDefined) errs.offerDefined = "Required";
      if (!form.pricingOptimized) errs.pricingOptimized = "Required";
      if (!form.primaryObjective.trim()) errs.primaryObjective = "Required";
      if (!form.revenueLoss.trim()) errs.revenueLoss = "Required";
      if (!form.mostBroken.trim()) errs.mostBroken = "Required";
    }
    if (s === 7) {
      if (!form.timeline) errs.timeline = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < TOTAL_STEPS) {
      setDir(1);
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step > 1) {
      setDir(-1);
      setStep((s) => s - 1);
    } else {
      onBack();
    }
  }

  async function submit() {
    if (!validateStep(step)) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        organizationName: form.organizationName,
        applicantName: form.applicantName,
        email: form.email,
        website: form.website,
        industry: form.industry,
        location: form.location,
        role: form.role,
        businessModel: form.businessModel,
        revenueRange: form.revenueRange,
        teamSize: form.teamSize,
        primaryObjective: form.primaryObjective,
        businessStage: form.businessStage,
        type: "diagnostic",
        rawResponses: {
          targetService: form.targetService,
          monthlyTraffic: form.monthlyTraffic,
          conversionFunnel: form.conversionFunnel,
          toolsIntegrated: form.toolsIntegrated,
          automationLevel: form.automationLevel,
          primaryTrafficSource: form.primaryTrafficSource,
          contentConsistency: form.contentConsistency,
          paidAds: form.paidAds,
          ugc: form.ugc,
          kpiTracking: form.kpiTracking,
          decisionMaking: form.decisionMaking,
          reportingSystem: form.reportingSystem,
          offerDefined: form.offerDefined,
          pricingOptimized: form.pricingOptimized,
          partnerships: form.partnerships,
          revenueLoss: form.revenueLoss,
          mostBroken: form.mostBroken,
          timeline: form.timeline
        }
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed");
      }
      router.push("/submission-received");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred. Please try again.");
      setSubmitting(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="apply-shell">
      <div className="apply-progress-track" aria-hidden>
        <motion.div className="apply-progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      <div className="apply-header">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="apply-eyebrow">
          Axis Strategic Diagnostic
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.06 }} className="apply-step-counter">
          <span className="apply-step-num">{String(step).padStart(2, "0")}</span>
          <span className="apply-step-sep">/</span>
          <span className="apply-step-total">{String(TOTAL_STEPS).padStart(2, "0")}</span>
        </motion.div>
      </div>

      <div className="apply-card">
        <div className="apply-card__corner apply-card__corner--tl" aria-hidden />
        <div className="apply-card__corner apply-card__corner--tr" aria-hidden />
        <div className="apply-card__corner apply-card__corner--bl" aria-hidden />
        <div className="apply-card__corner apply-card__corner--br" aria-hidden />

        <div className="apply-card__inner" style={{ padding: "3rem" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" className="apply-step">
              
              {step === 1 && (
                <>
                  <p className="apply-step__eyebrow">Identification</p>
                  <h2 className="apply-step__title">Who is applying?</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Organization Name</label>
                      <input className={`apply-input ${errors.organizationName ? "apply-input--error" : ""}`} type="text" placeholder="Your organization" value={form.organizationName} onChange={(e) => set("organizationName", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Your Name</label>
                      <input className={`apply-input ${errors.applicantName ? "apply-input--error" : ""}`} type="text" placeholder="Full name" value={form.applicantName} onChange={(e) => set("applicantName", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Email Address</label>
                      <input className={`apply-input ${errors.email ? "apply-input--error" : ""}`} type="email" placeholder="you@organization.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="apply-step__eyebrow">Organization Profile</p>
                  <h2 className="apply-step__title">Basic Details</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Your Role</label>
                      <input className={`apply-input ${errors.role ? "apply-input--error" : ""}`} type="text" placeholder="e.g. CEO, Founder" value={form.role} onChange={(e) => set("role", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Industry</label>
                      <input className={`apply-input ${errors.industry ? "apply-input--error" : ""}`} type="text" placeholder="e.g. SaaS, E-commerce" value={form.industry} onChange={(e) => set("industry", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Location</label>
                      <input className={`apply-input ${errors.location ? "apply-input--error" : ""}`} type="text" placeholder="City, Country" value={form.location} onChange={(e) => set("location", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Website (optional)</label>
                      <input className="apply-input" type="url" placeholder="https://yourcompany.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="apply-step__eyebrow">Scope & Scale</p>
                  <h2 className="apply-step__title">Revenue & Operations</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Business Model</label>
                      <textarea className={`apply-textarea ${errors.businessModel ? "apply-input--error" : ""}`} placeholder="Describe how your organization generates revenue..." value={form.businessModel} onChange={(e) => set("businessModel", e.target.value)} rows={2} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Revenue Range</label>
                      <select className={`apply-input ${errors.revenueRange ? "apply-input--error" : ""}`} value={form.revenueRange} onChange={(e) => set("revenueRange", e.target.value)}>
                        <option value="" disabled>Select Range...</option>
                        {REVENUE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Team Size</label>
                      <select className={`apply-input ${errors.teamSize ? "apply-input--error" : ""}`} value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)}>
                        <option value="" disabled>Select Size...</option>
                        {TEAM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Business Stage</label>
                      <select className={`apply-input ${errors.businessStage ? "apply-input--error" : ""}`} value={form.businessStage} onChange={(e) => set("businessStage", e.target.value)}>
                        <option value="" disabled>Select Stage...</option>
                        {STAGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Target Axis Service (For AI Evaluation Focus)</label>
                      <select className={`apply-input ${errors.targetService ? "apply-input--error" : ""}`} value={form.targetService} onChange={(e) => set("targetService", e.target.value)}>
                        <option value="" disabled>Select Target Service...</option>
                        {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <p className="apply-step__eyebrow">Infrastructure</p>
                  <h2 className="apply-step__title">Operations & Systems</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Are your tools (CRM, email, etc.) integrated?</label>
                      <input className={`apply-input ${errors.toolsIntegrated ? "apply-input--error" : ""}`} placeholder="e.g. Partially, fully synced, completely siloed" value={form.toolsIntegrated} onChange={(e) => set("toolsIntegrated", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">How automated is your operation?</label>
                      <input className={`apply-input ${errors.automationLevel ? "apply-input--error" : ""}`} placeholder="e.g. Mostly manual, highly automated" value={form.automationLevel} onChange={(e) => set("automationLevel", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you track KPIs clearly?</label>
                      <input className={`apply-input ${errors.kpiTracking ? "apply-input--error" : ""}`} placeholder="e.g. Yes via dashboard, loosely via spreadsheets" value={form.kpiTracking} onChange={(e) => set("kpiTracking", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you have a structured reporting system?</label>
                      <input className={`apply-input ${errors.reportingSystem ? "apply-input--error" : ""}`} placeholder="e.g. Weekly automated reports, none" value={form.reportingSystem} onChange={(e) => set("reportingSystem", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">How are decisions made?</label>
                      <input className={`apply-input ${errors.decisionMaking ? "apply-input--error" : ""}`} placeholder="e.g. Data-driven, gut feeling, executive committee" value={form.decisionMaking} onChange={(e) => set("decisionMaking", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <p className="apply-step__eyebrow">Distribution</p>
                  <h2 className="apply-step__title">Marketing & Traffic</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Approximate monthly traffic or leads?</label>
                      <input className={`apply-input ${errors.monthlyTraffic ? "apply-input--error" : ""}`} placeholder="e.g. 50,000 visitors / 500 leads" value={form.monthlyTraffic} onChange={(e) => set("monthlyTraffic", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Primary traffic source?</label>
                      <input className={`apply-input ${errors.primaryTrafficSource ? "apply-input--error" : ""}`} placeholder="e.g. SEO, Meta Ads, Outbound" value={form.primaryTrafficSource} onChange={(e) => set("primaryTrafficSource", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you have a defined system or funnel for conversion?</label>
                      <input className={`apply-input ${errors.conversionFunnel ? "apply-input--error" : ""}`} placeholder="Yes/No and brief detail" value={form.conversionFunnel} onChange={(e) => set("conversionFunnel", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you use paid ads?</label>
                      <input className={`apply-input ${errors.paidAds ? "apply-input--error" : ""}`} placeholder="Yes/No (Platform/Spend)" value={form.paidAds} onChange={(e) => set("paidAds", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Content consistency?</label>
                      <input className={`apply-input ${errors.contentConsistency ? "apply-input--error" : ""}`} placeholder="e.g. Daily, Sporadic, None" value={form.contentConsistency} onChange={(e) => set("contentConsistency", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you leverage influencers or user-generated content?</label>
                      <input className={`apply-input ${errors.ugc ? "apply-input--error" : ""}`} placeholder="Yes/No" value={form.ugc} onChange={(e) => set("ugc", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you leverage partnerships or expansion channels?</label>
                      <input className={`apply-input ${errors.partnerships ? "apply-input--error" : ""}`} placeholder="Yes/No" value={form.partnerships} onChange={(e) => set("partnerships", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <p className="apply-step__eyebrow">Monetization</p>
                  <h2 className="apply-step__title">Offers & Constraints</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Is your offer clearly defined?</label>
                      <input className={`apply-input ${errors.offerDefined ? "apply-input--error" : ""}`} placeholder="Yes/No" value={form.offerDefined} onChange={(e) => set("offerDefined", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Is your pricing structured and optimized?</label>
                      <input className={`apply-input ${errors.pricingOptimized ? "apply-input--error" : ""}`} placeholder="Yes/No" value={form.pricingOptimized} onChange={(e) => set("pricingOptimized", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">What is your current primary objective?</label>
                      <textarea className={`apply-textarea ${errors.primaryObjective ? "apply-input--error" : ""}`} placeholder="What are you trying to achieve?" value={form.primaryObjective} onChange={(e) => set("primaryObjective", e.target.value)} rows={2} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Where is revenue most likely being lost?</label>
                      <textarea className={`apply-textarea ${errors.revenueLoss ? "apply-input--error" : ""}`} placeholder="e.g. Lead dropoff, pricing, churn" value={form.revenueLoss} onChange={(e) => set("revenueLoss", e.target.value)} rows={2} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">What feels most broken right now?</label>
                      <textarea className={`apply-textarea ${errors.mostBroken ? "apply-input--error" : ""}`} placeholder="Be honest about what is failing..." value={form.mostBroken} onChange={(e) => set("mostBroken", e.target.value)} rows={2} />
                    </div>
                  </div>
                </>
              )}

              {step === 7 && (
                <>
                  <p className="apply-step__eyebrow">Submission</p>
                  <h2 className="apply-step__title">Timeline & Alignment</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">What is your timeline?</label>
                      <input className={`apply-input ${errors.timeline ? "apply-input--error" : ""}`} placeholder="e.g. Immediate, Next 30 days, Exploring" value={form.timeline} onChange={(e) => set("timeline", e.target.value)} />
                    </div>
                    <p style={{ marginTop: "2rem", color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      Submission of this diagnostic initiates an automated constraint analysis. 
                      Axis will review your metrics and issue next steps based on objective alignment.
                    </p>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        <div className="apply-nav">
          <button type="button" className="apply-btn apply-btn--ghost" onClick={back} disabled={submitting}>
            Back
          </button>
          {step < TOTAL_STEPS ? (
            <button type="button" className="apply-btn apply-btn--primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button type="button" className="apply-btn apply-btn--primary" onClick={submit} disabled={submitting}>
              {submitting ? "Transmitting..." : "Submit Diagnostic"}
            </button>
          )}
        </div>
        {submitError && <p className="apply-error apply-error--submit">{submitError}</p>}
      </div>
      <div className="apply-dots">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span key={i} className={`apply-dot ${i + 1 === step ? "apply-dot--active" : ""} ${i + 1 < step ? "apply-dot--done" : ""}`} />
        ))}
      </div>
    </div>
  );
}
