"use client";

import { motion } from "framer-motion";
import { JOURNEY_STAGES } from "@/lib/journey";
import { useScrollProgress } from "@/context/ScrollContext";
import { PlanetIcon } from "@/components/ui/icons";

export default function StageRail() {
  const { stageIndex, journeyProgress, journeyTrackRef } = useScrollProgress();
  const progressPct = (stageIndex / (JOURNEY_STAGES.length - 1)) * 100;

  const jumpTo = (index: number) => {
    const el = journeyTrackRef.current;
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY + index * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside className="stage-rail" aria-label="Journey navigation">
      <div className="stage-rail__head">
        <span className="stage-rail__label">ORBIT</span>
        <span className="stage-rail__count">
          {String(stageIndex + 1).padStart(2, "0")}
          <span className="stage-rail__count-sep">/</span>
          {String(JOURNEY_STAGES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="stage-rail__track">
        <motion.div
          className="stage-rail__fill"
          animate={{ height: `${progressPct}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <ul className="stage-rail__list">
          {JOURNEY_STAGES.map((stage, i) => {
            const active = stageIndex === i;
            const done = i < stageIndex;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  className={`stage-rail__btn ${active ? "stage-rail__btn--active" : ""} ${done ? "stage-rail__btn--done" : ""}`}
                  onClick={() => jumpTo(i)}
                  aria-label={`${stage.label}: ${stage.title}`}
                  aria-current={active ? "step" : undefined}
                >
                  <span className="stage-rail__node">
                    <PlanetIcon
                      planet={stage.planet}
                      stageId={stage.id}
                      size={16}
                    />
                  </span>
                  <span className="stage-rail__text">
                    <span className="stage-rail__name">{stage.label}</span>
                    <span className="stage-rail__title">{stage.eyebrow ?? stage.id}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="stage-rail__scroll" aria-hidden>
        <motion.div
          className="stage-rail__scroll-bar"
          style={{ transformOrigin: "left center" }}
          animate={{ scaleX: Math.max(0.02, journeyProgress) }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
      </div>
    </aside>
  );
}
