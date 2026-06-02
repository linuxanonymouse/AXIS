"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { JourneyStage } from "@/lib/journey";
import { IconArrow } from "@/components/ui/icons";

type SunIntroProps = {
  stage: JourneyStage;
  active: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** Transparent copy locked to viewport center sits on the Sun disc */
export default function SunIntro({ stage, active }: SunIntroProps) {
  const bodies = Array.isArray(stage.body) ? stage.body : [stage.body];

  return (
    <motion.div
      className="sun-intro sun-intro--bare"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!active}
    >
      <motion.div
        className="sun-intro__stack"
        initial="hidden"
        animate={active ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
      >
        {stage.eyebrow && (
          <motion.p className="sun-intro__eyebrow" variants={fadeUp}>
            {stage.eyebrow}
          </motion.p>
        )}

        <motion.h1 className="sun-intro__title" variants={fadeUp}>
          {stage.title}
        </motion.h1>

        <motion.p className="sun-intro__tagline" variants={fadeUp}>
          {bodies[0]}
        </motion.p>

        {stage.cta && stage.cta.length > 0 && (
          <motion.div className="sun-intro__ctas" variants={fadeUp}>
            {stage.cta.map((btn) => (
              <Link
                key={btn.label}
                href={btn.href}
                className={
                  btn.primary
                    ? "sun-intro__cta sun-intro__cta--primary"
                    : "sun-intro__cta"
                }
              >
                {btn.label}
                <IconArrow size={14} aria-hidden />
              </Link>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
