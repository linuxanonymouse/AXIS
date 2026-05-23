"use client";

import dynamic from "next/dynamic";
import {
  ScrollProvider,
  useScrollProgress,
  STAGE_COUNT,
  STAGE_VH,
} from "@/context/ScrollContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JourneyPanels from "@/components/home/JourneyPanels";
import StageRail from "@/components/home/StageRail";
import ReadabilityLayer from "@/components/home/ReadabilityLayer";

const SceneCanvas = dynamic(
  () => import("@/components/scene/SceneCanvas"),
  { ssr: false }
);

function JourneyScroll() {
  const { journeyTrackRef } = useScrollProgress();

  return (
    <div
      ref={journeyTrackRef}
      className="journey-scroll"
      style={{ height: `${STAGE_COUNT * STAGE_VH}vh` }}
    >
      {Array.from({ length: STAGE_COUNT }).map((_, i) => (
        <div key={i} className="journey-scroll__snap" />
      ))}
      <div className="journey-scroll__footer">
        <Footer />
      </div>
    </div>
  );
}

function HomepageShell() {
  const { stageIndex } = useScrollProgress();
  const isIntro = stageIndex === 0;

  return (
    <div
      className={`homepage homepage--journey ${isIntro ? "homepage--intro" : ""}`}
    >
        <SceneCanvas />
        <div className="homepage__ui">
          <ReadabilityLayer />
          <Header />
          <JourneyPanels />
          <StageRail />
        </div>
        <JourneyScroll />
      </div>
  );
}

export default function Homepage() {
  return (
    <ScrollProvider>
      <HomepageShell />
    </ScrollProvider>
  );
}
