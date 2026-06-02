"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./submission.css";

export default function SubmissionReceivedPage() {
  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content">
        <section className="submission">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="submission__title"
          >
            Submission Received
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="submission__body"
          >
            Your Strategic Diagnostic has been received. Axis will review the submission and issue
            next steps if alignment is confirmed. This is an automated confirmation. Internal
            review will determine whether the opportunity is aligned with the Axis system.
          </motion.p>

          <Link href="/" className="axis-btn axis-btn--primary">
            Return to Axis
          </Link>
        </section>

        <Footer />
      </div>
    </main>
  );
}

