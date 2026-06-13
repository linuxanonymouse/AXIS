"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

const TOTAL_STEPS = 4;

type FormData = {
  name: string;
  email: string;
  currentRole: string;
  specialization: string;
  portfolioUrl: string;
  experienceDuration: string;
  activeClients: string;
  clientAcquisition: string;
  portfolioSize: string;
  realisticClients: string;
  revenueRange: string;
  primaryLimitation: string;
  deliveryMethod: string;
  relationshipManagement: string;
  whiteLabelComfort: string;
  interestReason: string;
  timeline: string;
  bringClients: string;
};

const INITIAL: FormData = {
  name: "",
  email: "",
  currentRole: "",
  specialization: "",
  portfolioUrl: "",
  experienceDuration: "",
  activeClients: "",
  clientAcquisition: "",
  portfolioSize: "",
  realisticClients: "",
  revenueRange: "",
  primaryLimitation: "",
  deliveryMethod: "",
  relationshipManagement: "",
  whiteLabelComfort: "",
  interestReason: "",
  timeline: "",
  bringClients: "",
};

export default function OperatorFlow({ onBack, token }: { onBack: () => void; token: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    async function validate() {
      try {
        const res = await fetch(`/api/apply/validate-token?token=${token}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Invalid token");
        
        setForm(prev => ({ ...prev, email: data.email }));
      } catch (err: any) {
        setTokenError(err.message);
      } finally {
        setValidatingToken(false);
      }
    }
    validate();
  }, [token]);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep(s: number): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.name.trim()) errs.name = "Required";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
      if (!form.currentRole.trim()) errs.currentRole = "Required";
      if (!form.specialization.trim()) errs.specialization = "Required";
    }
    if (s === 2) {
      if (!form.experienceDuration.trim()) errs.experienceDuration = "Required";
      if (!form.activeClients.trim()) errs.activeClients = "Required";
      if (!form.portfolioSize) errs.portfolioSize = "Required";
      if (!form.clientAcquisition.trim()) errs.clientAcquisition = "Required";
      if (!form.realisticClients.trim()) errs.realisticClients = "Required";
      if (!form.revenueRange.trim()) errs.revenueRange = "Required";
    }
    if (s === 3) {
      if (!form.primaryLimitation.trim()) errs.primaryLimitation = "Required";
      if (!form.deliveryMethod.trim()) errs.deliveryMethod = "Required";
      if (!form.relationshipManagement.trim()) errs.relationshipManagement = "Required";
      if (!form.whiteLabelComfort.trim()) errs.whiteLabelComfort = "Required";
    }
    if (s === 4) {
      if (!form.interestReason.trim()) errs.interestReason = "Required";
      if (!form.timeline.trim()) errs.timeline = "Required";
      if (!form.bringClients.trim()) errs.bringClients = "Required";
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
        ...form,
        type: "operator",
        token // Pass token to mark as used
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
      router.push("/submission-received?type=operator");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred. Please try again.");
      setSubmitting(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  if (validatingToken) {
    return (
      <div className="apply-shell" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <p style={{ color: "#888" }}>Verifying secure access token...</p>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="apply-shell" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "400px", gap: "1rem" }}>
        <h2 style={{ color: "#ff4444" }}>Access Denied</h2>
        <p style={{ color: "#888" }}>{tokenError}</p>
        <button onClick={onBack} className="axis-btn axis-btn--ghost">Return</button>
      </div>
    );
  }

  return (
    <div className="apply-shell">
      <div className="apply-progress-track" aria-hidden>
        <motion.div className="apply-progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      <div className="apply-header">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="apply-eyebrow">
          AXIS INTAKE
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
                  <h2 className="apply-step__title">Operator Access Request</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Name</label>
                      <input className={`apply-input ${errors.name ? "apply-input--error" : ""}`} type="text" placeholder="Your full name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Primary Contact Email</label>
                      <input
                        className="apply-input"
                        type="email"
                        readOnly
                        value={form.email}
                        style={{ color: "#888", backgroundColor: "#0a0a0a", cursor: "not-allowed" }}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">What best describes your current role?</label>
                      <input className={`apply-input ${errors.currentRole ? "apply-input--error" : ""}`} type="text" placeholder="e.g. Freelancer, Agency Owner" value={form.currentRole} onChange={(e) => set("currentRole", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Specialization</label>
                      <input className={`apply-input ${errors.specialization ? "apply-input--error" : ""}`} type="text" placeholder="e.g. Meta Ads, B2B SEO" value={form.specialization} onChange={(e) => set("specialization", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Website/Portfolio Link</label>
                      <input className="apply-input" type="url" placeholder="https://yourwebsite.com" value={form.portfolioUrl} onChange={(e) => set("portfolioUrl", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="apply-step__eyebrow">Experience</p>
                  <h2 className="apply-step__title">Client Access & Experience</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">How long have you been working with clients?</label>
                      <input className={`apply-input ${errors.experienceDuration ? "apply-input--error" : ""}`} type="text" placeholder="e.g. 2 years, 5+ years" value={form.experienceDuration} onChange={(e) => set("experienceDuration", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Do you currently have active clients?</label>
                      <select className={`apply-input ${errors.activeClients ? "apply-input--error" : ""}`} value={form.activeClients} onChange={(e) => set("activeClients", e.target.value)}>
                        <option value="" disabled>Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Current Portfolio Size</label>
                      <select className={`apply-input ${errors.portfolioSize ? "apply-input--error" : ""}`} value={form.portfolioSize} onChange={(e) => set("portfolioSize", e.target.value)}>
                        <option value="" disabled>Select Portfolio Size...</option>
                        <option value="1-3 clients">1-3 clients</option>
                        <option value="4-10 clients">4-10 clients</option>
                        <option value="11-20 clients">11-20 clients</option>
                        <option value="21+ clients">21+ clients</option>
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">How do you primarily acquire clients?</label>
                      <select className={`apply-input ${errors.clientAcquisition ? "apply-input--error" : ""}`} value={form.clientAcquisition} onChange={(e) => set("clientAcquisition", e.target.value)}>
                        <option value="" disabled>Select primary method...</option>
                        <option value="Referrals">Referrals</option>
                        <option value="Inbound / Content">Inbound / Content</option>
                        <option value="Outbound / Prospecting">Outbound / Prospecting</option>
                        <option value="Partnerships">Partnerships</option>
                        <option value="Paid Ads">Paid Ads</option>
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">How many qualified opportunities could you realistically introduce within the next 30–60 days?</label>
                      <input className={`apply-input ${errors.realisticClients ? "apply-input--error" : ""}`} type="text" placeholder="e.g. 1-3, 5-10" value={form.realisticClients} onChange={(e) => set("realisticClients", e.target.value)} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">What is your current monthly revenue range?</label>
                      <select className={`apply-input ${errors.revenueRange ? "apply-input--error" : ""}`} value={form.revenueRange} onChange={(e) => set("revenueRange", e.target.value)}>
                        <option value="" disabled>Select range...</option>
                        <option value="Under $5k">Under $5k</option>
                        <option value="$5k - $10k">$5k - $10k</option>
                        <option value="$10k - $25k">$10k - $25k</option>
                        <option value="$25k - $50k">$25k - $50k</option>
                        <option value="$50k+">$50k+</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="apply-step__eyebrow">Operations</p>
                  <h2 className="apply-step__title">Operating Capability</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">What is your primary limitation right now?</label>
                      <textarea className={`apply-textarea ${errors.primaryLimitation ? "apply-input--error" : ""}`} placeholder="e.g. Fulfillment capacity, Lead generation" value={form.primaryLimitation} onChange={(e) => set("primaryLimitation", e.target.value)} rows={2} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">How do you currently deliver work or manage client outcomes?</label>
                      <textarea className={`apply-textarea ${errors.deliveryMethod ? "apply-input--error" : ""}`} placeholder="e.g. I do everything manually, I have a small team" value={form.deliveryMethod} onChange={(e) => set("deliveryMethod", e.target.value)} rows={2} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">How would you describe your ability to manage client relationships?</label>
                      <textarea className={`apply-textarea ${errors.relationshipManagement ? "apply-input--error" : ""}`} placeholder="e.g. Excellent communication, Struggle with boundaries" value={form.relationshipManagement} onChange={(e) => set("relationshipManagement", e.target.value)} rows={2} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Are you comfortable operating within Axis standards, systems, and approval processes?</label>
                      <select className={`apply-input ${errors.whiteLabelComfort ? "apply-input--error" : ""}`} value={form.whiteLabelComfort} onChange={(e) => set("whiteLabelComfort", e.target.value)}>
                        <option value="" disabled>Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <p className="apply-step__eyebrow">Alignment</p>
                  <h2 className="apply-step__title">Goals & Timeline</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Why are you interested in the Axis Operator System?</label>
                      <textarea className={`apply-textarea ${errors.interestReason ? "apply-input--error" : ""}`} placeholder="What caught your attention?" value={form.interestReason} onChange={(e) => set("interestReason", e.target.value)} rows={3} />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">What is your timeline?</label>
                      <select className={`apply-input ${errors.timeline ? "apply-input--error" : ""}`} value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                        <option value="" disabled>Select timeline...</option>
                        <option value="Immediate">Immediate</option>
                        <option value="Next 30 days">Next 30 days</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Are you currently in a position to bring clients into this system?</label>
                      <select className={`apply-input ${errors.bringClients ? "apply-input--error" : ""}`} value={form.bringClients} onChange={(e) => set("bringClients", e.target.value)}>
                        <option value="" disabled>Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <p style={{ marginTop: "2rem", color: "#888", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      This application is used to assess alignment with the Axis Operator System.
                      Access is limited and based on experience, relationship quality, professional judgment, and ability to operate within Axis standards.
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
              {submitting ? "Transmitting..." : "Submit"}
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
