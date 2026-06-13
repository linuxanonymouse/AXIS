"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntelligenceScene from "@/components/scene/IntelligenceScene";
import DynamicBriefButton from "@/components/ui/DynamicBriefButton";
import JarvisBot from "@/components/ui/JarvisBot";
import "./intelligence.css";

export default function IntelligencePage() {
  return (
    <main className="intelligence-main">
      <Navbar />
      <IntelligenceScene />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* SECTION 01: Hero Opening */}
      <section className="intelligence-hero">
        <div className="intelligence-hero-bg">
          <div className="intelligence-core-glow" />
          <div className="intelligence-neural-paths" />
        </div>
        
        <div className="intelligence-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="intelligence-division-label"
          >
            Axis Intelligence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="intelligence-hero-title"
          >
            Data & AI Systems
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="intelligence-hero-subtitle"
          >
            The Control Layer
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="intelligence-hero-text"
          >
            Systems operate. Intelligence compounds. Axis Intelligence governs decision-making, automation, performance optimization, and continuous improvement across the Axis ecosystem.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="intelligence-hero-microtext"
          >
            Observation is not control. Intelligence is.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="intelligence-hero-ctas"
          >
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="intelligence_brief_url" label="View Intelligence Brief" />
          </motion.div>
        </div>
      </section>

      {/* JARVIS BOT SECTION */}
      <section style={{ padding: "4rem 2rem", position: "relative", zIndex: 20 }}>
        <JarvisBot />
      </section>

      {/* SECTION 02: The Intelligence Problem */}
      <section className="intelligence-problem">
        <div className="intelligence-problem-inner">
          <div className="problem-text-content">
            <h2 className="section-heading">Most organizations operate systems without intelligence.</h2>
            <p className="body-text">Data exists, but it is unused.<br/>Systems function, but they do not improve.<br/>Decisions are made, but they are not optimized.<br/>Growth occurs, but it does not compound.</p>
            <p className="body-text mt-4">The result is slow decision-making, operational inefficiency, and missed strategic opportunity. Axis Intelligence closes that gap.</p>
          </div>
          <div className="intelligence-problem-visual">
            <div className="visual-left">
              <span className="visual-label">Disconnected. Reactive. Blind.</span>
              <div className="scattered-data" />
            </div>
            <div className="visual-right">
              <span className="visual-label text-purple">Connected. Intelligent. Controlled.</span>
              <div className="purple-core" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: The Axis Shift */}
      <section className="intelligence-shift">
        <div className="intelligence-shift-inner">
          <h2 className="section-heading text-center mb-16">From observation to control.</h2>
          <p className="body-text text-center mb-16 max-w-3xl mx-auto">Axis Intelligence replaces passive reporting with active system control. The system does not simply report what happened. It identifies what is happening, why it is happening, and what action should occur next.</p>
          
          <div className="shift-panels">
            <div className="shift-panel">
              <div className="shift-weak">
                <span className="shift-title">Analytics</span>
                <span className="shift-desc">Tracking what happened.</span>
              </div>
              <div className="shift-arrow">↓</div>
              <div className="shift-strong">
                <span className="shift-title text-purple">Intelligence</span>
                <span className="shift-desc">Understanding what is happening.</span>
              </div>
            </div>

            <div className="shift-panel">
              <div className="shift-weak">
                <span className="shift-title">Tracking</span>
                <span className="shift-desc">Collecting data.</span>
              </div>
              <div className="shift-arrow">↓</div>
              <div className="shift-strong">
                <span className="shift-title text-purple">Control</span>
                <span className="shift-desc">Directing what happens next.</span>
              </div>
            </div>

            <div className="shift-panel">
              <div className="shift-weak">
                <span className="shift-title">Reaction</span>
                <span className="shift-desc">Responding too late.</span>
              </div>
              <div className="shift-arrow">↓</div>
              <div className="shift-strong">
                <span className="shift-title text-purple">Direction</span>
                <span className="shift-desc">Acting with precision and speed.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: The Intelligence Stack */}
      <section className="intelligence-stack">
        <div className="intelligence-stack-inner">
          <h2 className="section-heading text-center mb-4">The Intelligence Stack.</h2>
          <p className="body-text text-center mb-16">The intelligence architecture that powers the Axis ecosystem.</p>
          
          <div className="stack-container">
            <div className="stack-beam" />
            
            <div className="stack-layer">
              <span className="stack-number">01</span>
              <div className="stack-content">
                <h3 className="stack-title">Data Aggregation</h3>
                <p className="stack-desc">All signals are centralized into one intelligence system including website data, social behavior, CRM systems, and operational workflows.</p>
              </div>
            </div>

            <div className="stack-layer">
              <span className="stack-number">02</span>
              <div className="stack-content">
                <h3 className="stack-title">Data Structuring</h3>
                <p className="stack-desc">Data is cleaned, standardized, mapped, and integrated into a reliable environment. Reliable inputs produce reliable decisions.</p>
              </div>
            </div>

            <div className="stack-layer">
              <span className="stack-number">03</span>
              <div className="stack-content">
                <h3 className="stack-title">Intelligence Generation</h3>
                <p className="stack-desc">Patterns are identified. Opportunities are detected. Outcomes are predicted. Actions are determined. This is proactive intelligence.</p>
              </div>
            </div>

            <div className="stack-layer">
              <span className="stack-number">04</span>
              <div className="stack-content">
                <h3 className="stack-title">System Activation</h3>
                <p className="stack-desc">Decisions are executed across workflows, dashboards, triggers, and automation systems. No delay between decision and execution.</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 05: Continuous Control Loop */}
      <section className="intelligence-loop">
        <div className="intelligence-loop-inner">
          <h2 className="section-heading text-center mb-16">Every action feeds the system.</h2>
          <div className="loop-grid">
            <div className="loop-item">
              <span className="loop-label">Measure</span>
              <span className="loop-desc">Outcomes are measured.</span>
            </div>
            <div className="loop-item">
              <span className="loop-label">Learn</span>
              <span className="loop-desc">Models are recalibrated.</span>
            </div>
            <div className="loop-item">
              <span className="loop-label">Improve</span>
              <span className="loop-desc">Decisions are refined.</span>
            </div>
            <div className="loop-item">
              <span className="loop-label">Execute</span>
              <span className="loop-desc">Decisions are executed.</span>
            </div>
            <div className="loop-item">
              <span className="loop-label text-purple">Compound</span>
              <span className="loop-desc">Performance compounds with every cycle.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: Final CTA */}
      <section className="intelligence-final-cta">
        <div className="final-cta-content">
          <h2 className="final-cta-heading">Systems operate. Intelligence compounds.</h2>
          <p className="final-cta-text">Deploy the intelligence architecture required to govern performance across your organization.</p>
          <div className="studio-hero-ctas justify-center mt-8">
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="intelligence_brief_url" label="View Intelligence Brief" />
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}



