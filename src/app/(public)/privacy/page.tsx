"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../apply/apply.css";

export default function PrivacyPage() {
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
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-date">Last updated: May 2025</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="legal-body"
          >
            <h2>1. Information We Collect</h2>
            <p>
              Axis collects information you provide directly when submitting the Strategic
              Diagnostic application, contacting us, or otherwise interacting with our platform.
              This includes your name, organization name, email address, and the content of your
              submissions.
            </p>
            <p>
              We also collect limited technical data automatically, including hashed IP addresses
              (processed using one-way SHA-256 hashing), browser user agent strings, and the
              source path of your submission. Raw IP addresses are never stored.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              Information collected through the Strategic Diagnostic and contact forms is used
              solely to evaluate alignment, respond to inquiries, and determine whether an
              engagement is appropriate. We do not use your information for advertising, profiling,
              or sale to third parties.
            </p>
            <p>
              Submissions may be forwarded to internal workflow automation systems (such as
              Make.com or n8n) for processing and review. These systems operate under
              confidentiality obligations consistent with this policy.
            </p>

            <h2>3. Data Retention</h2>
            <p>
              Application and contact data is retained for as long as necessary to evaluate and
              respond to your submission, and for a reasonable period thereafter for internal
              record-keeping. You may request deletion of your data at any time by contacting us
              at the address below.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your
              information. All data is stored in secured, access-controlled database environments.
              Sensitive identifiers such as IP addresses are hashed before storage.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>
              Our platform is hosted on infrastructure provided by Vercel. Database services are
              provided by PostgreSQL-compatible cloud providers. These providers may process data
              on our behalf in accordance with their own privacy policies and applicable data
              protection law.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, or delete
              personal data we hold about you. To exercise these rights, contact us at{" "}
              <a href="mailto:operations@axisoperations.ca">operations@axisoperations.ca</a>.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              reflected in the "Last updated" date above. Continued use of the platform following
              any update constitutes acceptance of the revised policy.
            </p>

            <h2>8. Contact</h2>
            <p>
              For privacy-related inquiries, contact:{" "}
              <a href="mailto:operations@axisoperations.ca">operations@axisoperations.ca</a>
            </p>
          </motion.div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
