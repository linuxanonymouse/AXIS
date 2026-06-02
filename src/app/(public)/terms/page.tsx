"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../apply/apply.css";

export default function TermsPage() {
  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <article className="legal-shell">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="legal-back"
          >
            <Link href="/" className="legal-back__link">← Axis</Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="legal-header"
          >
            <p className="legal-eyebrow">Legal</p>
            <h1 className="legal-title">Terms of Use</h1>
            <p className="legal-date">Last updated: May 2025</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="legal-body"
          >
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Axis website and platform (axisoperations.ca), you agree
              to be bound by these Terms of Use. If you do not agree, do not use the platform.
            </p>

            <h2>2. Nature of the Platform</h2>
            <p>
              The Axis platform is an informational and application intake system. Submission of
              the Strategic Diagnostic application does not constitute an agreement, contract, or
              guarantee of engagement. All applications are reviewed at Axis's sole discretion.
            </p>
            <p>
              Axis is not an agency, consultancy, or advisory firm in the traditional sense. The
              platform exists to evaluate organizational alignment and determine whether an
              engagement is appropriate.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              All content on this platform including text, design, graphics, methodology
              descriptions, and structural frameworks is the intellectual property of Axis and
              its principals. Reproduction, distribution, or derivative use without written
              permission is prohibited.
            </p>

            <h2>4. Submissions</h2>
            <p>
              By submitting information through the Strategic Diagnostic or contact forms, you
              represent that the information provided is accurate and that you have authority to
              submit on behalf of the organization named. Axis reserves the right to decline any
              application without explanation.
            </p>

            <h2>5. No Professional Advice</h2>
            <p>
              Content published on this platform, including Insights articles and strategic
              frameworks, is for informational purposes only. It does not constitute legal,
              financial, accounting, or professional advice. Consult qualified professionals for
              advice specific to your situation.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Axis and its principals shall
              not be liable for any indirect, incidental, special, or consequential damages
              arising from your use of or inability to use the platform.
            </p>

            <h2>7. Modifications</h2>
            <p>
              Axis reserves the right to modify these Terms at any time. Continued use of the
              platform following any modification constitutes acceptance of the updated Terms.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Province of Ontario, Canada, without
              regard to conflict of law principles.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions regarding these Terms, contact:{" "}
              <a href="mailto:operations@axisoperations.ca">operations@axisoperations.ca</a>
            </p>
          </motion.div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
