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
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll('.overview-section');
      let currentIdx = 0;
      
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i] as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        
        if (scrollY >= top - window.innerHeight / 2) {
          currentIdx = i;
        }
      }
      setActiveSection(currentIdx);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      (window as any).__axisDotClick = true;
      const sections = document.querySelectorAll('.overview-section');
      const nextIdx = Math.min(sections.length - 1, activeSection + 1);
      const targetEl = sections[nextIdx] as HTMLElement;
      let targetTop = targetEl ? targetEl.offsetTop : window.scrollY + window.innerHeight;
      
      if (nextIdx === 4 && targetEl) targetTop += targetEl.offsetHeight / 2;
      
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      setTimeout(() => {
        (window as any).__axisDotClick = false;
      }, 1200);
    }
  };

  const scrollToSection = (idx: number) => {
    if (typeof window !== "undefined") {
      (window as any).__axisDotClick = true;
      const sections = document.querySelectorAll('.overview-section');
      const targetEl = sections[idx] as HTMLElement;
      let targetTop = targetEl ? targetEl.offsetTop : idx * window.innerHeight;
      
      if (idx === 4 && targetEl) targetTop += targetEl.offsetHeight / 2;
      
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
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
        <motion.img 
          src="/images/AXIS%20Gold%20Logo-01.png" 
          alt="AXIS" 
          variants={childFadeUp} 
          className="mb-6"
          style={{ height: "160px", width: "auto", objectFit: "contain" }} 
        />
        <motion.div variants={childFadeUp} className="eyebrow">ALIGN. OPERATE. COMPOUND.</motion.div>
        <motion.div variants={childFadeUp} className="eyebrow">The operating system for scalable organizations.</motion.div>
        <motion.p variants={childFadeUp} className="text-body-large mt-8">
          Axis aligns infrastructure, intelligence, distribution, and monetization into a coordinated system that removes friction and unlocks unrealized value.
        </motion.p>
        <motion.div variants={childFadeUp} className="hero-ctas mt-8">
          <Link href="/divisions" className="btn-gold">Explore The Ecosystem</Link>
          <Link href="/apply" className="btn-white">Start Strategic Diagnostic</Link>
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
          {/* Empty left column for the 3D Core */}
          <div className="split-col is-left hidden lg:block"></div>
          
          <motion.div variants={childFadeUp} className="split-col is-right pl-8 lg:pl-16 pt-8 lg:pt-0 relative architectural-line-left">
            
            <h2 className="text-luxury-subheading">What Axis Is</h2>
            <p className="text-body-large">
              Axis is an operating system that identifies unrealized revenue, removes structural friction, and installs scalable systems that make growth easier to execute.
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
          <motion.div variants={childFadeUp} className="split-col is-left pr-8 lg:pr-16 pt-8 lg:pt-0 relative architectural-line-right">
            
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
          <div className="split-col is-right hidden lg:block"></div>
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
        className={`overview-section section-hero section-ecosystem relative overflow-visible ${activeSection === 4 || activeSection === 5 ? "active" : ""}`}
        initial="hidden"
        whileInView="visible" viewport={{ once: false, amount: 0.1 }}
        variants={containerStagger}
      >
        <div className="cinematic-backdrop-glow" />
        <div className="sticky top-12 left-0 right-0 z-10 pointer-events-none px-4 flex flex-col items-center justify-center text-center">
          <motion.h2 variants={childFadeUp} className="text-luxury-subheading text-shimmer">The Axis Ecosystem</motion.h2>
          <motion.p variants={childFadeUp} className="text-body-large">Five interconnected layers. One system.</motion.p>
          <motion.p variants={childFadeUp} className="text-body-regular max-w-2xl mx-auto">
            Each division performs a distinct function. Together, they create one coordinated system for infrastructure, intelligence, distribution, monetization, and strategic growth.
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
          Axis is built for organizations where demand, revenue, or influence already exists, but growth is being limited by weak structure, disconnected systems, or uncaptured value.
        </motion.p>
        <motion.div variants={childFadeUp} className="hero-ctas">
          <Link href="/apply" className="btn-gold">Start Strategic Diagnostic</Link>
          <Link href="/divisions" className="btn-white">Explore Divisions</Link>
        </motion.div>
      </motion.section>

    </div>
  );
}








