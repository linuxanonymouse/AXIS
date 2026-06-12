"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function NotFound() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      position: "relative", 
      overflow: "hidden", 
      color: "var(--ivory)" 
    }}>
      <Navbar />

      {/* Massive subtle background 404 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0
        }}
      >
        <div style={{
          fontSize: "35vw",
          lineHeight: 1,
          fontFamily: "var(--font-serif)",
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.02)",
          filter: "blur(2px)"
        }}>
          404
        </div>
      </motion.div>

      {/* Ambient Glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        backgroundColor: "rgba(205, 164, 100, 0.03)",
        borderRadius: "50%",
        filter: "blur(120px)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Centered Content */}
      <motion.div 
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
          textAlign: "center",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem", width: "100%" }}>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(205, 164, 100, 0.5)" }} className="hidden sm:block" />
          <p className="eyebrow" style={{ color: "var(--gold)", margin: 0, fontSize: "0.875rem", opacity: 0.9 }}>
            SYSTEM ERROR 404
          </p>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(205, 164, 100, 0.5)" }} className="hidden sm:block" />
        </motion.div>
        
        <motion.h1 variants={fadeUp} style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: "2rem",
          color: "var(--ivory)",
          width: "100%"
        }}>
          Coordinate<br />Not Found.
        </motion.h1>
        
        <motion.p variants={fadeUp} style={{
          maxWidth: "500px",
          margin: "0 auto 3.5rem auto",
          color: "var(--text-muted)",
          fontSize: "1.125rem",
          lineHeight: 1.6,
          fontWeight: 300,
          width: "100%"
        }}>
          The requested path exists outside the controlled boundaries of the Axis ecosystem. Return to the core infrastructure to continue.
        </motion.p>
        
        <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
          <Link href="/" className="axis-btn axis-btn--primary">
            Return Home
          </Link>
          <Link href="/overview" className="axis-btn">
            Explore Ecosystem
          </Link>
        </motion.div>
      </motion.div>

      <div style={{ width: "100%", zIndex: 10, position: "relative" }}>
        <Footer />
      </div>
    </main>
  );
}
