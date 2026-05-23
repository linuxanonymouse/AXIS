"use client";

import { AnimatePresence } from "framer-motion";
import { JOURNEY_STAGES } from "@/lib/journey";
import { useScrollProgress } from "@/context/ScrollContext";
import TechPanel from "@/components/ui/TechPanel";
import SunIntro from "@/components/home/SunIntro";

export default function JourneyPanels() {
  const { stageIndex } = useScrollProgress();
  const stage = JOURNEY_STAGES[stageIndex];

  if (!stage) return null;

  return (
    <div
      className={`journey-panels ${stage.id === "intro" ? "journey-panels--intro" : ""} ${stage.id === "closing" ? "journey-panels--closing" : ""}`}
    >
      <AnimatePresence mode="wait">
        {stage.id === "intro" ? (
          <div key="intro" className="journey-panels__intro-wrap">
            <SunIntro stage={stage} active />
          </div>
        ) : (
          <div key={stage.id} className="journey-panels__grid">
            <aside className="journey-panels__col journey-panels__col--left">
              {stage.align === "left" && (
                <TechPanel stage={stage} index={stageIndex} active />
              )}
            </aside>

            <div
              className="journey-panels__col journey-panels__col--spacer"
              aria-hidden
            />

            <aside className="journey-panels__col journey-panels__col--right">
              {stage.align === "right" && (
                <TechPanel stage={stage} index={stageIndex} active />
              )}
            </aside>

            <div className="journey-panels__col journey-panels__col--center">
              {stage.align === "center" && (
                <TechPanel stage={stage} index={stageIndex} active />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
