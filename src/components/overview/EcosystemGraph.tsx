"use client";

import { motion } from "framer-motion";
import { Brain, Play, DollarSign, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function EcosystemGraph({ isActive }: { isActive?: boolean }) {
  const containerFade = {
    hidden: { 
      opacity: 0, 
      filter: "drop-shadow(0px 0px 0px rgba(205,164,100,0))",
      transition: { duration: 0.2, ease: "easeOut" as const }
    },
    visible: { 
      opacity: 1, 
      filter: "drop-shadow(0px 0px 40px rgba(205,164,100,0.6))",
      transition: { duration: 0.8, delay: 0.4, staggerChildren: 0.15 } 
    }
  };

  const nodeEntrance = {
    hidden: { 
      scale: 0, 
      opacity: 0, 
      filter: "blur(10px)",
      transition: { duration: 0.2 }
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 70, damping: 14 } 
    }
  };

  const nodeFloat = {
    float: {
      y: ["-12px", "12px"],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut" as const
        }
      }
    }
  };

  const drawLine = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { pathLength: { duration: 0.8, ease: "easeInOut" as const }, opacity: { duration: 0.3 } } 
    }
  };

  const drawCircle = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { pathLength: { duration: 0.8, ease: "easeInOut" as const }, opacity: { duration: 0.3 } } 
    }
  };

  const drawAndSpinInner = {
    hidden: { 
      pathLength: 0, 
      opacity: 0, 
      rotate: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      rotate: 360,
      transition: { 
        pathLength: { duration: 0.8, ease: "easeInOut" as const }, 
        opacity: { duration: 0.3 },
        rotate: { repeat: Infinity, duration: 40, ease: "linear" as const }
      } 
    }
  };

  const drawAndSpinOuter = {
    hidden: { 
      pathLength: 0, 
      opacity: 0, 
      rotate: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      rotate: -360,
      transition: { 
        pathLength: { duration: 0.8, ease: "easeInOut" as const }, 
        opacity: { duration: 0.3 },
        rotate: { repeat: Infinity, duration: 60, ease: "linear" as const }
      } 
    }
  };

  const fadeInDelay = {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, delay: 0.6 } 
    }
  };

  return (
    // The outer wrapper reserves the EXACT scaled height so the page doesn't jump
    <div style={{ width: `800px`, height: `800px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* The 800x800 perfect square that scales up and down like an image, responding to SCROLL position! */}
      <motion.div 
        className="ecosystem-graph"
        style={{ 
          position: 'relative', 
          width: '800px', 
          height: '800px',
          transformOrigin: 'center center'
        }}
        variants={containerFade}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
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

          {/* Straight Connection Lines to Satellites (Diagonal) */}
          <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)">
            <motion.line variants={drawLine} x1="400" y1="400" x2="280" y2="280" />
            <motion.line variants={drawLine} x1="600" y1="400" x2="720" y2="280" />
            <motion.line variants={drawLine} x1="400" y1="600" x2="280" y2="720" />
            <motion.line variants={drawLine} x1="600" y1="600" x2="720" y2="720" />
          </g>

          {/* ─── ACTIVE DATA FLOWS (Fades in after build, then runs infinitely) ─── */}
          <motion.g variants={fadeInDelay}>
            {/* Bi-Directional Pulsing Lines to Satellites */}
            <g strokeWidth="2" fill="none" filter="url(#glow)">
              {/* Data flowing OUT from Axis Operations */}
              <g className="flow-line-out" stroke="var(--gold)">
                <path d="M 400 400 L 280 280" strokeDasharray="6 24" />
                <path d="M 600 400 L 720 280" strokeDasharray="6 24" />
                <path d="M 400 600 L 280 720" strokeDasharray="6 24" />
                <path d="M 600 600 L 720 720" strokeDasharray="6 24" />
              </g>

              {/* Data flowing IN to Axis Operations */}
              <g className="flow-line-in" stroke="rgba(255,255,255,0.7)">
                <path d="M 280 280 L 400 400" strokeDasharray="6 24" />
                <path d="M 720 280 L 600 400" strokeDasharray="6 24" />
                <path d="M 280 720 L 400 600" strokeDasharray="6 24" />
                <path d="M 720 720 L 600 600" strokeDasharray="6 24" />
              </g>
            </g>

            {/* Curved Outer Arrows between Satellites (Clockwise) */}
            <g stroke="rgba(205, 164, 100, 0.4)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-gold)">
              {/* Top-Left to Top-Right */}
              <path d="M 230 180 A 450 450 0 0 1 770 180" strokeDasharray="5 25" className="flow-line-out" />
              {/* Top-Right to Bottom-Right */}
              <path d="M 820 230 A 450 450 0 0 1 820 770" strokeDasharray="5 25" className="flow-line-out" />
              {/* Bottom-Right to Bottom-Left */}
              <path d="M 770 820 A 450 450 0 0 1 230 820" strokeDasharray="5 25" className="flow-line-out" />
              {/* Bottom-Left to Top-Left */}
              <path d="M 180 770 A 450 450 0 0 1 180 230" strokeDasharray="5 25" className="flow-line-out" />
            </g>

            {/* Intersection Dots */}
            <motion.g fill="var(--gold)" filter="url(#glow)"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
            >
              <circle cx="230" cy="230" r="4" />
              <circle cx="770" cy="770" r="4" />
              <circle cx="230" cy="770" r="4" />
              <circle cx="770" cy="230" r="4" />
              
              <circle cx="400" cy="400" r="4" />
              <circle cx="600" cy="400" r="4" />
              <circle cx="400" cy="600" r="4" />
              <circle cx="600" cy="600" r="4" />
              <circle cx="280" cy="280" r="4" />
              <circle cx="720" cy="280" r="4" />
              <circle cx="280" cy="720" r="4" />
              <circle cx="720" cy="720" r="4" />
            </motion.g>
          </motion.g>
        </svg>

        {/* Structural Node Containers (Using HARD PIXEL positions on an 800x800 grid) */}
        
        {/* Center Node */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={nodeEntrance}>
            <motion.div variants={nodeFloat} animate="float">
              <div className="ecosystem-graph-node center-node group bg-black/60 backdrop-blur-md w-40 h-40 rounded-full border border-[var(--gold)]/30 shadow-[0_0_30px_rgba(205,164,100,0.15)] flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[var(--gold)] opacity-5 blur-2xl group-hover:opacity-15 transition-opacity duration-700 rounded-full" />
                <h3 className="text-2xl font-serif text-white mb-1 font-semibold text-center leading-tight">Axis<br/>Operations</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Top-Left Node: Studio */}
        <div style={{ position: 'absolute', zIndex: 10, top: '184px', left: '184px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={nodeEntrance}>
            <motion.div variants={nodeFloat} animate="float" className="flex flex-col items-center">
              <div className="ecosystem-graph-node satellite-node node-blue group mb-4">
                <Building2 className="w-8 h-8 opacity-80 text-[#85C1EB] group-hover:text-white transition-colors" />
              </div>
              <div className="text-center absolute top-full mt-2 w-32">
                <h4 className="text-[0.65rem] font-bold tracking-widest text-[#85C1EB] uppercase mb-1">Axis Studio</h4>
                <p className="text-[0.6rem] text-gray-400 leading-tight">Infrastructure<br/>Systems<br/>Automation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Top-Right Node: Intelligence */}
        <div style={{ position: 'absolute', zIndex: 10, top: '184px', left: '616px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={nodeEntrance}>
            <motion.div variants={nodeFloat} animate="float" className="flex items-center">
              <div className="ecosystem-graph-node satellite-node node-purple group">
                <Brain className="w-8 h-8 opacity-80 text-[#B89CF2] group-hover:text-white transition-colors" />
              </div>
              <div className="text-left ml-4 absolute left-full w-40">
                <h4 className="text-[0.65rem] font-bold tracking-widest text-[#B89CF2] uppercase mb-1">Axis Intelligence</h4>
                <p className="text-[0.6rem] text-gray-400 leading-tight">Optimization<br/>Data Systems<br/>Decision Control</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom-Left Node: Ventures */}
        <div style={{ position: 'absolute', zIndex: 10, top: '616px', left: '184px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={nodeEntrance}>
            <motion.div variants={nodeFloat} animate="float" className="flex items-center">
              <div className="ecosystem-graph-node satellite-node node-green group">
                <DollarSign className="w-8 h-8 opacity-80 text-[#9ED8A6] group-hover:text-white transition-colors" />
              </div>
              <div className="text-left ml-4 absolute left-full w-40">
                <h4 className="text-[0.65rem] font-bold tracking-widest text-[#9ED8A6] uppercase mb-1">Axis Ventures</h4>
                <p className="text-[0.6rem] text-gray-400 leading-tight">Partnerships<br/>Expansion<br/>Monetization</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom-Right Node: Media */}
        <div style={{ position: 'absolute', zIndex: 10, top: '616px', left: '616px', transform: 'translate(-50%, -50%)' }}>
          <motion.div variants={nodeEntrance}>
            <motion.div variants={nodeFloat} animate="float" className="flex items-center">
              <div className="ecosystem-graph-node satellite-node node-orange group">
                <Play className="w-8 h-8 opacity-80 text-[#E2A687] group-hover:text-white transition-colors" />
              </div>
              <div className="text-left ml-4 absolute left-full w-40">
                <h4 className="text-[0.65rem] font-bold tracking-widest text-[#E2A687] uppercase mb-1">Axis Media</h4>
                <p className="text-[0.6rem] text-gray-400 leading-tight">Distribution<br/>Audience Systems<br/>Perception Control</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
