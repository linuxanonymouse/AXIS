"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/context/ScrollContext";
import { JOURNEY_STAGES } from "@/lib/journey";

/** Side scrims + top progress — keeps copy readable over the 3D scene */
export default function ReadabilityLayer() {
  const { stageIndex, journeyProgress } = useScrollProgress();
  const stage = JOURNEY_STAGES[stageIndex];
  const align = stage?.align ?? "center";
  const isIntro = stage?.id === "intro";

  return (
    <>
      <motion.div
        className="journey-progress"
        style={{ transformOrigin: "left center" }}
        animate={{ scaleX: Math.max(0.02, journeyProgress) }}
        transition={{ duration: 0.15, ease: "linear" }}
        aria-hidden
      />

      {!isIntro && align === "left" && (
        <motion.div
          className="readability-scrim readability-scrim--left"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />
      )}
      {!isIntro && align === "right" && (
        <motion.div
          className="readability-scrim readability-scrim--right"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />
      )}
      {!isIntro && align === "center" && (
        <motion.div
          className="readability-scrim readability-scrim--bottom"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />
      )}
    </>
  );
}
