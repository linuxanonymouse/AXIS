"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { JourneyStage } from "@/lib/journey";
import { PlanetIcon, IconArrow } from "@/components/ui/icons";

type TechPanelProps = {
  stage: JourneyStage;
  active: boolean;
  index: number;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function TechPanel({ stage, active, index }: TechPanelProps) {
  const bodies = Array.isArray(stage.body) ? stage.body : [stage.body];
  const isSplit = stage.id === "is-isnot";
  const isClosing = stage.id === "closing";

  return (
    <motion.article
      className={`tech-panel tech-panel--${stage.align} ${isSplit ? "tech-panel--split" : ""} ${isClosing ? "tech-panel--closing" : ""}`}
      id={stage.id === "ecosystem" ? "stage-ecosystem" : undefined}
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.98 }
      }
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!active}
    >
      <div className="tech-panel__glow" aria-hidden />
      <motion.div
        className="tech-panel__scan"
        aria-hidden
        animate={active ? { top: ["-20%", "120%"] } : { top: "-20%" }}
        transition={
          active
            ? { duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }
            : { duration: 0 }
        }
      />

      <motion.div
        className="tech-panel__inner"
        variants={container}
        initial="hidden"
        animate={active ? "show" : "hidden"}
      >
        <motion.header className="tech-panel__header" variants={item}>
          <div className="tech-panel__meta">
            <span className="tech-panel__icon-wrap">
              <PlanetIcon
                planet={stage.planet}
                stageId={stage.id}
                size={22}
              />
            </span>
            <div className="tech-panel__meta-text">
              <span className="tech-panel__planet">{stage.label}</span>
              <span className="tech-panel__step">
                STAGE {String(index + 1).padStart(2, "0")} / 06
              </span>
            </div>
          </div>
          {stage.eyebrow && (
            <p className="tech-panel__eyebrow">{stage.eyebrow}</p>
          )}
          <h2 className="tech-panel__title">{stage.title}</h2>
        </motion.header>

        {isSplit ? (
          <motion.div className="tech-panel__columns" variants={item}>
            <div className="tech-panel__col-block">
              <h3 className="tech-panel__sub">What Axis Is</h3>
              <p>{bodies[0]}</p>
            </div>
            <div className="tech-panel__col-block">
              <h3 className="tech-panel__sub">What Axis Is Not</h3>
              {stage.list && (
                <ul className="tech-panel__list">
                  {stage.list.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div className="tech-panel__body" variants={item}>
            {bodies.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {stage.list && !isSplit && (
              <ul className="tech-panel__list">
                {stage.list.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {stage.cta && stage.cta.length > 0 && (
          <motion.footer className="tech-panel__ctas" variants={item}>
            {stage.cta.map((btn) => {
              const className = btn.primary
                ? "btn btn--primary"
                : "btn btn--ghost";
              const inner = (
                <>
                  {btn.label}
                  <IconArrow size={14} aria-hidden />
                </>
              );
              return btn.href.startsWith("#") ? (
                <a key={btn.label} href={btn.href} className={className}>
                  {inner}
                </a>
              ) : (
                <Link key={btn.label} href={btn.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </motion.footer>
        )}
      </motion.div>
    </motion.article>
  );
}
