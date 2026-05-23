"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { JourneyStage } from "@/lib/journey";

type GlassPanelProps = {
  stage: JourneyStage;
  active: boolean;
  index: number;
};

export default function GlassPanel({ stage, active, index }: GlassPanelProps) {
  const bodies = Array.isArray(stage.body) ? stage.body : [stage.body];
  const isSplit = stage.id === "is-isnot";
  const isClosing = stage.id === "closing";

  return (
    <motion.article
      className={`glass-panel glass-panel--${stage.align} ${isSplit ? "glass-panel--split" : ""} ${isClosing ? "glass-panel--closing" : ""}`}
      id={stage.id === "ecosystem" ? "stage-ecosystem" : undefined}
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!active}
    >
      <div className="glass-panel__frame" aria-hidden>
        <span className="glass-panel__corner glass-panel__corner--tl" />
        <span className="glass-panel__corner glass-panel__corner--tr" />
        <span className="glass-panel__corner glass-panel__corner--bl" />
        <span className="glass-panel__corner glass-panel__corner--br" />
      </div>

      <header className="glass-panel__header">
        <div className="glass-panel__meta">
          <span className="glass-panel__planet">{stage.label}</span>
          <span className="glass-panel__rule" />
          <span className="glass-panel__step">
            {String(index + 1).padStart(2, "0")} / 06
          </span>
        </div>
        {stage.eyebrow && (
          <p className="glass-panel__eyebrow">{stage.eyebrow}</p>
        )}
        <h2 className="glass-panel__title">{stage.title}</h2>
      </header>

      {isSplit ? (
        <div className="glass-panel__columns">
          <div className="glass-panel__col-block">
            <h3 className="glass-panel__sub">What Axis Is</h3>
            <p>{bodies[0]}</p>
          </div>
          <div className="glass-panel__col-block">
            <h3 className="glass-panel__sub">What Axis Is Not</h3>
            {stage.list && (
              <ul className="glass-panel__list">
                {stage.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="glass-panel__body">
          {bodies.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          {stage.list && !isSplit && (
            <ul className="glass-panel__list">
              {stage.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {stage.cta && stage.cta.length > 0 && (
        <footer className="glass-panel__ctas">
          {stage.cta.map((btn) =>
            btn.href.startsWith("#") ? (
              <a
                key={btn.label}
                href={btn.href}
                className={btn.primary ? "btn btn--primary" : "btn btn--ghost"}
              >
                {btn.label}
              </a>
            ) : (
              <Link
                key={btn.label}
                href={btn.href}
                className={btn.primary ? "btn btn--primary" : "btn btn--ghost"}
              >
                {btn.label}
              </Link>
            )
          )}
        </footer>
      )}
    </motion.article>
  );
}
