"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OperationsScene from "@/components/scene/OperationsScene";
import DynamicBriefButton from "@/components/ui/DynamicBriefButton";
import "./operations.css";

export default function OperationsPage() {
  return (
    <main className="operations-main">
      <Navbar />
      <OperationsScene />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* SECTION 01: Hero Opening */}
      <section className="operations-hero">
        <div className="operations-hero-bg">
          <div className="operations-hero-gradient" />
        </div>
        
        <div className="operations-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="operations-division-label"
          >
            Axis Operations
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="operations-hero-title"
          >
            Strategic Advisory
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="operations-hero-text"
          >
            The command layer of the Axis operating system. We define the strategic architecture required for organizations to scale with clarity, structure, and control.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="operations-hero-ctas"
          >
            <Link href="/diagnostic" className="hero-btn-primary">Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="operations_brief_url" label="View Strategic Advisory Brief" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: The Strategic Problem */}
      <section className="operations-problem">
        <div className="operations-problem-inner">
          <div className="problem-text-content">
            <h2 className="section-heading">Growth breaks where structure breaks.</h2>
            <p className="body-text">Revenue increases, but clarity declines.</p>
            <p className="body-text">Demand grows, but systems cannot support it.</p>
            <p className="body-text">Teams expand, but efficiency decreases.</p>
            <p className="body-text mt-4">Most organizations respond by adding more tools, more people, or more marketing. Axis Operations addresses the problem at the structural level.</p>
          </div>
          <div className="problem-visual">
            <div className="fractured-grid" />
          </div>
        </div>
      </section>

      {/* SECTION 03: What Axis Operations Does */}
      <section className="operations-services">
        <div className="operations-services-inner">
          <h2 className="section-heading text-center mb-16">Strategic Infrastructure Design.</h2>
          <div className="services-grid">
            
            <div className="service-card">
              <div className="service-icon" />
              <h3 className="service-title">Opportunity Evaluation</h3>
              <p className="service-desc">Assess where growth potential exists and where infrastructure maturity is limiting scale.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon" />
              <h3 className="service-title">Revenue Architecture</h3>
              <p className="service-desc">Structure how revenue is designed, captured, reinforced, and scaled.</p>
            </div>

            <div className="service-card">
              <div className="service-icon" />
              <h3 className="service-title">Operational Alignment</h3>
              <p className="service-desc">Clarify ownership, decision flow, workflows, and execution rhythm.</p>
            </div>

            <div className="service-card">
              <div className="service-icon" />
              <h3 className="service-title">Strategic Reporting</h3>
              <p className="service-desc">Design visibility systems so leadership can make informed decisions instead of reactive ones.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 04: The Axis Infrastructure Method */}
      <section className="operations-method">
        <div className="operations-method-inner">
          <h2 className="section-heading text-center mb-16">From Alignment to Deployment.</h2>
          <div className="method-flow">
            <div className="method-step">
              <span className="method-number">01</span>
              <h4 className="method-title">Strategic Alignment</h4>
              <p className="method-desc">Confirm the organization's objectives, constraints, and readiness.</p>
            </div>
            <div className="method-step">
              <span className="method-number">02</span>
              <h4 className="method-title">Infrastructure Diagnostics</h4>
              <p className="method-desc">Identify gaps across revenue, operations, audience, and digital systems.</p>
            </div>
            <div className="method-step">
              <span className="method-number">03</span>
              <h4 className="method-title">Architecture Design</h4>
              <p className="method-desc">Design the infrastructure model required to support scalable growth.</p>
            </div>
            <div className="method-step">
              <span className="method-number">04</span>
              <h4 className="method-title">System Deployment</h4>
              <p className="method-desc">Move from strategy into execution through Axis Studio, partner teams, or internal teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: What Changes */}
      <section className="operations-changes">
        <div className="operations-changes-inner">
          <h2 className="section-heading text-center mb-16">From momentum to control.</h2>
          
          <div className="changes-split">
            <div className="changes-before">
              <h3 className="changes-title text-red">Before Axis Operations</h3>
              <ul className="changes-list">
                <li>Unclear decision flow</li>
                <li>Disconnected systems</li>
                <li>Reactive execution</li>
                <li>Unstructured revenue</li>
                <li>Limited visibility</li>
                <li>Operational pressure</li>
              </ul>
            </div>
            <div className="changes-after">
              <h3 className="changes-title text-gold">After Axis Operations</h3>
              <ul className="changes-list">
                <li>Defined strategy</li>
                <li>Clear ownership</li>
                <li>Structured infrastructure</li>
                <li>Scalable operating rhythm</li>
                <li>Revenue visibility</li>
                <li>Controlled growth</li>
              </ul>
            </div>
          </div>
          <p className="changes-footer">The outcome is not incremental improvement. It is structural transformation.</p>
        </div>
      </section>

      {/* SECTION 06: Role Within Axis */}
      <section className="operations-role">
        <div className="operations-role-inner">
          <div className="role-content">
            <h2 className="section-heading">Operations Defines Direction.</h2>
            <p className="body-text mb-8">Axis Operations is the strategic center of the Axis ecosystem. It defines the architecture before infrastructure is deployed, intelligence is governed, distribution is controlled, or expansion is activated.</p>
            
            <div className="role-relationships">
              <p><span className="text-gold">Operations</span> defines direction.</p>
              <p><span className="text-blue">Studio</span> deploys infrastructure.</p>
              <p><span className="text-purple">Intelligence</span> governs performance.</p>
              <p><span className="text-orange">Media</span> controls distribution.</p>
              <p><span className="text-green">Ventures</span> activates expansion.</p>
            </div>
          </div>
          <div className="role-visual">
            <div className="central-compass" />
          </div>
        </div>
      </section>

      {/* SECTION 07: Final CTA */}
      <section className="operations-final-cta">
        <div className="final-cta-content">
          <h2 className="final-cta-heading">Structure comes before scale.</h2>
          <p className="final-cta-text">Organizations begin with strategic alignment to determine where infrastructure is required and where value is being lost.</p>
          <div className="operations-hero-ctas justify-center">
            <Link href="/diagnostic" className="hero-btn-primary">Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="operations_brief_url" label="View Strategic Advisory Brief" />
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}



