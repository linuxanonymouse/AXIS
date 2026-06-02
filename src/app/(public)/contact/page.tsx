"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./contact.css";

type FormState = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  budget: string;
  timeline: string;
  brief: string;
  referralSource: string;
};

const INITIAL: FormState = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  brief: "",
  referralSource: "",
};

const PROJECT_TYPES = [
  "Web Development",
  "App Development",
  "Brand & Identity",
  "Marketing & Distribution",
  "Operations Consulting",
  "Strategic Advisory",
  "Full-Stack Deployment",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $5K",
  "$5K $15K",
  "$15K $50K",
  "$50K $100K",
  "$100K+",
  "To be discussed",
];

const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "1 3 months",
  "3 6 months",
  "6+ months",
  "Flexible",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.organization.trim()) errs.organization = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.projectType) errs.projectType = "Select a project type";
    if (!form.budget) errs.budget = "Select a budget range";
    if (!form.timeline) errs.timeline = "Select a timeline";
    if (!form.brief.trim()) errs.brief = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed");
      }
      setSent(true);
      setForm(INITIAL);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content">
        <section className="contact-hero">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="contact-eyebrow"
          >
            Project Intake
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="contact-title"
          >
            Deployment Request
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="contact-body"
          >
            Submit a project request through the Axis Operations intake system. Our team will
            review your specifications and respond within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="contact-card"
          >
            <a href="mailto:operations@axisoperations.ca" className="contact-email">
              operations@axisoperations.ca
            </a>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="contact-sent-state"
                >
                  <p className="contact-sent-title">Transmission received.</p>
                  <p className="contact-sent-body">
                    Your project request has been logged. A confirmation has been sent to your
                    email. Our operations team will respond within 24 hours.
                  </p>
                  <Link href="/diagnostic" className="axis-btn axis-btn--ghost">
                    Start Strategic Diagnostic
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="contact-form"
                  noValidate
                >
                  {/* Row: Name + Organization */}
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-name">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        className={`contact-form__input ${errors.name ? "contact-form__input--error" : ""}`}
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span className="contact-form__error">{errors.name}</span>
                      )}
                    </div>
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-org">
                        Organization
                      </label>
                      <input
                        id="contact-org"
                        className={`contact-form__input ${errors.organization ? "contact-form__input--error" : ""}`}
                        type="text"
                        placeholder="Your organization"
                        value={form.organization}
                        onChange={(e) => set("organization", e.target.value)}
                        autoComplete="organization"
                      />
                      {errors.organization && (
                        <span className="contact-form__error">{errors.organization}</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      className={`contact-form__input ${errors.email ? "contact-form__input--error" : ""}`}
                      type="email"
                      placeholder="you@organization.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="contact-form__error">{errors.email}</span>
                    )}
                  </div>

                  {/* Row: Phone + Website */}
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-phone">
                        Phone <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        className="contact-form__input"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-website">
                        Website <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
                      </label>
                      <input
                        id="contact-website"
                        className="contact-form__input"
                        type="url"
                        placeholder="https://yourcompany.com"
                        value={form.website}
                        onChange={(e) => set("website", e.target.value)}
                        autoComplete="url"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-project-type">
                      Service Required
                    </label>
                    <select
                      id="contact-project-type"
                      className={`contact-form__input ${errors.projectType ? "contact-form__input--error" : ""}`}
                      value={form.projectType}
                      onChange={(e) => set("projectType", e.target.value)}
                    >
                      <option value="">Select a service…</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <span className="contact-form__error">{errors.projectType}</span>
                    )}
                  </div>

                  {/* Row: Budget + Timeline */}
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-budget">
                        Budget Range
                      </label>
                      <select
                        id="contact-budget"
                        className={`contact-form__input ${errors.budget ? "contact-form__input--error" : ""}`}
                        value={form.budget}
                        onChange={(e) => set("budget", e.target.value)}
                      >
                        <option value="">Select budget…</option>
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      {errors.budget && (
                        <span className="contact-form__error">{errors.budget}</span>
                      )}
                    </div>
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-timeline">
                        Timeline
                      </label>
                      <select
                        id="contact-timeline"
                        className={`contact-form__input ${errors.timeline ? "contact-form__input--error" : ""}`}
                        value={form.timeline}
                        onChange={(e) => set("timeline", e.target.value)}
                      >
                        <option value="">Select timeline…</option>
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.timeline && (
                        <span className="contact-form__error">{errors.timeline}</span>
                      )}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-brief">
                      Project Description
                    </label>
                    <textarea
                      id="contact-brief"
                      className={`contact-form__textarea ${errors.brief ? "contact-form__input--error" : ""}`}
                      placeholder="Describe your project requirements, goals, and desired outcomes…"
                      value={form.brief}
                      onChange={(e) => set("brief", e.target.value)}
                      rows={5}
                    />
                    {errors.brief && (
                      <span className="contact-form__error">{errors.brief}</span>
                    )}
                  </div>

                  {/* Referral Source */}
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-referral">
                      How did you hear about Axis? <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
                    </label>
                    <input
                      id="contact-referral"
                      className="contact-form__input"
                      type="text"
                      placeholder="e.g. Google, referral, social media"
                      value={form.referralSource}
                      onChange={(e) => set("referralSource", e.target.value)}
                    />
                  </div>

                  {submitError && (
                    <p className="contact-form__submit-error">{submitError}</p>
                  )}

                  <div className="contact-form__actions">
                    <button
                      type="submit"
                      className="axis-btn axis-btn--primary"
                      disabled={submitting}
                    >
                      {submitting ? "Transmitting…" : "Submit Project Request"}
                    </button>
                    <p className="contact-note">
                      For structured evaluation, begin with the{" "}
                      <Link href="/diagnostic" className="contact-note__link">
                        Strategic Diagnostic
                      </Link>
                      .
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
