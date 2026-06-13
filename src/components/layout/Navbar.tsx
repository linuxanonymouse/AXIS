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
          <Link href="/diagnostic" className="navbar__btn-apply">
            Start Strategic Diagnostic
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
              {/* Primary */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
                <Link href="/overview" className={`mobile-menu-link ${pathname === '/overview' ? 'mobile-menu-link--active' : ''}`}>Overview</Link>
              </motion.div>
              
              {/* Divisions Group */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.4 }} className="mobile-menu-group">
                <Link href="/divisions" className={`mobile-menu-link ${pathname === '/divisions' ? 'mobile-menu-link--active' : ''}`}>Divisions</Link>
                <div className="mobile-menu-sublinks">
                  <Link href="/divisions/operations" className={`mobile-menu-sublink ${pathname === '/divisions/operations' ? 'mobile-menu-sublink--active' : ''}`}>Axis Operations</Link>
                  <Link href="/divisions/studio" className={`mobile-menu-sublink ${pathname === '/divisions/studio' ? 'mobile-menu-sublink--active' : ''}`}>Axis Studio</Link>
                  <Link href="/divisions/intelligence" className={`mobile-menu-sublink ${pathname === '/divisions/intelligence' ? 'mobile-menu-sublink--active' : ''}`}>Axis Intelligence</Link>
                  <Link href="/divisions/media" className={`mobile-menu-sublink ${pathname === '/divisions/media' ? 'mobile-menu-sublink--active' : ''}`}>Axis Media</Link>
                </div>
              </motion.div>

              {/* Strategic Action */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
                <Link href="/diagnostic" className={`mobile-menu-link ${pathname.startsWith('/diagnostic') ? 'mobile-menu-link--active' : ''}`}>Diagnostic</Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.4 }}>
                <Link href="/insights" className={`mobile-menu-link ${pathname.startsWith('/insights') ? 'mobile-menu-link--active' : ''}`}>Insights</Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
                <Link href="/contact" className={`mobile-menu-link ${pathname === '/contact' ? 'mobile-menu-link--active' : ''}`}>Contact</Link>
              </motion.div>
            </div>

            <motion.div 
              className="mobile-menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/diagnostic" className="mobile-menu-btn-apply">
                Start Strategic Diagnostic
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
