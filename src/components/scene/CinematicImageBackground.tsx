"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CinematicImageBackgroundProps {
  src: string;
  alt: string;
}

export default function CinematicImageBackground({ src, alt }: CinematicImageBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale up slightly as you scroll down
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Fade out slightly as you scroll down
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.2]);
  
  // Parallax move up
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundColor: '#010204',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: -50, // bleed edge to allow for scaling and moving
          scale,
          y,
          opacity,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      {/* Dark vignette overlay for text readability */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, #010204 100%)',
          opacity: 0.8
        }}
      />
    </div>
  );
}
