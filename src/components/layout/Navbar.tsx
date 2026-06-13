"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Crosshair, LayoutGrid, Layers, Building2, BrainCircuit, PlaySquare, CircleDollarSign, Activity, BarChart2, Mail, ChevronRight, Target, X } from "lucide-react";
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
            <div className="navbar__mark" />
            <span className="navbar__brand">AXIS</span>
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
            Request Access
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mobile-menu-header">
              <div className="navbar__logo">
                <div className="navbar__mark" />
                <span className="navbar__brand">A X I S</span>
              </div>
              <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
                <X size={24} color="#d4af37" strokeWidth={1} />
              </button>
            </div>

            <div className="mobile-menu-scroll">
              {/* PRIMARY NAVIGATION */}
              <div className="mobile-menu-section">
                <span className="mobile-menu-section-title">PRIMARY NAVIGATION</span>
                <Link href="/overview" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><Crosshair size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Overview</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
              </div>

              {/* DIVISIONS */}
              <div className="mobile-menu-section">
                <span className="mobile-menu-section-title">DIVISIONS</span>
                <Link href="/divisions" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><LayoutGrid size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Divisions</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/divisions/operations" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><Layers size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Operations</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/divisions/studio" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><Building2 size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Studio</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/divisions/intelligence" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><BrainCircuit size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Intelligence</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/divisions/media" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><PlaySquare size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Media</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/divisions/ventures" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><CircleDollarSign size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Ventures</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
              </div>

              {/* STRATEGIC ENTRY */}
              <div className="mobile-menu-section">
                <span className="mobile-menu-section-title">STRATEGIC ENTRY</span>
                <Link href="/diagnostic" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><Activity size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Diagnostic</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/insights" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><BarChart2 size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Insights</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
                <Link href="/contact" className="mobile-menu-row" onClick={() => setMenuOpen(false)}>
                  <div className="mobile-icon-wrapper"><Mail size={16} strokeWidth={1.5} color="#d4af37" /></div>
                  <span className="mobile-menu-text">Contact</span>
                  <ChevronRight size={16} color="#d4af37" className="mobile-menu-arrow" />
                </Link>
              </div>

              {/* Bottom Actions */}
              <div className="mobile-menu-bottom">
                <Link href="/diagnostic" className="mobile-btn-diagnostic" onClick={() => setMenuOpen(false)}>
                  <Target size={18} color="#d4af37" strokeWidth={1.5} />
                  <span>START STRATEGIC DIAGNOSTIC</span>
                </Link>
                <a href="mailto:operations@axisoperations.ca" className="mobile-email-link">
                  operations@axisoperations.ca
                </a>
              </div>
              
              {/* Footer Links */}
              <div className="mobile-footer-links">
                <Link href="/privacy" onClick={() => setMenuOpen(false)}>PRIVACY POLICY</Link>
                <span>|</span>
                <Link href="/terms" onClick={() => setMenuOpen(false)}>TERMS</Link>
                <span>|</span>
                <Link href="/disclaimer" onClick={() => setMenuOpen(false)}>DISCLAIMER</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
