"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./diagnostic.css";

const EVALUATION_CARDS = [
  {
    title: "Revenue Environment",
    body: "How revenue is created, captured, lost, and scaled.",
  },
  {
    title: "Infrastructure Maturity",
    body: "How systems, tools, workflows, and platforms support or restrict growth.",
  },
  {
    title: "Operational Readiness",
    body: "How decisions, ownership, execution, and team flow are structured.",
  },
  {
    title: "Distribution Capacity",
    body: "How attention, content, audience, and acquisition channels are controlled.",
  },
  {
    title: "Intelligence & Reporting",
    body: "How performance is tracked, interpreted, and converted into decisions.",
  },
  {
    title: "Expansion Potential",
    body: "Where partnerships, new channels, or strategic opportunities may create leverage.",
  },
];

const FLOW_STEPS = [
  { step: "01", title: "Submit Diagnostic", body: "The organization completes the structured intake." },
  { step: "02", title: "AI Review", body: "Responses are processed through the Axis diagnostic engine and scoring logic." },
  { step: "03", title: "Strategic Assessment", body: "The system evaluates constraints, maturity, opportunity, and likely entry point." },
  { step: "04", title: "Internal Review", body: "Axis reviews the diagnostic output to confirm alignment and determine next steps." },
  { step: "05", title: "Response Issued", body: "The organization receives direction based on fit, readiness, and strategic opportunity." },
];

const SCORE_PREVIEW = [
  { label: "Overall Alignment", value: "74" },
  { label: "Infrastructure", value: "68" },
  { label: "Distribution", value: "71" },
  { label: "Intelligence", value: "66" },
  { label: "Monetization", value: "72" },
];

export default function DiagnosticPage() {
  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content">
        <section className="axis-hero">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="axis-hero__eyebrow"
          >
            Axis Alignment Application
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="axis-hero__title"
          >
            Strategic Diagnostic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="axis-hero__body"
          >
            Alignment comes before access. Diagnosis before deployment. The Axis Strategic
            Diagnostic identifies structural constraints, evaluates growth readiness, and
            determines where Axis can be applied.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="axis-hero__micro"
          >
            Not every opportunity requires Axis. Not every organization is aligned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="axis-hero__ctas"
          >
            <Link href="/apply" className="axis-btn axis-btn--primary">
              Begin Diagnostic
            </Link>
            <Link href="/overview" className="axis-btn axis-btn--ghost">
              Explore Axis
            </Link>
          </motion.div>
        </section>

        <section className="axis-section">
          <h2 className="axis-section__title">Diagnosis precedes deployment.</h2>
          <p className="axis-section__lead">
            Most organizations misdiagnose growth problems. Axis evaluates revenue structure,
            infrastructure maturity, operational constraints, distribution capacity, performance
            visibility, and expansion readiness not surface-level symptoms.
          </p>
        </section>

        <section className="axis-section">
          <h2 className="axis-section__title">The Evaluation Framework</h2>
          <div className="axis-grid axis-grid--six">
            {EVALUATION_CARDS.map((card) => (
              <div key={card.title} className="axis-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="axis-section">
          <h2 className="axis-section__title">From Submission to Strategic Direction</h2>
          <div className="diagnostic-flow">
            {FLOW_STEPS.map((item) => (
              <div key={item.step} className="diagnostic-flow__step">
                <span className="diagnostic-flow__num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="axis-section">
          <h2 className="axis-section__title">What Happens After Submission</h2>
          <p className="axis-section__lead">
            Once submitted, the diagnostic generates an internal evaluation including alignment
            scores, primary constraint, strategic insight, recommended Axis pathway, and next
            step recommendation.
          </p>
          <div className="diagnostic-report">
            <div className="diagnostic-report__scores">
              {SCORE_PREVIEW.map((s) => (
                <div key={s.label} className="diagnostic-report__score">
                  <span className="diagnostic-report__score-label">{s.label}</span>
                  <span className="diagnostic-report__score-value">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="diagnostic-report__insight">
              <p className="diagnostic-report__eyebrow">Primary Constraint</p>
              <p className="diagnostic-report__constraint">Infrastructure maturity</p>
              <p className="diagnostic-report__pathway">
                Recommended pathway: Axis Operations → Axis Studio
              </p>
            </div>
          </div>
        </section>

        <section className="axis-section">
          <h2 className="axis-section__title">Built as a Website Intake, Not a Native Form</h2>
          <p className="axis-section__lead">
            The Axis Alignment Application is built directly inside the Axis website multi-step,
            progress-tracked, mobile-first, and fully branded. ClickUp and automation tools operate
            behind the scenes; the public experience remains Axis-controlled.
          </p>
          <div className="axis-grid">
            <div className="axis-card">
              <h3>Multi-step application</h3>
              <p>Six structured screens with progress tracking and review before submit.</p>
            </div>
            <div className="axis-card">
              <h3>AI diagnostic engine</h3>
              <p>Responses power scoring, constraints analysis, and pathway recommendation.</p>
            </div>
            <div className="axis-card">
              <h3>Private & confidential</h3>
              <p>Submissions are stored securely and reviewed before any client-facing summary.</p>
            </div>
          </div>
        </section>

        <section className="axis-section">
          <h2 className="axis-section__title">Axis is applied where structure can create leverage.</h2>
          <p className="axis-section__lead">
            This diagnostic does not guarantee engagement. It determines whether Axis is the right
            operating system for the organization&apos;s current stage. The purpose is not volume 
            the purpose is alignment.
          </p>
        </section>

        <section className="axis-section axis-section--cta">
          <h2 className="axis-section__title">Begin with diagnosis. Proceed with alignment.</h2>
          <p className="axis-section__lead">
            Complete the Strategic Diagnostic to determine where Axis can be applied and whether
            the organization is aligned for the next stage.
          </p>
          <div className="axis-hero__ctas">
            <Link href="/apply" className="axis-btn axis-btn--primary">
              Start Strategic Diagnostic
            </Link>
            <Link href="/divisions" className="axis-btn axis-btn--ghost">
              Explore Divisions
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
