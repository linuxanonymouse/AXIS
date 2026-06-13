"use client";

import { motion, useTransform, MotionValue, useMotionValue } from "framer-motion";
import { Brain, Play, DollarSign, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function EcosystemGraph({ 
  isActive, 
  centerLayout = false,
  progress
}: { 
  isActive?: boolean;
  centerLayout?: boolean;
  progress?: MotionValue<number>;
}) {
  const [scale, setScale] = useState(1);

  // Fallback for when no progress motion value is provided
  const fallbackProgress = useMotionValue(isActive ? 1 : 0);
  useEffect(() => {
    // If we only have boolean control, smoothly animate the motion value
    if (!progress) {
      let current = fallbackProgress.get();
      const target = isActive ? 1 : 0;
      if (current !== target) {
        fallbackProgress.set(target);
      }
    }
  }, [isActive, progress, fallbackProgress]);

  const p = progress || fallbackProgress;

  // ─── SCROLL INTERPOLATIONS ─── //
  // Main container (fade in early)
  const containerOpacity = useTransform(p, [0.1, 0.4], [0, 1]);
  const containerFilter = useTransform(p, [0.1, 0.4], [
    "drop-shadow(0px 0px 0px rgba(205,164,100,0))", 
    "drop-shadow(0px 0px 40px rgba(205,164,100,0.6))"
  ]);

  // Rings and lines (draw out as scroll continues)
  const drawOpacity = useTransform(p, [0.2, 0.6], [0, 1]);
  const drawPath = useTransform(p, [0.2, 0.8], [0, 1]);

  // Nodes (pop in towards the end of the scroll)
  const nodeScale = useTransform(p, [0.6, 0.9], [0, 1]);
  const nodeOpacity = useTransform(p, [0.6, 0.9], [0, 1]);
  const nodeFilter = useTransform(p, [0.6, 0.9], ["blur(10px)", "blur(0px)"]);

  // Active data flows (fade in last)
  const flowOpacity = useTransform(p, [0.8, 1.0], [0, 1]);

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = Math.min(window.innerWidth - 16, 800);
      const availableHeight = Math.min(window.innerHeight - 100, 800);
      const minScale = Math.min(availableWidth, availableHeight) / 800;
      setScale(Math.max(0.3, minScale));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nodeFloat = {
    float: {
      y: ["-12px", "12px"],
      transition: {
        y: { duration: 3, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" }
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: `${800 * scale}px`, height: `${800 * scale}px`, margin: '0 auto', transform: centerLayout ? 'none' : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 'none' : 'translateX(-70px)') }}>
      
      <motion.div 
        className="ecosystem-graph"
        style={{ 
          position: 'absolute', 
          top: '50%',
          left: '50%',
          width: '800px', 
          height: '800px', 
          x: "-50%",
          y: "-50%",
          scale: scale,
          transformOrigin: 'center center',
          opacity: containerOpacity,
          filter: containerFilter
        }}
      >
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '800px', height: '800px', pointerEvents: 'none' }} viewBox="0 0 1000 1000">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker id="arrow-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gold)" />
            </marker>
          </defs>

          {/* ─── BASE SKELETON (Drawn by Scroll) ─── */}
          <motion.circle 
            style={{ transformOrigin: "500px 500px", pathLength: drawPath, opacity: drawOpacity }} 
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            cx="500" cy="500" r="160" fill="none" stroke="rgba(205, 164, 100, 0.15)" strokeWidth="1" strokeDasharray="4 8" 
          />
          <motion.circle style={{ pathLength: drawPath, opacity: drawOpacity }} cx="500" cy="500" r="280" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          <motion.circle style={{ pathLength: drawPath, opacity: drawOpacity }} cx="500" cy="500" r="380" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <motion.circle 
            style={{ transformOrigin: "500px 500px", pathLength: drawPath, opacity: drawOpacity }} 
            animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            cx="500" cy="500" r="380" fill="none" stroke="rgba(205, 164, 100, 0.3)" strokeWidth="1" strokeDasharray="8 16" 
          />

          <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1">
            <motion.line style={{ pathLength: drawPath, opacity: drawOpacity }} x1="230" y1="230" x2="770" y2="770" />
            <motion.line style={{ pathLength: drawPath, opacity: drawOpacity }} x1="230" y1="770" x2="770" y2="230" />
          </g>

          <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)">
            <motion.line style={{ pathLength: drawPath, opacity: drawOpacity }} x1="500" y1="280" x2="500" y2="380" />
            <motion.line style={{ pathLength: drawPath, opacity: drawOpacity }} x1="500" y1="620" x2="500" y2="720" />
            <motion.line style={{ pathLength: drawPath, opacity: drawOpacity }} x1="280" y1="500" x2="380" y2="500" />
            <motion.line style={{ pathLength: drawPath, opacity: drawOpacity }} x1="620" y1="500" x2="720" y2="500" />
          </g>

          {/* ─── ACTIVE DATA FLOWS ─── */}
          <motion.g style={{ opacity: flowOpacity }}>
            <g strokeWidth="2" fill="none" filter="url(#glow)">
              <g className="flow-line-out" stroke="var(--gold)">
                <path d="M 504 380 L 504 280" strokeDasharray="6 24" />
                <path d="M 496 620 L 496 720" strokeDasharray="6 24" />
                <path d="M 380 496 L 280 496" strokeDasharray="6 24" />
                <path d="M 620 504 L 720 504" strokeDasharray="6 24" />
              </g>
              <g className="flow-line-in" stroke="rgba(255,255,255,0.7)">
                <path d="M 496 380 L 496 280" strokeDasharray="6 24" />
                <path d="M 504 620 L 504 720" strokeDasharray="6 24" />
                <path d="M 380 504 L 280 504" strokeDasharray="6 24" />
                <path d="M 620 496 L 720 496" strokeDasharray="6 24" />
              </g>
            </g>

            <g stroke="rgba(205, 164, 100, 0.4)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-gold)">
              <path d="M 580 128 A 380 380 0 0 1 872 420" strokeDasharray="5 25" className="flow-line-out" />
              <path d="M 872 580 A 380 380 0 0 1 580 872" strokeDasharray="5 25" className="flow-line-out" />
              <path d="M 420 872 A 380 380 0 0 1 128 580" strokeDasharray="5 25" className="flow-line-out" />
              <path d="M 128 420 A 380 380 0 0 1 420 128" strokeDasharray="5 25" className="flow-line-out" />
            </g>

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

        {/* Center Node */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div style={{ scale: nodeScale, opacity: nodeOpacity, filter: nodeFilter }}>
            <motion.div variants={nodeFloat} animate="float">
              <div className="ecosystem-graph-node center-node group bg-black/60 backdrop-blur-md w-40 h-40 rounded-full border border-[var(--gold)]/30 shadow-[0_0_30px_rgba(205,164,100,0.15)] flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[var(--gold)] opacity-5 blur-2xl group-hover:opacity-15 transition-opacity duration-700 rounded-full" />
                <h3 className="text-2xl font-serif text-white mb-1 font-semibold text-center leading-tight">Axis<br/>Operations</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Top Node: Intelligence */}
        <div style={{ position: 'absolute', zIndex: 10, top: '96px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div style={{ scale: nodeScale, opacity: nodeOpacity, filter: nodeFilter }}>
            <motion.div variants={nodeFloat} animate="float">
              <div className="ecosystem-graph-node satellite-node node-purple group">
                <Brain className="w-8 h-8 mb-2 opacity-80 text-[#9b59b6] group-hover:text-white transition-colors" />
                <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Intelligence</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Node: Media */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '704px', transform: 'translate(-50%, -50%)' }}>
          <motion.div style={{ scale: nodeScale, opacity: nodeOpacity, filter: nodeFilter }}>
            <motion.div variants={nodeFloat} animate="float">
              <div className="ecosystem-graph-node satellite-node node-orange group">
                <Play className="w-8 h-8 mb-2 opacity-80 text-[#e67e22] group-hover:text-white transition-colors" />
                <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Media</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Node: Ventures */}
        <div style={{ position: 'absolute', zIndex: 10, top: '704px', left: '400px', transform: 'translate(-50%, -50%)' }}>
          <motion.div style={{ scale: nodeScale, opacity: nodeOpacity, filter: nodeFilter }}>
            <motion.div variants={nodeFloat} animate="float">
              <div className="ecosystem-graph-node satellite-node node-green group">
                <DollarSign className="w-8 h-8 mb-2 opacity-80 text-[#2ecc71] group-hover:text-white transition-colors" />
                <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Ventures</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Left Node: Studio */}
        <div style={{ position: 'absolute', zIndex: 10, top: '400px', left: '96px', transform: 'translate(-50%, -50%)' }}>
          <motion.div style={{ scale: nodeScale, opacity: nodeOpacity, filter: nodeFilter }}>
            <motion.div variants={nodeFloat} animate="float">
              <div className="ecosystem-graph-node satellite-node node-blue group">
                <Building2 className="w-8 h-8 mb-2 opacity-80 text-[#4A90E2] group-hover:text-white transition-colors" />
                <h4 className="text-[0.8rem] font-mono tracking-widest text-[var(--ivory)] uppercase group-hover:text-shimmer transition-all">Studio</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
