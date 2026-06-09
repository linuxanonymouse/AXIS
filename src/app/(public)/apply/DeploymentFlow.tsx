"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// --- Slide animation ---
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

type FormData = {
  projectName: string;
  email: string;
  requestCategory: string;
  internalOwner: string;
  techStack: string;
  currentProcess: string;
  bottleneck: string;
  desiredOutcome: string;
  businessImpact: string;
  currentPainPoint: string;
  successMetric: string;
  priority: string;
  completionDate: string;
  systemAccess: string;
  supportUrl: string;
};

const INITIAL: FormData = {
  projectName: "",
  email: "",
  requestCategory: "",
  internalOwner: "",
  techStack: "",
  currentProcess: "",
  bottleneck: "",
  desiredOutcome: "",
  businessImpact: "",
  currentPainPoint: "",
  successMetric: "",
  priority: "",
  completionDate: "",
  systemAccess: "",
  supportUrl: "",
};

const TOTAL_STEPS = 4;

export default function DeploymentFlow({ onBack }: { onBack: () => void }) {
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
      if (!form.projectName.trim()) errs.projectName = "Required";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Valid email required";
      if (!form.requestCategory.trim()) errs.requestCategory = "Required";
      if (!form.internalOwner.trim()) errs.internalOwner = "Required";
    }
    if (s === 2) {
      if (!form.techStack.trim()) errs.techStack = "Required";
      if (!form.currentProcess.trim()) errs.currentProcess = "Required";
    }
    if (s === 3) {
      if (!form.bottleneck.trim()) errs.bottleneck = "Required";
      if (!form.currentPainPoint.trim()) errs.currentPainPoint = "Required";
      if (!form.desiredOutcome.trim()) errs.desiredOutcome = "Required";
      if (!form.successMetric.trim()) errs.successMetric = "Required";
      if (!form.businessImpact.trim()) errs.businessImpact = "Required";
    }
    if (s === 4) {
      if (!form.priority) errs.priority = "Required";
      if (!form.completionDate.trim()) errs.completionDate = "Required";
      if (!form.systemAccess.trim()) errs.systemAccess = "Required";
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
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, type: "deployment" }),
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
      {/* Progress bar */}
      <div className="apply-progress-track" aria-hidden>
        <motion.div
          className="apply-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Header */}
      <div className="apply-header">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="apply-eyebrow"
        >
          Axis Studio Deployment Request
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="apply-step-counter"
        >
          <span className="apply-step-num">{String(step).padStart(2, "0")}</span>
          <span className="apply-step-sep">/</span>
          <span className="apply-step-total">{String(TOTAL_STEPS).padStart(2, "0")}</span>
        </motion.div>
      </div>

      {/* Form card */}
      <div className="apply-card">
        <div className="apply-card__corner apply-card__corner--tl" aria-hidden />
        <div className="apply-card__corner apply-card__corner--tr" aria-hidden />
        <div className="apply-card__corner apply-card__corner--bl" aria-hidden />
        <div className="apply-card__corner apply-card__corner--br" aria-hidden />

        <div className="apply-card__inner">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="apply-step"
            >
              {step === 1 && (
                <>
                  <p className="apply-step__eyebrow">Identity</p>
                  <h2 className="apply-step__title">Project Identity</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Project Name</label>
                      <input
                        className={`apply-input ${errors.projectName ? "apply-input--error" : ""}`}
                        type="text"
                        placeholder="e.g., Shopify Automation"
                        value={form.projectName}
                        onChange={(e) => set("projectName", e.target.value)}
                      />
                      {errors.projectName && <span className="apply-error">{errors.projectName}</span>}
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Primary Contact Email</label>
                      <input
                        className={`apply-input ${errors.email ? "apply-input--error" : ""}`}
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                      {errors.email && <span className="apply-error">{errors.email}</span>}
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Request Category</label>
                      <select
                        className={`apply-input ${errors.requestCategory ? "apply-input--error" : ""}`}
                        value={form.requestCategory}
                        onChange={(e) => set("requestCategory", e.target.value)}
                      >
                        <option value="" disabled>Select category...</option>
                        <option value="System Integration">System Integration</option>
                        <option value="Process Automation">Process Automation</option>
                        <option value="Data Pipeline">Data Pipeline</option>
                        <option value="Custom Application">Custom Application</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Internal Owner</label>
                      <input
                        className={`apply-input ${errors.internalOwner ? "apply-input--error" : ""}`}
                        type="text"
                        placeholder="Who is responsible for this project?"
                        value={form.internalOwner}
                        onChange={(e) => set("internalOwner", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <p className="apply-step__eyebrow">Baseline</p>
                  <h2 className="apply-step__title">Technical Baseline</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Current Tech Stack</label>
                      <textarea
                        className={`apply-textarea ${errors.techStack ? "apply-input--error" : ""}`}
                        placeholder="List the primary platforms involved (e.g. Shopify, Make.com)"
                        value={form.techStack}
                        onChange={(e) => set("techStack", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Current Process</label>
                      <textarea
                        className={`apply-textarea ${errors.currentProcess ? "apply-input--error" : ""}`}
                        placeholder="Describe how this currently operates today"
                        value={form.currentProcess}
                        onChange={(e) => set("currentProcess", e.target.value)}
                        rows={5}
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <p className="apply-step__eyebrow">Scope</p>
                  <h2 className="apply-step__title">Scope & Outcomes</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Problem or Bottleneck</label>
                      <textarea
                        className={`apply-textarea ${errors.bottleneck ? "apply-input--error" : ""}`}
                        placeholder="What is not working or causing delays?"
                        value={form.bottleneck}
                        onChange={(e) => set("bottleneck", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Primary Constraint / Pain Point</label>
                      <textarea
                        className={`apply-textarea ${errors.currentPainPoint ? "apply-input--error" : ""}`}
                        placeholder="What specific pain point does this solve?"
                        value={form.currentPainPoint}
                        onChange={(e) => set("currentPainPoint", e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Desired Outcome</label>
                      <textarea
                        className={`apply-textarea ${errors.desiredOutcome ? "apply-input--error" : ""}`}
                        placeholder="What the final system should achieve"
                        value={form.desiredOutcome}
                        onChange={(e) => set("desiredOutcome", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Success Metric</label>
                      <input
                        className={`apply-input ${errors.successMetric ? "apply-input--error" : ""}`}
                        placeholder="How will we measure success?"
                        value={form.successMetric}
                        onChange={(e) => set("successMetric", e.target.value)}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Business Impact</label>
                      <textarea
                        className={`apply-textarea ${errors.businessImpact ? "apply-input--error" : ""}`}
                        placeholder="Impact on operations or revenue"
                        value={form.businessImpact}
                        onChange={(e) => set("businessImpact", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <p className="apply-step__eyebrow">Logistics</p>
                  <h2 className="apply-step__title">Execution Logistics</h2>
                  <div className="apply-fields">
                    <div className="apply-field">
                      <label className="apply-label">Priority</label>
                      <select
                        className={`apply-input ${errors.priority ? "apply-input--error" : ""}`}
                        value={form.priority}
                        onChange={(e) => set("priority", e.target.value)}
                      >
                        <option value="" disabled>Select priority...</option>
                        <option value="High">High (Immediate Bottleneck)</option>
                        <option value="Medium">Medium (Scheduled Growth)</option>
                        <option value="Low">Low (Backlog/Optimizations)</option>
                      </select>
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Desired Completion Date</label>
                      <input
                        className={`apply-input ${errors.completionDate ? "apply-input--error" : ""}`}
                        type="date"
                        value={form.completionDate}
                        onChange={(e) => set("completionDate", e.target.value)}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">System Access & Credentials</label>
                      <textarea
                        className={`apply-textarea ${errors.systemAccess ? "apply-input--error" : ""}`}
                        placeholder="Provide a secure sharing link (1Password, LastPass) to credentials"
                        value={form.systemAccess}
                        onChange={(e) => set("systemAccess", e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="apply-field">
                      <label className="apply-label">Supporting Documents (Optional)</label>
                      <input
                        className="apply-input"
                        type="url"
                        placeholder="URL to process maps, Google Drive, etc."
                        value={form.supportUrl}
                        onChange={(e) => set("supportUrl", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="apply-nav">
          <button
            type="button"
            className="apply-btn apply-btn--ghost"
            onClick={back}
            disabled={submitting}
          >
            Back
          </button>

          {step < TOTAL_STEPS ? (
            <button type="button" className="apply-btn apply-btn--primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="apply-btn apply-btn--primary"
              onClick={submit}
              disabled={submitting}
            >
              {submitting ? "Transmitting..." : "Submit Deployment Request"}
            </button>
          )}
        </div>
        {submitError && <p className="apply-error apply-error--submit">{submitError}</p>}
      </div>

      {/* Step dots */}
      <div className="apply-dots" aria-label="Application progress">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`apply-dot ${i + 1 === step ? "apply-dot--active" : ""} ${i + 1 < step ? "apply-dot--done" : ""}`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
