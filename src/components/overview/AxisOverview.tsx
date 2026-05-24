"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";
import EcosystemGraph from "./EcosystemGraph";

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: "easeOut" as const } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

export default function AxisOverview() {
  return (
    <div className="w-full bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <HeroSection />

      {/* SECTION 2: WHAT AXIS IS / IS NOT */}
      <DefinitionSection />

      {/* SECTION 3: CLARITY -> STRUCTURE -> MONETIZATION */}
      <PillarsSection />

      {/* SECTION 4: THE AXIS ECOSYSTEM */}
      <EcosystemSection />

      {/* SECTION 5: FINAL CTA */}
      <FinalCTASection />

    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Removed conflicting scroll scale in favor of infinite breathing
  // Fade out text on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section 
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-start px-8 md:px-24 pt-20 overflow-hidden"
    >
      {/* Parallax Background with slow breathing effect */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{
          backgroundImage: "url('/images/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        animate={{
          scale: [1.05, 1.1, 1.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      <motion.div 
        className="relative z-10 max-w-2xl"
        style={{ opacity, y }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-widest flex gap-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
        >
          {["A", "X", "I", "S"].map((letter, i) => (
            <motion.span 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light text-[var(--ivory)] mb-8 leading-snug">
          Operating System for<br />Scalable Organizations
        </motion.h2>
        
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 0.8, transition: { duration: 1.2, delay: 0.6, ease: "easeInOut" } }
          }} 
          style={{ originX: 0 }}
          className="w-16 h-[2px] bg-[var(--gold)] mb-8" 
        />
        
        <motion.p variants={fadeUp} className="text-body-large text-gray-300 mb-12 max-w-xl text-lg">
          Axis aligns infrastructure, intelligence, distribution, and monetization into a coordinated operating environment designed for scalable growth.
        </motion.p>
        
        <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
          <button className="btn-gold bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 transition-all">Explore the Ecosystem</button>
          <button className="btn-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all">Begin Alignment</button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function DefinitionSection() {
  return (
    <section className="w-full py-32 px-8 md:px-24 bg-[#0a0a0a] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left Column: What Axis Is */}
        <div className="pr-0 md:pr-16">
          <motion.h4 variants={fadeUp} className="text-[var(--gold)] text-xs tracking-[0.2em] font-mono uppercase mb-10 opacity-90">
            What Axis Is
          </motion.h4>
          <motion.h3 variants={fadeUp} className="text-3xl md:text-[2.75rem] font-serif leading-snug text-white opacity-90">
            Axis is an operating system designed to identify unrealized revenue, remove structural friction, and install scalable systems.
          </motion.h3>
        </div>

        {/* Vertical Divider (Desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-32 bottom-32 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Right Column: What Axis Is Not */}
        <div className="md:pl-16 pt-8 md:pt-0">
          <motion.h4 variants={fadeUp} className="text-[var(--gold)] text-xs tracking-[0.2em] font-mono uppercase mb-10 opacity-90">
            What Axis Is Not
          </motion.h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 mb-12 border-y border-white/10 py-8">
            {[
              "Not an agency.",
              "Not advisory theater.",
              "Not growth tactics.",
              "Not static strategy."
            ].map((text, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center px-4 group">
                <motion.div 
                  className="w-16 h-16 rounded-full border border-[var(--gold)]/30 flex items-center justify-center mb-6 text-[var(--gold)] bg-[var(--gold)]/5 group-hover:bg-[var(--gold)]/20 transition-colors shadow-[0_0_15px_rgba(205,164,100,0.1)] group-hover:shadow-[0_0_30px_rgba(205,164,100,0.4)]"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <X size={24} strokeWidth={1} />
                </motion.div>
                <p className="text-xs text-gray-400 leading-relaxed font-mono tracking-wide">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
            Axis identifies where revenue is being created but not captured, and what structural constraints are preventing it.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

function PillarsSection() {
  const pillars = [
    {
      num: "01",
      title: "CLARITY",
      desc: "Understanding what is actually happening versus what is assumed.",
      bg: "url('/images/clarity_bg.png')"
    },
    {
      num: "02",
      title: "STRUCTURE",
      desc: "Designing systems where execution becomes predictable and scalable.",
      bg: "url('/images/structure_bg.png')"
    },
    {
      num: "03",
      title: "MONETIZATION",
      desc: "Capturing and compounding value once structure is aligned.",
      bg: "url('/images/monetization_bg.png')"
    }
  ];

  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-auto min-h-[500px]">
        {pillars.map((pillar, i) => (
          <motion.div 
            key={pillar.title}
            variants={fadeUp}
            className="group relative h-[500px] md:h-[600px] overflow-hidden rounded-sm flex flex-col justify-end p-8 border border-white/5 cursor-pointer"
          >
            <motion.div 
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: pillar.bg }}
              animate={{
                scale: [1.05, 1.15, 1.05],
              }}
              transition={{
                duration: 25 + i * 5, // Staggered durations so they don't sync up perfectly
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Dynamic glowing border on hover */}
            <div className="absolute inset-0 z-0 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/30 transition-colors duration-700" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <motion.div 
              className="relative z-10"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="text-[var(--gold)] font-mono text-xs tracking-[0.2em] mb-2"
              >
                {pillar.num}
              </motion.div>
              <motion.h3 
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="text-2xl md:text-3xl font-serif text-white mb-4"
              >
                {pillar.title}
              </motion.h3>
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="text-gray-400 text-sm md:text-base leading-relaxed"
              >
                {pillar.desc}
              </motion.p>
            </motion.div>
            
            {/* Arrow connecting next pillar (except last one) */}
            {i < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-20 text-[var(--gold)]/30 text-2xl">
                →
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section className="w-full py-32 px-8 md:px-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <motion.div 
          className="relative z-20 pt-10 md:pt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h4 variants={fadeUp} className="text-[var(--gold)] text-xs tracking-[0.2em] font-mono uppercase mb-6 opacity-90">
            The Axis Ecosystem
          </motion.h4>
          <motion.h3 variants={fadeUp} className="text-3xl md:text-[2.75rem] font-serif text-white leading-snug mb-8 opacity-90">
            Five interconnected<br />layers. One system.
          </motion.h3>

          <motion.div variants={fadeUp} className="w-12 h-[1px] bg-[var(--gold)] mb-8 opacity-60" />

          <motion.p variants={fadeUp} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mb-8 font-light">
            Each layer performs a distinct function. Together, they form a complete system built for scalable growth.
          </motion.p>
        </motion.div>

        {/* Right: Graph */}
        <motion.div 
          className="relative z-10 flex justify-center items-center h-[500px] md:h-[700px] lg:h-[800px] w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
        >
          {/* We use absolute positioning to prevent the 800px graph from breaking the CSS grid layout width */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.85] xl:scale-100">
            <EcosystemGraph isActive={true} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FinalCTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax the background image slightly
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={ref}
      className="relative w-full py-40 px-8 md:px-24 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{
          backgroundImage: "url('/images/footer_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-black/60 to-[#0a0a0a]" />

        <motion.div 
          className="relative z-10 max-w-4xl"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-12 leading-tight"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {["AXIS", "does", "not", "create", "demand.", "AXIS", "makes", "existing", "value", "unavoidable."].map((word, i) => (
              <motion.span 
                key={i} 
                className={word === "AXIS" || word === "unavoidable." ? "text-[var(--gold)] inline-block mr-3" : "inline-block mr-3"}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        
        <motion.div variants={fadeUp} className="w-12 h-[1px] bg-white/20 mb-8 mx-auto" />

        <motion.h3 variants={fadeUp} className="text-xl md:text-2xl text-gray-300 font-light mb-4 tracking-wide">
          Begin Alignment
        </motion.h3>
        
        <motion.p variants={fadeUp} className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-xl mx-auto">
          Axis is applied inside organizations where revenue already exists, growth is constrained, and structure is required.
        </motion.p>
        
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6">
          <button className="btn-gold bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 transition-all">Start Strategic Diagnostic</button>
          <button className="btn-white border border-white/20 bg-transparent hover:bg-white/5 transition-colors">Explore Divisions</button>
        </motion.div>
      </motion.div>
    </section>
  );
}
