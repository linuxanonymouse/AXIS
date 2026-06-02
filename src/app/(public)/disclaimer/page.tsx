"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../apply/apply.css";

export default function DisclaimerPage() {
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
            <h1 className="legal-title">Disclaimer</h1>
            <p className="legal-date">Last updated: May 2025</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="legal-body"
          >
            <h2>General Disclaimer</h2>
            <p>
              The information provided on the Axis platform (axisoperations.ca) is for general
              informational purposes only. While we endeavor to keep information accurate and
              current, we make no representations or warranties of any kind, express or implied,
              about the completeness, accuracy, reliability, suitability, or availability of the
              information, products, services, or related graphics contained on the platform.
            </p>

            <h2>No Guarantee of Results</h2>
            <p>
              Any strategic frameworks, methodologies, or insights published on this platform
              represent general principles and approaches. Results achieved by organizations that
              engage with Axis will vary based on individual circumstances, market conditions,
              execution quality, and factors outside Axis's control. No specific outcome is
              guaranteed.
            </p>

            <h2>Not Professional Advice</h2>
            <p>
              Nothing on this platform constitutes legal, financial, accounting, tax, or
              investment advice. The content is provided for informational and educational
              purposes only. You should consult qualified professionals before making decisions
              based on information found on this platform.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              This platform may contain links to third-party websites. These links are provided
              for convenience only. Axis has no control over the content of those sites and
              accepts no responsibility for them or for any loss or damage that may arise from
              your use of them.
            </p>

            <h2>Forward-Looking Statements</h2>
            <p>
              Certain content on this platform may contain forward-looking statements or
              projections. These are based on current expectations and assumptions and are subject
              to risks and uncertainties. Actual results may differ materially from those
              expressed or implied.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event will Axis, its principals, employees, or agents be liable for any loss
              or damage including, without limitation, indirect or consequential loss or damage,
              or any loss or damage whatsoever arising from loss of data or profits arising out of,
              or in connection with, the use of this platform.
            </p>

            <h2>Contact</h2>
            <p>
              For questions regarding this Disclaimer, contact:{" "}
              <a href="mailto:operations@axisoperations.ca">operations@axisoperations.ca</a>
            </p>
          </motion.div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
