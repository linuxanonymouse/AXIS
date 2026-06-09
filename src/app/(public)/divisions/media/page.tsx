"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MediaScene from "@/components/scene/MediaScene";
import DynamicBriefButton from "@/components/ui/DynamicBriefButton";
import "./media.css";

export default function MediaPage() {
  return (
    <main className="media-main">
      <Navbar />
      <MediaScene />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* SECTION 01: Hero Opening */}
      <section className="media-hero">
        <div className="media-hero-bg" />
        
        <div className="media-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="media-division-label"
          >
            Axis Media
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="media-hero-title"
          >
            Distribution Ecosystems
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="media-hero-subtitle"
          >
            The Market Layer
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="media-hero-text"
          >
            Attention is not enough. You need controlled distribution. Axis Media builds the content architectures and distribution networks required to capture, direct, and convert market attention at scale.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="media-hero-microtext"
          >
            Own the narrative. Control the distribution.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="media-hero-ctas"
          >
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="media_brief_url" label="View Media Brief" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: The Media Problem */}
      <section className="media-problem">
        <div className="media-problem-inner">
          <div className="problem-text-content">
            <h2 className="section-heading">Most brands rent their audience. Axis builds distribution systems.</h2>
            <p className="body-text">Relying solely on external platforms and paid acquisition is fragile. When algorithms change, revenue drops. When costs rise, margins shrink.</p>
            <p className="body-text mt-4">Organizations scale securely when they own their distribution channels, architect compelling content ecosystems, and transform passive viewers into engaged communities.</p>
          </div>
        </div>
      </section>

      {/* SECTION 03: What Axis Media Builds */}
      <section className="media-systems">
        <div className="media-systems-inner">
          <h2 className="section-heading text-center mb-16">The Architecture of Attention.</h2>
          <div className="systems-grid">
            
            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Content Ecosystems</h3>
              <p className="body-text">Designing multi-format content strategies that compound across platforms and capture market share.</p>
            </div>
            
            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Audience Capture</h3>
              <p className="body-text">Building the pathways to move audiences from rented platforms (social media) to owned platforms (newsletters, communities).</p>
            </div>

            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Brand Authority</h3>
              <p className="body-text">Building authority through high-value content, institutional-grade positioning, and consistent market presence.</p>
            </div>

            <div className="system-card">
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Distribution Networks</h3>
              <p className="body-text">Executing precise distribution workflows to ensure the right message hits the right node at the exact right moment.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 06: Role Within Axis */}
      <section className="media-role">
        <div className="media-role-inner">
          <div className="role-content">
            <h2 className="section-heading">Media Controls Distribution.</h2>
            <p className="body-text mb-8">Axis Media activates the infrastructure built by Studio and leverages the data governed by Intelligence. It is the engine that drives market engagement and feeds the operational system with new opportunities.</p>
            
            <div className="role-relationships" style={{ borderLeft: '2px solid #CDA464', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#cdba7b' }}>Operations</span> defines direction.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#4A90E2' }}>Studio</span> builds infrastructure.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#9b59b6' }}>Intelligence</span> governs performance.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#e67e22' }}>Media</span> drives distribution.</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}><span style={{ color: '#2ecc71' }}>Ventures</span> activates expansion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: Final CTA */}
      <section className="media-final-cta">
        <div className="final-cta-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-heading">Own the narrative.</h2>
          <p className="body-text" style={{ marginBottom: '3rem' }}>Deploy the distribution ecosystem required to capture market share and drive scalable growth.</p>
          <div className="media-hero-ctas justify-center">
            <Link href="/diagnostic" className="hero-btn-primary" style={{ borderColor: '#CDA464', color: '#CDA464', background: 'rgba(205, 164, 100, 0.1)' }}>Start Strategic Diagnostic</Link>
            <DynamicBriefButton divisionKey="media_brief_url" label="View Media Brief" />
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}



