"use client";

import { motion } from "framer-motion";
import { Brain, Play, DollarSign, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function EcosystemGraph() {
  const containerFade = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 1.2, staggerChildren: 0.4 } 
    }
  };

  const floatAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 50, damping: 10, delay: 2.0 } 
    },
    float: {
      y: ["-12px", "12px"],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    }
  };

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { pathLength: { duration: 1.5, ease: "easeInOut", delay: 1.0 }, opacity: { duration: 0.5, delay: 1.0 } } 
    }
  };

  const drawCircle = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.5 } } 
    }
  };

  const drawAndSpinInner = {
    hidden: { pathLength: 0, opacity: 0, rotate: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      rotate: 360,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" }, 
        opacity: { duration: 0.5 },
        rotate: { repeat: Infinity, duration: 40, ease: "linear" }
      } 
    }
  };

  const drawAndSpinOuter = {
    hidden: { pathLength: 0, opacity: 0, rotate: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      rotate: -360,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" }, 
        opacity: { duration: 0.5 },
        rotate: { repeat: Infinity, duration: 60, ease: "linear" }
      } 
    }
  };

  const fadeInDelay = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.0, delay: 2.5 } }
  };

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Prioritize making the graph large and prominent
      const availableWidth = Math.min(window.innerWidth - 32, 800);
      // Only subtract a minimal 100px for breathing room, instead of 300px
      const availableHeight = Math.min(window.innerHeight - 100, 800);
      const calculatedScale = Math.min(availableWidth, availableHeight) / 800;
      
      // Force the graph to be large: at least 80% on desktop, 55% on mobile
      const minAllowedScale = window.innerWidth > 768 ? 0.8 : 0.55;
      setScale(Math.max(minAllowedScale, calculatedScale));
    };
    
    // Initial calculation
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // The outer wrapper reserves the EXACT scaled height so the page doesn't jump
    <div style={{ width: '100%', height: `${800 * scale}px`, display: 'flex', justifyContent: 'center' }}>
      
      {/* The 800x800 perfect square that scales up and down like an image */}
      <motion.div 
        className="ecosystem-graph"
        style={{ 
          position: 'relative', 
          width: '800px', 
          height: '800px', 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center' 
        }}
        variants={containerFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '800px', height: '800px', pointerEvents: 'none' }} viewBox="0 0 1000 1000">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Arrows for lines */}
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker id="arrow-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gold)" />
            </marker>
          </defs>

          {/* ─── BASE SKELETON (Draws on entrance) ─── */}
          {/* Inner concentric dashed rings */}
          <motion.circle variants={drawAndSpinInner} style={{ transformOrigin: "500px 500px" }} cx="500" cy="500" r="160" fill="none" stroke="rgba(205, 164, 100, 0.15)" strokeWidth="1" strokeDasharray="4 8" />
          <motion.circle variants={drawCircle} cx="500" cy="500" r="280" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* Main outer orbit ring */}
          <motion.circle variants={drawCircle} cx="500" cy="500" r="380" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <motion.circle variants={drawAndSpinOuter} style={{ transformOrigin: "500px 500px" }} cx="500" cy="500" r="380" fill="none" stroke="rgba(205, 164, 100, 0.3)" strokeWidth="1" strokeDasharray="8 16" />

          {/* Diagonal Intersecting Lines */}
          <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1">
            <motion.line variants={drawLine} x1="230" y1="230" x2="770" y2="770" />
            <motion.line variants={drawLine} x1="230" y1="770" x2="770" y2="230" />
          </g>

          {/* Straight Connection Lines to Satellites */}
          <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)">
            <motion.line variants={drawLine} x1="500" y1="280" x2="500" y2="380" />
            <motion.line variants={drawLine} x1="500" y1="620" x2="500" y2="720" />
            <motion.line variants={drawLine} x1="280" y1="500" x2="380" y2="500" />
            <motion.line variants={drawLine} x1="620" y1="500" x2="720" y2="500" />
          </g>

          {/* ─── ACTIVE DATA FLOWS (Fades in after build, then runs infinitely) ─── */}
          <motion.g variants={fadeInDelay}>
            {/* Bi-Directional Pulsing Lines to Satellites */}
            <g strokeWidth="2" fill="none" filter="url(#glow)">
              {/* Data flowing OUT from Axis Operations */}
              <g className="flow-line-out" stroke="var(--gold)">
                <path d="M 504 380 L 504 280" strokeDasharray="6 24" />
                <path d="M 496 620 L 496 720" strokeDasharray="6 24" />
                <path d="M 380 496 L 280 496" strokeDasharray="6 24" />
                <path d="M 620 504 L 720 504" strokeDasharray="6 24" />
              </g>

              {/* Data flowing IN to Axis Operations */}
              <g className="flow-line-in" stroke="rgba(255,255,255,0.7)">
                <path d="M 496 380 L 496 280" strokeDasharray="6 24" />
                <path d="M 504 620 L 504 720" strokeDasharray="6 24" />
                <path d="M 380 504 L 280 504" strokeDasharray="6 24" />
                <path d="M 620 496 L 720 496" strokeDasharray="6 24" />
              </g>
            </g>

            {/* Curved Outer Arrows between Satellites (Clockwise) */}
            <g stroke="rgba(205, 164, 100, 0.4)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-gold)">
              {/* Top to Right */}
              <path d="M 580 128 A 380 380 0 0 1 872 420" strokeDasharray="5 25" className="flow-line-out" />
              {/* Right to Bottom */}
              <path d="M 872 580 A 380 380 0 0 1 580 872" strokeDasharray="5 25" className="flow-line-out" />
              {/* Bottom to Left */}
              <path d="M 420 872 A 380 380 0 0 1 128 580" strokeDasharray="5 25" className="flow-line-out" />
              {/* Left to Top */}
              <path d="M 128 420 A 380 380 0 0 1 420 128" strokeDasharray="5 25" className="flow-line-out" />
            </g>

            {/* Intersection Dots */}
            <motion.g fill="var(--gold)" filter="url(#glow)"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="230" cy="230" r="4" />
              <circle cx="770" cy="770" r="4" />
              <circle cx="230" cy="770" r="4" />
              <circle cx="770" cy="230" r="4" />
              
              <circle cx="500" cy="280" r="4" />
              <circle cx="500" cy="380" r="4" />
              <circle cx="500" cy="620" r="4" />
              <circle cx="500" cy="720" r="4" />
              <circle cx="280" cy="500" r="4" />
              <circle cx="380" cy="500" r="4" />
              <circle cx="620" cy="500" r="4" />
              <circle cx="720" cy="500" r="4" />
            </motion.g>
          </motion.g>
        </svg>

        {/* Structural Node Containers (Using HARD PIXEL positions on an 800x800 grid) */}
        
        {/* Center Node */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={floatAnimation} animate="float">
            <div className="ecosystem-graph-node center-node group">
              <div className="absolute inset-0 bg-[var(--gold)] opacity-5 blur-2xl group-hover:opacity-15 transition-opacity duration-700 rounded-full" />
              <h3 className="text-2xl font-serif text-[var(--gold)] mb-1 font-medium text-shimmer">Axis<br/>Operations</h3>
            </div>
          </motion.div>
        </div>

        {/* Top Node: Intelligence */}
        <div style={{ position: 'absolute', zIndex: 10, top: '96px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={floatAnimation} animate="float">
            <div className="ecosystem-graph-node satellite-node node-purple group">
              <Brain className="w-8 h-8 mb-2 opacity-80 text-[#B89CF2] group-hover:text-white transition-colors" />
              <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Intelligence</h4>
            </div>
          </motion.div>
        </div>

        {/* Right Node: Media */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '704px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={floatAnimation} animate="float">
            <div className="ecosystem-graph-node satellite-node node-blue group">
              <Play className="w-8 h-8 mb-2 opacity-80 text-[#85C1EB] group-hover:text-white transition-colors" />
              <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Media</h4>
            </div>
          </motion.div>
        </div>

        {/* Bottom Node: Ventures */}
        <div style={{ position: 'absolute', zIndex: 10, top: '704px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={floatAnimation} animate="float">
            <div className="ecosystem-graph-node satellite-node node-green group">
              <DollarSign className="w-8 h-8 mb-2 opacity-80 text-[#9ED8A6] group-hover:text-white transition-colors" />
              <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Ventures</h4>
            </div>
          </motion.div>
        </div>

        {/* Left Node: Studio */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '96px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={floatAnimation} animate="float">
            <div className="ecosystem-graph-node satellite-node node-orange group">
              <Building2 className="w-8 h-8 mb-2 opacity-80 text-[#E2A687] group-hover:text-white transition-colors" />
              <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Studio</h4>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
