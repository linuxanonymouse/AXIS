"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./HeroVideo.css";

export default function HeroVideo() {
  const [videoSrc, setVideoSrc] = useState("");

  // Simulated sequence text
  const [seqIndex, setSeqIndex] = useState(0);
  const sequenceText = [
    "AXIS",
    "Most organizations are not missing effort",
    "They are missing structure",
    "Structure determines outcome",
    "Clarity\nStructure\nMonetization",
    "Axis is the operating system for execution"
  ];

  useEffect(() => {
    // In production, this would sync with actual video timestamps
    const interval = setInterval(() => {
      setSeqIndex((prev) => (prev + 1) % sequenceText.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sequenceText.length]);

  return (
    <section className="hero-video-section">
      
      {/* Video Background Placeholder */}
      <div className="hero-video-bg">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video-element"
        >
          {/* Fallback to earth texture if final video is not ready */}
          <source src="/video/axis-sequence.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-gradient" />
      </div>

      {/* Sequence Text */}
      <div className="hero-video-content">
        <motion.div
          key={seqIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="hero-video-text-container"
        >
          <h1 className="hero-video-text">
            {sequenceText[seqIndex]}
          </h1>
        </motion.div>
      </div>

      {/* Homepage CTAs */}
      <div className="hero-video-ctas">
        <Link href="/diagnostic" className="hero-btn-primary">
          Start Strategic Diagnostic
        </Link>
        <Link href="/overview" className="hero-btn-secondary">
          Explore Axis
        </Link>
      </div>

    </section>
  );
}
