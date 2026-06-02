"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EcosystemGraph from "@/components/overview/EcosystemGraph";
import DynamicBriefButton from "@/components/ui/DynamicBriefButton";
import "./divisions.css";

const divisionsData = [
  {
    number: "01",
    name: "Axis Operations",
    subtitle: "Strategic Advisory",
    description: "Axis Operations defines strategic direction, structure, decision flow, and organizational alignment. It identifies where value exists, where it is being lost, and what structural conditions must be installed to support scale.",
    color: "#cdba7b", // amber gold
    link: "/divisions/operations",
    briefKey: "operations_brief_url"
  },
  {
    number: "02",
    name: "Axis Studio",
    subtitle: "Infrastructure Deployment",
    description: "Axis Studio builds the systems, platforms, automations, and execution environments required for scale. It converts strategy into infrastructure and removes the operational bottlenecks that prevent growth from becoming repeatable.",
    color: "#4A90E2", // blue
    link: "/divisions/studio",
    briefKey: "studio_brief_url"
  },
  {
    number: "03",
    name: "Axis Intelligence",
    subtitle: "Data & AI Systems",
    description: "Axis Intelligence governs performance, automation, analytics, optimization, and continuous improvement across the ecosystem. It is the control layer that helps systems compound instead of simply operate.",
    color: "#9b59b6", // lava purple
    link: "/divisions/intelligence",
    briefKey: "intelligence_brief_url"
  },
  {
    number: "04",
    name: "Axis Media",
    subtitle: "Distribution Ecosystems",
    description: "Axis Media controls how attention, content, audience, and perception move through the market. Axis Media designs and operates controlled distribution ecosystems that determine how attention is captured, directed, and converted.",
    color: "#e67e22", // amber/silver
    link: "/divisions/media",
    briefKey: "media_brief_url"
  },
  {
    number: "05",
    name: "Axis Ventures",
    subtitle: "Strategic Partnerships",
    description: "Axis Ventures structures aligned partnerships and expansion opportunities designed for long-term value creation. It is selective, partnership-driven, and focused on growth initiatives where incentives, execution, and outcomes are aligned.",
    color: "#2ecc71", // emerald green
    link: "/divisions/ventures",
    briefKey: "ventures_brief_url"
  }
];

export default function DivisionsPage() {
  return (
    <main className="divisions-main">
      <Navbar />
      
      <div className="divisions-content-wrapper">
        {/* SECTION 01: Hero Opening */}
        <section className="divisions-hero">
        <div className="divisions-hero-bg">
          {/* Simulated 5 glowing chambers */}
          <div className="chamber" style={{ '--chamber-color': '#cdba7b' } as any} />
          <div className="chamber" style={{ '--chamber-color': '#4A90E2' } as any} />
          <div className="chamber" style={{ '--chamber-color': '#9b59b6' } as any} />
          <div className="chamber" style={{ '--chamber-color': '#e67e22' } as any} />
          <div className="chamber" style={{ '--chamber-color': '#2ecc71' } as any} />
        </div>
        
        <div className="divisions-hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="divisions-hero-title"
          >
            Five Layers.<br/>One Operating System.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="divisions-hero-text"
          >
            Axis is structured across interconnected divisions that define strategy, build infrastructure, govern intelligence, control distribution, and activate scalable growth.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="divisions-hero-ctas"
          >
            <a href="#system" className="hero-btn-primary">Explore the Divisions</a>
            <a href="#system" className="hero-btn-secondary">View the System</a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 02: The Axis System */}
      <section id="system" className="divisions-system">
        <div className="divisions-system-inner">
          <h2 className="section-heading text-center">The Axis System</h2>
          <motion.div 
            className="divisions-graph-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <EcosystemGraph isActive={true} centerLayout={true} />
          </motion.div>
        </div>
      </section>

      {/* SECTION 03: The Five Divisions */}
      <section className="divisions-cards-section">
        <div className="divisions-cards-inner">
          {divisionsData.map((div, i) => (
            <motion.div 
              key={div.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="division-card"
            >
              <div className="division-card-glow" style={{ backgroundColor: div.color }} />
              <div className="division-card-content">
                <span className="division-number" style={{ color: div.color }}>{div.number}</span>
                <h3 className="division-name">{div.name}</h3>
                <h4 className="division-subtitle">{div.subtitle}</h4>
                <p className="division-desc">{div.description}</p>
                <div className="division-ctas">
                  <Link href={div.link} className="hero-btn-primary" style={{ borderColor: div.color, color: div.color }}>Explore Division</Link>
                  <DynamicBriefButton divisionKey={div.briefKey} label="View Division Brief" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 04: How the Divisions Work Together */}
      <section className="divisions-sequence">
        <div className="divisions-sequence-inner">
          <h2 className="section-heading text-center">How the Divisions Work Together</h2>
          <div className="sequence-flow">
            <div className="sequence-step">Operations defines direction</div>
            <div className="sequence-arrow">↓</div>
            <div className="sequence-step">Studio builds infrastructure</div>
            <div className="sequence-arrow">↓</div>
            <div className="sequence-step">Intelligence governs performance</div>
            <div className="sequence-arrow">↓</div>
            <div className="sequence-step">Media controls distribution</div>
            <div className="sequence-arrow">↓</div>
            <div className="sequence-step">Ventures activates expansion</div>
          </div>
          <p className="sequence-text">Each division performs a distinct function, but the value comes from how they operate together.</p>
        </div>
      </section>

      {/* SECTION 05: Final CTA */}
      <section className="divisions-final-cta">
        <div className="final-cta-content">
          <h2 className="final-cta-heading">Structure Determines Scale.</h2>
          <p className="final-cta-text">Explore how each Axis division applies within the full operating system.</p>
          <div className="divisions-hero-ctas justify-center">
            <Link href="/diagnostic" className="hero-btn-primary">Start Strategic Diagnostic</Link>
            <Link href="/divisions/operations" className="hero-btn-secondary">Explore Axis Operations</Link>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}
