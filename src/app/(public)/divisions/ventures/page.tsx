"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VenturesScene from "@/components/scene/VenturesScene";
import DynamicBriefButton from "@/components/ui/DynamicBriefButton";
import "./ventures.css";

export default function VenturesPage() {
  return (
    <main className="ventures-main">
      <Navbar />
      <VenturesScene />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* SECTION 01: Hero Opening */}
      <section className="ventures-hero">
        <div className="ventures-hero-bg" />
        
        <div className="ventures-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="ventures-division-label"
          >
            Axis Ventures
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="ventures-hero-title"
          >
            Strategic Partnerships
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="ventures-hero-subtitle"
          >
            The Growth Layer
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="ventures-hero-text"
          >
            Scale requires leverage. Axis Ventures structures aligned partnerships, equity models, and expansion opportunities designed to create compounding, long-term enterprise value.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="ventures-hero-microtext"
          >
            Growth through alignment. Value through structure.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="ventures-hero-ctas"
          >
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="ventures_brief_url" label="View Ventures Brief" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: The Ventures Problem */}
      <section className="ventures-problem">
        <div className="ventures-problem-inner">
          <div className="problem-text-content">
            <h2 className="section-heading">Most partnerships fail due to misaligned incentives.</h2>
            <p className="body-text">Traditional vendor-client relationships break down when growth accelerates. Interests diverge, costs inflate, and execution suffers.</p>
            <p className="body-text mt-4">True scale requires structural alignment. When incentives, capital, and execution are tied to the exact same outcome, momentum is unstoppable.</p>
          </div>
        </div>
      </section>

      {/* SECTION 03: What Axis Ventures Builds */}
      <section className="ventures-systems">
        <div className="ventures-systems-inner">
          <h2 className="section-heading text-center mb-16">The Architecture of Growth.</h2>
          <div className="systems-grid">
            
            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Equity Partnerships</h3>
              <p className="body-text">Structuring shared-risk, shared-reward models that align long-term value creation with immediate operational execution.</p>
            </div>
            
            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Capital Alignment</h3>
              <p className="body-text">Deploying financial resources strategically to accelerate infrastructure deployment and media distribution.</p>
            </div>

            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Network Expansion</h3>
              <p className="body-text">Facilitating access to the broader Axis network of partners, resources, and institutional relationships.</p>
            </div>

            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Enterprise Value Creation</h3>
              <p className="body-text">Strengthening the systems, revenue architecture, partnerships, and operating structure that increase long-term enterprise value.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 06: Role Within Axis */}
      <section className="ventures-role">
        <div className="ventures-role-inner">
          <div className="role-content">
            <h2 className="section-heading">Ventures Activates Expansion.</h2>
            <p className="body-text mb-8">Axis Ventures sits at the top of the ecosystem, applying leverage to the structures built by the other divisions. It is the catalyst for exponential, aligned growth.</p>
            
            <div className="role-relationships" style={{ borderLeft: '2px solid #CDA464', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#cdba7b' }}>Operations</span> defines direction.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#4A90E2' }}>Studio</span> builds infrastructure.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#9b59b6' }}>Intelligence</span> governs performance.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#e67e22' }}>Media</span> drives distribution.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#e67e22' }}>Ventures</span> activates expansion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: Final CTA */}
      <section className="ventures-final-cta">
        <div className="final-cta-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-heading">Align the incentives.</h2>
          <p className="body-text" style={{ marginBottom: '3rem' }}>Partner with Axis to structure the leverage required for exponential scale.</p>
          <div className="ventures-hero-ctas justify-center">
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="ventures_brief_url" label="View Ventures Brief" />
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}



