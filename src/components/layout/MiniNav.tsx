"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MiniNav() {
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
    { label: "Divisions", href: "#divisions" },
    { label: "Insights", href: "#insights" },
    { label: "Diagnostic", href: "#diagnostic" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`mini-nav ${scrolled ? "mini-nav--scrolled" : ""}`}
    >
      <div className="mini-nav__logo">
        <div className="mini-nav__mark" />
        <span className="mini-nav__brand">AXIS</span>
      </div>

      <div className="mini-nav__links">
        {navLinks.map((link, i) => (
          <Link key={i} href={link.href} className="mini-nav__link">
            {link.label}
            <span className="mini-nav__indicator" />
          </Link>
        ))}
      </div>

      <div className="mini-nav__mobile-btn">
        <button className="menu-trigger">
          <span className="menu-line-long" />
          <span className="menu-line-short" />
        </button>
      </div>
    </motion.nav>
  );
}
