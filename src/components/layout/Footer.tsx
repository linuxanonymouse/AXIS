import Link from "next/link";
import {
  SITE,
  ROUTES,
  FOOTER_LINKS,
  FOOTER_DIVISIONS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link href={ROUTES.home} className="footer__logo">
            {SITE.name}
          </Link>
        </div>

        <div className="footer__columns">
          <ul className="footer__list">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="footer__list footer__list--muted">
            {FOOTER_DIVISIONS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__meta">
          <a href={`mailto:${SITE.email}`} className="footer__email">
            {SITE.email}
          </a>
          <div className="footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
