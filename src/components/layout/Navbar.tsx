"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const desktopLinks = [
    { label: "Overview", href: "/overview" },
    { label: "Divisions", href: "/divisions" },
    { label: "Insights", href: "/insights" },
    { label: "Diagnostic", href: "/diagnostic" },
    { label: "Contact", href: "/contact" }
  ];

  const mobileLinks = [
    { label: "Overview", href: "/overview" },
    { label: "Divisions", href: "/divisions" },
    { label: "Operations", href: "/divisions/operations" },
    { label: "Studio", href: "/divisions/studio" },
    { label: "Intelligence", href: "/divisions/intelligence" },
    { label: "Media", href: "/divisions/media" },
    { label: "Ventures", href: "/divisions/ventures" },
    { label: "Diagnostic", href: "/diagnostic" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}
      >
        <div className="navbar__logo">
          <Link href="/" className="navbar__logo-link">
            <img src="/images/AXIS%20Gold%20Logo-01.png" alt="AXIS" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar__links">
          {desktopLinks.map((link, i) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link key={i} href={link.href} className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                {link.label}
                <span className="navbar__indicator" />
              </Link>
            );
          })}
        </div>

        <div className="navbar__actions">
          <Link href="/apply" className="navbar__btn-apply">
            Apply Access
          </Link>
          
          <div className="navbar__mobile-btn">
            <button 
              className={`menu-trigger ${menuOpen ? "open" : ""}`} 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="menu-line-long" />
              <span className="menu-line-short" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-links">
              {mobileLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05), duration: 0.4 }}
                  >
                    <Link href={link.href} className={`mobile-menu-link ${isActive ? 'mobile-menu-link--active' : ''}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              className="mobile-menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/apply" className="mobile-menu-btn-apply">
                Apply Access
              </Link>
              <a href="mailto:operations@axisoperations.ca" className="mobile-menu-email">
                operations@axisoperations.ca
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
