import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  const mainLinks = [
    { label: "Overview", href: "/overview" },
    { label: "Divisions", href: "/divisions" },
    { label: "Diagnostic", href: "/diagnostic" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" }
  ];

  const divisionLinks = [
    { label: "Operations", href: "/divisions/operations" },
    { label: "Studio", href: "/divisions/studio" },
    { label: "Intelligence", href: "/divisions/intelligence" },
    { label: "Media", href: "/divisions/media" }
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        
        {/* Brand */}
        <div className="footer__brand">
          <Link href="/" className="footer__logo">AXIS</Link>
        </div>

        {/* Links Container */}
        <div className="footer__columns">
          
          {/* Main Links */}
          <div className="footer__list">
            {mainLinks.map(link => (
              <Link key={link.href} href={link.href} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Division Links */}
          <div className="footer__list">
            {divisionLinks.map(link => (
              <Link key={link.href} href={link.href} className="footer__link footer__link--muted">
                {link.label}
              </Link>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <a href="mailto:operations@axisoperations.ca" className="footer__email">
          operations@axisoperations.ca
        </a>
        <div className="footer__legal">
          <Link href="/privacy" className="footer__legal-link">Privacy Policy</Link>
          <Link href="/terms" className="footer__legal-link">Terms</Link>
          <Link href="/disclaimer" className="footer__legal-link">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
