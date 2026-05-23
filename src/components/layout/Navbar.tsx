"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Studio", href: "#studio" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "Media", href: "#media" },
    { label: "Ventures", href: "#ventures" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
    >
      <div className="navbar__logo">
        <div className="navbar__mark" />
        <span className="navbar__brand">AXIS<span className="navbar__brand-os">OS</span></span>
      </div>

      <div className="navbar__links">
        {navLinks.map((link, i) => (
          <Link key={i} href={link.href} className="navbar__link">
            {link.label}
            <span className="navbar__indicator" />
          </Link>
        ))}
      </div>

      <div className="navbar__actions">
        <button className="navbar__btn-secondary">Client Portal</button>
        <button className="navbar__btn-primary">Initiate</button>
        
        <div className="navbar__mobile-btn">
          <button className="menu-trigger">
            <span className="menu-line-long" />
            <span className="menu-line-short" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
