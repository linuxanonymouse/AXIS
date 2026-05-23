"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, ROUTES, NAV_DESKTOP, NAV_MOBILE } from "@/lib/constants";
import { IconAxis, IconMenu, IconClose, IconArrow } from "@/components/ui/icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header__inner">
          <Link href={ROUTES.home} className="header__logo">
            <IconAxis size={18} className="header__logo-icon" />
            <span className="header__logo-text">{SITE.name}</span>
          </Link>

          <nav className="header__nav" aria-label="Primary">
            {NAV_DESKTOP.map((item) => (
              <Link key={item.href} href={item.href} className="header__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <Link href={ROUTES.diagnostic} className="btn btn--primary btn--sm">
              Access
              <IconArrow size={12} aria-hidden />
            </Link>
            <button
              type="button"
              className="header__menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <IconMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu__top">
              <span className="mobile-menu__brand">
                <IconAxis size={16} />
                {SITE.name}
              </span>
              <button
                type="button"
                className="mobile-menu__close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <IconClose size={18} />
              </button>
            </div>

            <nav className="mobile-menu__nav">
              {NAV_MOBILE.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="mobile-menu__link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mobile-menu__index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    <IconArrow size={16} className="mobile-menu__arrow" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-menu__footer">
              <Link
                href={ROUTES.diagnostic}
                className="btn btn--primary btn--full"
                onClick={() => setMenuOpen(false)}
              >
                Request Access
                <IconArrow size={14} aria-hidden />
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="mobile-menu__email"
              >
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
