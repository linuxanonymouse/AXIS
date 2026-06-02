"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StudioScene from "@/components/scene/StudioScene";
import DynamicBriefButton from "@/components/ui/DynamicBriefButton";
import "./studio.css";

export default function StudioPage() {
  return (
    <main className="studio-main">
      <Navbar />
      <StudioScene />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* SECTION 01: Hero Opening */}
      <section className="studio-hero">
        <div className="studio-hero-bg">
          <div className="studio-grid-overlay" />
          <div className="studio-hero-gradient" />
        </div>
        
        <div className="studio-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="studio-division-label"
          >
            Axis Studio
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="studio-hero-title"
          >
            Digital Ecosystems
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="studio-hero-subtitle"
          >
            The Deployment Layer
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="studio-hero-text"
          >
            Strategy becomes infrastructure. Axis Studio converts strategic architecture into the platforms, systems, automations, and execution environments required for scalable growth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="studio-hero-microtext"
          >
            Built to operate. Engineered to scale.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="studio-hero-ctas"
          >
            <Link href="/diagnostic" className="hero-btn-primary">Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="studio_brief_url" label="View Studio Brief" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: The Infrastructure Problem */}
      <section className="studio-problem">
        <div className="studio-problem-inner">
          <div className="problem-text-content">
            <h2 className="section-heading">Growth fails when infrastructure cannot carry it.</h2>
            <p className="body-text">Many organizations create demand before their backend can support it.</p>
            <p className="body-text mt-4">The result is predictable:<br/>Systems become fragmented.<br/>Workflows become manual.<br/>Delivery becomes inconsistent.</p>
            <p className="body-text mt-4">Opportunities are lost because execution cannot keep pace. Axis Studio exists to correct the infrastructure layer.</p>
          </div>
          <div className="problem-visual-split">
            <div className="visual-fragmented">
              <span className="visual-label">Fragmented</span>
            </div>
            <div className="visual-arrow">→</div>
            <div className="visual-connected">
              <span className="visual-label text-blue">Built for Scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: What Axis Studio Builds */}
      <section className="studio-systems">
        <div className="studio-systems-inner">
          <h2 className="section-heading text-center mb-16">Infrastructure That Supports Scale.</h2>
          <div className="systems-grid">
            
            <div className="system-card">
              <div className="system-icon" />
              <h3 className="system-title">Website Systems</h3>
              <p className="system-desc">High-performance websites, landing pages, digital environments, and conversion-ready platforms.</p>
            </div>
            
            <div className="system-card">
              <div className="system-icon" />
              <h3 className="system-title">Automation Systems</h3>
              <p className="system-desc">Operational workflows, lead routing, intake flows, notifications, follow-ups, and backend process automation.</p>
            </div>

            <div className="system-card">
              <div className="system-icon" />
              <h3 className="system-title">Growth Systems</h3>
              <p className="system-desc">Funnels, campaign infrastructure, customer journeys, CRM flows, and revenue-supporting digital pathways.</p>
            </div>

            <div className="system-card">
              <div className="system-icon" />
              <h3 className="system-title">Scale Systems</h3>
              <p className="system-desc">Backend structures, repeatable delivery systems, reporting environments, and operational infrastructure that reduce dependency on manual execution.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 04: How Axis Studio Works */}
      <section className="studio-method">
        <div className="studio-method-inner">
          <h2 className="section-heading text-center mb-16">From Strategy to System.</h2>
          <div className="studio-method-flow">
            <div className="studio-step">
              <span className="studio-number">01</span>
              <h4 className="studio-title">Strategic Architecture Received</h4>
              <p className="studio-desc">Axis Operations defines the direction, constraints, and infrastructure requirements.</p>
            </div>
            <div className="studio-step">
              <span className="studio-number">02</span>
              <h4 className="studio-title">System Planning</h4>
              <p className="studio-desc">Studio maps the required website, automation, funnel, CRM, and backend components.</p>
            </div>
            <div className="studio-step">
              <span className="studio-number">03</span>
              <h4 className="studio-title">Infrastructure Build</h4>
              <p className="studio-desc">The systems are designed, developed, connected, and tested.</p>
            </div>
            <div className="studio-step">
              <span className="studio-number">04</span>
              <h4 className="studio-title">Deployment</h4>
              <p className="studio-desc">The infrastructure goes live and is prepared for ongoing optimization.</p>
            </div>
            <div className="studio-step">
              <span className="studio-number">05</span>
              <h4 className="studio-title">Intelligence Feedback</h4>
              <p className="studio-desc">Axis Intelligence monitors performance and identifies improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: What Changes */}
      <section className="studio-changes">
        <div className="studio-changes-inner">
          <h2 className="section-heading text-center mb-16">From manual execution to structured infrastructure.</h2>
          
          <div className="studio-changes-split">
            <div className="studio-changes-before">
              <h3 className="changes-title text-red">Before Axis Studio</h3>
              <ul className="changes-list">
                <li>Disconnected tools</li>
                <li>Manual handoffs</li>
                <li>Weak intake flows</li>
                <li>Slow delivery</li>
                <li>No backend visibility</li>
                <li>Execution bottlenecks</li>
              </ul>
            </div>
            <div className="studio-changes-after">
              <h3 className="changes-title text-blue">After Axis Studio</h3>
              <ul className="changes-list">
                <li>Connected systems</li>
                <li>Automated workflows</li>
                <li>Structured intake</li>
                <li>Repeatable delivery</li>
                <li>Clear backend infrastructure</li>
                <li>Execution capacity</li>
              </ul>
            </div>
          </div>
          <p className="changes-footer mt-12">Most organizations are not limited by ambition. They are limited by infrastructure.</p>
        </div>
      </section>

      {/* SECTION 06: Role Within Axis */}
      <section className="studio-role">
        <div className="studio-role-inner">
          <div className="role-content">
            <h2 className="section-heading">Studio Builds the System.</h2>
            <p className="body-text mb-8">Axis Studio turns strategic direction into operational infrastructure. It builds the environments where execution happens, data is collected, distribution is supported, and revenue pathways become functional.</p>
            
            <div className="role-relationships">
              <p><span className="text-gold">Operations</span> defines direction.</p>
              <p><span className="text-blue">Studio</span> builds infrastructure.</p>
              <p><span className="text-purple">Intelligence</span> governs performance.</p>
              <p><span className="text-orange">Media</span> drives distribution.</p>
              <p><span className="text-green">Ventures</span> activates expansion.</p>
            </div>
          </div>
          <div className="role-visual">
            <div className="blue-grid" />
          </div>
        </div>
      </section>

      {/* SECTION 07: Final CTA */}
      <section className="studio-final-cta">
        <div className="final-cta-content">
          <h2 className="final-cta-heading">Infrastructure determines execution.</h2>
          <p className="final-cta-text">Axis Studio is applied when organizations require systems, platforms, automations, and backend infrastructure to support scalable growth.</p>
          <div className="studio-hero-ctas justify-center">
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="studio_brief_url" label="View Studio Brief" />
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}



