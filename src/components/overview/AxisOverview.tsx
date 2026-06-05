"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import EcosystemGraph from "./EcosystemGraph";
import Link from "next/link";

export default function AxisOverview() {
  const [activeSection, setActiveSection] = useState(0);

  const getDvh = () => {
    let el = document.getElementById('axis-dvh-ref');
    if (!el) {
      el = document.createElement('div');
      el.id = 'axis-dvh-ref';
      el.style.height = '100dvh';
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.visibility = 'hidden';
      el.style.pointerEvents = 'none';
      document.body.appendChild(el);
    }
    return el.clientHeight || window.innerHeight;
  };

  // Update activeSection based on scroll position to keep navigation dots in sync
  useEffect(() => {
    const handleScroll = () => {
      const vh = getDvh();
      const scrollVh = window.scrollY / vh;
      const index = Math.round(scrollVh);
      setActiveSection(Math.min(6, Math.max(0, index)));
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      (window as any).__axisDotClick = true;
      window.scrollBy({ top: getDvh(), behavior: 'smooth' });
      setTimeout(() => {
        (window as any).__axisDotClick = false;
      }, 1200);
    }
  };

  const scrollToSection = (idx: number) => {
    if (typeof window !== "undefined") {
      (window as any).__axisDotClick = true;
      window.scrollTo({ top: idx * getDvh(), behavior: 'smooth' });
      setTimeout(() => {
        (window as any).__axisDotClick = false;
      }, 1200);
    }
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      }
    }
  };

  const childFadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const lineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const artisticCard = {
    hidden: { opacity: 0, scale: 0.9, rotateX: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, type: "spring" as const, bounce: 0.3 } 
    }
  };

  return (
    <div className="w-full">
      {/* SECTION 01 Hero Opening */}
      <motion.section 
        className={`overview-section section-hero ${activeSection === 0 ? "active" : ""}`}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.2 }}
        variants={containerStagger}
      >
        <div className="cinematic-backdrop-glow" />
        <motion.h1 variants={childFadeUp} className="text-luxury-heading text-shimmer">AXIS</motion.h1>
        <motion.div variants={childFadeUp} className="eyebrow">Operating System for Scalable Organizations</motion.div>
        <motion.p variants={childFadeUp} className="text-body-large mt-8">
          Axis aligns infrastructure, intelligence, distribution, and monetization into a coordinated operating environment designed for scalable growth.
        </motion.p>
        <motion.div variants={childFadeUp} className="hero-ctas mt-8">
          <button className="btn-gold" onClick={() => scrollToSection(4)}>Explore the Ecosystem</button>
          <button className="btn-white" onClick={() => scrollToSection(1)}>Begin Alignment</button>
        </motion.div>
      </motion.section>

      {/* SECTION 02 What Axis Is */}
      <motion.section 
        className={`overview-section ${activeSection === 1 ? "active" : ""}`}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.2 }}
        variants={containerStagger}
      >
        <div className="section-split relative w-full">
          {/* Vertical architectural line separating 3D Core and Text on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent opacity-80" style={{ boxShadow: '0 0 20px 2px rgba(205,164,100,0.5)' }} />
          
          {/* Empty left column for the 3D Core */}
          <div className="split-col is-left lg:border-none"></div>
          
          <motion.div variants={childFadeUp} className="split-col is-right pl-8 lg:pl-16">
            <h2 className="text-luxury-subheading">What Axis Is</h2>
            <p className="text-body-large">
              Axis is an operating system designed to identify unrealized revenue, remove structural friction, and install scalable systems.
            </p>
            <p className="text-body-regular mt-4">
              Axis does not add complexity.<br/>
              Axis removes friction.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 03 What Axis Is Not */}
      <motion.section 
        className={`overview-section ${activeSection === 2 ? "active" : ""}`}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.2 }}
        variants={containerStagger}
      >
        <div className="section-split relative w-full">
          {/* Vertical architectural line separating Text and 3D Core on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent opacity-80" style={{ boxShadow: '0 0 20px 2px rgba(205,164,100,0.5)' }} />

          <motion.div variants={childFadeUp} className="split-col is-left pr-8 lg:pr-16">
            <h2 className="text-luxury-subheading">What Axis Is Not</h2>
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

      {/* SECTION 04 Clarity → Structure → Monetization */}
      <motion.section 
        className={`overview-section section-hero ${activeSection === 3 ? "active" : ""}`}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.8, delayChildren: 0.1 } }
        }}
      >
        <div className="cinematic-backdrop-glow" />
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="flex flex-wrap items-center justify-center gap-4 mb-12 text-luxury-subheading">
          <motion.span variants={childFadeUp} className="text-shimmer">Clarity</motion.span>
          <motion.span variants={childFadeUp} className="text-[var(--gold)] opacity-50">→</motion.span>
          <motion.span variants={childFadeUp} className="text-shimmer">Structure</motion.span>
          <motion.span variants={childFadeUp} className="text-[var(--gold)] opacity-50">→</motion.span>
          <motion.span variants={childFadeUp} className="text-shimmer">Monetization</motion.span>
        </motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="section-panels w-full" style={{ perspective: "1200px" }}>
          {[
            { num: "01.", title: "Clarity", desc: "Understanding what is actually happening versus what is assumed." },
            { num: "02.", title: "Structure", desc: "Designing systems where execution becomes predictable and scalable." },
            { num: "03.", title: "Monetization", desc: "Capturing and compounding value once structure is aligned." }
          ].map((panel, idx) => (
            <motion.div key={idx} variants={artisticCard} className="cinematic-panel group">
              <div className="panel-number transition-colors duration-500 group-hover:text-[var(--ivory)]">{panel.num}</div>
              <h3 className="panel-title">{panel.title}</h3>
              <p className="text-body-regular">{panel.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* SECTION 05 The Axis Ecosystem */}
      <motion.section 
        className={`overview-section section-hero relative overflow-visible ${activeSection === 4 || activeSection === 5 ? "active" : ""}`}
        style={{ minHeight: '200dvh', display: 'block', paddingTop: '0' }}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.1 }}
        variants={containerStagger}
      >
        <div className="cinematic-backdrop-glow" />
        <div className="sticky top-12 left-0 right-0 z-10 pointer-events-none px-4 flex flex-col items-center justify-center text-center">
          <motion.h2 variants={childFadeUp} className="text-luxury-subheading text-shimmer">The Axis Ecosystem</motion.h2>
          <motion.p variants={childFadeUp} className="text-body-large">Five interconnected layers. One system.</motion.p>
          <motion.p variants={childFadeUp} className="text-body-regular max-w-2xl mx-auto">
            Each layer performs a distinct function. Together, they form a complete system built for scalable growth.
          </motion.p>
        </div>
      </motion.section>

      {/* SECTION 06 Final Statement + CTA */}
      <motion.section 
        className={`overview-section section-final ${activeSection === 6 ? "active" : ""}`}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.2 }}
        variants={containerStagger}
      >
        <div className="cinematic-backdrop-glow" />
        <motion.h2 variants={childFadeUp} className="text-luxury-subheading mb-4">
          AXIS does not create demand.<br/>
          AXIS makes existing value unavoidable.
        </motion.h2>
        <motion.p variants={childFadeUp} className="text-body-large mt-6 mb-12 mx-auto" style={{ maxWidth: '800px' }}>
          Axis is applied inside organizations where revenue already exists, growth is constrained, and structure is required.
        </motion.p>
        <motion.div variants={childFadeUp} className="hero-ctas">
          <Link href="/diagnostic" className="btn-gold">Start Strategic Diagnostic</Link>
          <Link href="/divisions" className="btn-white">Explore Divisions</Link>
        </motion.div>
      </motion.section>

      {/* Scroll Helper Navigation */}
      <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-center gap-6 hidden md:flex">
        {/* Navigation Dots */}
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3, 4, 5, 6].map(idx => (
            <button 
              key={idx} 
              onClick={() => scrollToSection(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-[var(--gold)] scale-[1.5] shadow-[0_0_10px_rgba(205,164,100,0.8)]' : 'bg-white/20 hover:bg-white/50'}`}
              aria-label={`Scroll to section ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Next Section Arrow */}
        {activeSection < 6 && (
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




