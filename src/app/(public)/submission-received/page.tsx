"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./submission.css";

function SubmissionContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  let title = "Submission Received";
  let message = "Your submission has been received. Axis will review the details and issue next steps if alignment is confirmed.";

  if (type === "diagnostic") {
    title = "Diagnostic Transmitted";
    message = "Your Strategic Diagnostic has been received. Axis will review the submission and issue next steps if alignment is confirmed. This is an automated confirmation. Internal review will determine whether the opportunity is aligned with the Axis system.";
  } else if (type === "deployment") {
    title = "Alignment Request Received";
    message = "Your alignment request has been submitted. Axis will review your objectives and readiness to determine the appropriate next step.";
  } else if (type === "operator") {
    title = "Application Received";
    message = "Your operator access application has been received. Axis will review your experience and alignment to determine eligibility.";
  }

  return (
    <div className="axis-page__content">
      <section className="submission">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="submission__title"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="submission__body"
        >
          {message}
        </motion.p>

        <Link href="/" className="axis-btn axis-btn--primary">
          Return to Axis
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default function SubmissionReceivedPage() {
  return (
    <main className="axis-page">
      <Navbar />
      <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>}>
        <SubmissionContent />
      </Suspense>
    </main>
  );
}

