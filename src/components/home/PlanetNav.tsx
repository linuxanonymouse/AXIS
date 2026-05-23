"use client";

import { JOURNEY_STAGES } from "@/lib/journey";
import { useScrollProgress } from "@/context/ScrollContext";

export default function PlanetNav() {
  const { stageIndex, journeyTrackRef } = useScrollProgress();

  const jumpTo = (index: number) => {
    const el = journeyTrackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + index * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="planet-nav" aria-label="Journey stages">
      {JOURNEY_STAGES.map((stage, i) => (
        <button
          key={stage.id}
          type="button"
          className={`planet-nav__dot ${stageIndex === i ? "planet-nav__dot--active" : ""}`}
          onClick={() => jumpTo(i)}
          aria-label={`${stage.label}: ${stage.title}`}
          aria-current={stageIndex === i ? "step" : undefined}
        >
          <span className="planet-nav__label">{stage.label}</span>
        </button>
      ))}
    </nav>
  );
}
