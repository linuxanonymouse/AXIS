"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import EcosystemGraph from "./EcosystemGraph";

export default function AxisOverview() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const index = Math.round(scrollY / vh);
      setActiveSection(index);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };
  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const childFadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const lineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <div className="w-full">
      {/* SECTION 01 — Hero Opening */}
      <motion.section 
        className="overview-section section-hero"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <motion.h1 variants={childFadeUp} className="text-luxury-heading text-shimmer">AXIS</motion.h1>
        <motion.div variants={childFadeUp} className="eyebrow">Operating System for Scalable Organizations</motion.div>
        <motion.p variants={childFadeUp} className="text-body-large mt-8">
          Axis aligns infrastructure, intelligence, distribution, and monetization into a coordinated operating environment designed for scalable growth.
        </motion.p>
        <motion.div variants={childFadeUp} className="hero-ctas mt-8">
          <button className="btn-gold">Explore the Ecosystem</button>
          <button className="btn-white">Begin Alignment</button>
        </motion.div>
      </motion.section>

      {/* SECTION 02 — What Axis Is */}
      <motion.section 
        className="overview-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerStagger}
      >
        <div className="section-split relative w-full">
          {/* Empty left column for the 3D Core */}
          <div className="split-col is-left lg:border-none"></div>
          
          <motion.div variants={childFadeUp} className="split-col is-right">
            <h2 className="text-luxury-subheading text-shimmer">What Axis Is</h2>
            <p className="text-body-large" style={{ marginLeft: 0 }}>
              Axis is an operating system designed to identify unrealized revenue, remove structural friction, and install scalable systems.
            </p>
            <p className="text-body-regular mt-4">
              Axis does not add complexity.<br/>
              Axis removes friction.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 03 — What Axis Is Not */}
      <motion.section 
        className="overview-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerStagger}
      >
        <div className="section-split relative w-full">
          <motion.div variants={childFadeUp} className="split-col is-left lg:border-none">
            <h2 className="text-luxury-subheading text-shimmer">What Axis Is Not</h2>
            <ul className="split-list">
              <li>Not an agency.</li>
              <li>Not advisory theater.</li>
              <li>Not growth tactics.</li>
              <li>Not static strategy.</li>
            </ul>
            <p className="text-body-regular mt-8">
              Axis identifies where revenue is being created but not captured, and what structural constraints are preventing it.
            </p>
          </motion.div>

          {/* Empty right column for the 3D Core */}
          <div className="split-col is-right"></div>
        </div>
      </motion.section>

      {/* SECTION 04 — Clarity → Structure → Monetization */}
      <motion.section 
        className="overview-section section-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 2.0, delayChildren: 0.2 } }
        }}
      >
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.4 } } }} className="flex flex-wrap items-center justify-center gap-4 mb-12 text-luxury-subheading">
          <motion.span variants={childFadeUp} className="text-shimmer">Clarity</motion.span>
          <motion.span variants={childFadeUp} className="text-[var(--gold)] opacity-50">→</motion.span>
          <motion.span variants={childFadeUp} className="text-shimmer">Structure</motion.span>
          <motion.span variants={childFadeUp} className="text-[var(--gold)] opacity-50">→</motion.span>
          <motion.span variants={childFadeUp} className="text-shimmer">Monetization</motion.span>
        </motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }} className="section-panels w-full">
          {[
            { num: "01.", title: "Clarity", desc: "Understanding what is actually happening versus what is assumed." },
            { num: "02.", title: "Structure", desc: "Designing systems where execution becomes predictable and scalable." },
            { num: "03.", title: "Monetization", desc: "Capturing and compounding value once structure is aligned." }
          ].map((panel, idx) => (
            <motion.div key={idx} variants={childFadeUp} className="cinematic-panel group">
              <div className="panel-number transition-colors duration-500 group-hover:text-[var(--ivory)]">{panel.num}</div>
              <h3 className="panel-title">{panel.title}</h3>
              <p className="text-body-regular">{panel.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* SECTION 05 — The Axis Ecosystem */}
      <motion.section 
        className="overview-section section-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerStagger}
      >
        <motion.h2 variants={childFadeUp} className="text-luxury-subheading text-shimmer">The Axis Ecosystem</motion.h2>
        <motion.p variants={childFadeUp} className="text-body-large">Five interconnected layers. One system.</motion.p>
        <motion.p variants={childFadeUp} className="text-body-regular max-w-2xl mx-auto">
          Each layer performs a distinct function. Together, they form a complete system built for scalable growth.
        </motion.p>

        <motion.div variants={childFadeUp} className="w-full">
          <EcosystemGraph />
        </motion.div>
      </motion.section>

      {/* SECTION 05 — Final Statement + CTA */}
      <motion.section 
        className="overview-section section-final"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerStagger}
      >
        <motion.h2 variants={childFadeUp} className="text-luxury-subheading mb-4">
          AXIS does not create demand.<br/>
          AXIS makes existing value unavoidable.
        </motion.h2>
        <motion.p variants={childFadeUp} className="text-body-large mt-6 mb-12 mx-auto" style={{ maxWidth: '800px' }}>
          Axis is applied inside organizations where revenue already exists, growth is constrained, and structure is required.
        </motion.p>
        <motion.div variants={childFadeUp} className="hero-ctas">
          <button className="btn-gold">Start Strategic Diagnostic</button>
          <button className="btn-white">Explore Divisions</button>
        </motion.div>
      </motion.section>

      {/* Scroll Helper Navigation */}
      <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-center gap-6 hidden md:flex">
        {/* Navigation Dots */}
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3, 4, 5].map(idx => (
            <button 
              key={idx} 
              onClick={() => window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-[var(--gold)] scale-[1.5] shadow-[0_0_10px_rgba(205,164,100,0.8)]' : 'bg-white/20 hover:bg-white/50'}`}
              aria-label={`Scroll to section ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Next Section Arrow */}
        {activeSection < 5 && (
          <button 
            onClick={scrollToNext}
            className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-[var(--gold)] hover:bg-white/10 hover:border-white/30 transition-all animate-bounce shadow-lg"
            aria-label="Scroll to next section"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}
