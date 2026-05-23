"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { JOURNEY_STAGES, STAGE_COUNT, STAGE_VH } from "@/lib/journey";

type ScrollContextValue = {
  /** 0 → 1 across entire journey */
  journeyProgress: number;
  /** Current stage index 0..STAGE_COUNT-1 */
  stageIndex: number;
  /** 0 → 1 within current stage */
  stageLocal: number;
  /** Smoothed values for 3D camera (lags scroll for cinematic transitions) */
  cameraStageIndex: number;
  cameraStageLocal: number;
  journeyTrackRef: RefObject<HTMLDivElement | null>;
};

const ScrollContext = createContext<ScrollContextValue>({
  journeyProgress: 0,
  stageIndex: 0,
  stageLocal: 0,
  cameraStageIndex: 0,
  cameraStageLocal: 0,
  journeyTrackRef: { current: null },
});

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageLocal, setStageLocal] = useState(0);
  const [cameraStageIndex, setCameraStageIndex] = useState(0);
  const [cameraStageLocal, setCameraStageLocal] = useState(0);
  const journeyTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollTargetRef = useRef({ index: 0, local: 0 });
  const cameraSmoothRef = useRef({ global: 0 });

  const update = useCallback(() => {
    const el = journeyTrackRef.current;
    if (!el) return;

    const vh = window.innerHeight;
    const sectionPx = (STAGE_VH / 100) * vh;
    const scrollable = el.offsetHeight - vh;
    if (scrollable <= 0) {
      setJourneyProgress(0);
      setStageIndex(0);
      setStageLocal(0);
      return;
    }

    const scrolled = Math.max(0, -el.getBoundingClientRect().top);
    const progress = Math.min(1, scrolled / scrollable);
    setJourneyProgress(progress);

    const rawStage = scrolled / sectionPx;
    const idx = Math.min(STAGE_COUNT - 1, Math.floor(rawStage));
    const local = Math.min(1, rawStage - idx);
    setStageIndex(idx);
    setStageLocal(local);
    scrollTargetRef.current = { index: idx, local };
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const target = scrollTargetRef.current;
      const targetGlobal = target.index + target.local;
      const smooth = cameraSmoothRef.current;
      const delta = targetGlobal - smooth.global;
      smooth.global += delta * 0.016;
      const idx = Math.min(STAGE_COUNT - 1, Math.floor(smooth.global));
      const local = Math.min(1, Math.max(0, smooth.global - idx));
      setCameraStageIndex(idx);
      setCameraStageLocal(local);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        journeyProgress,
        stageIndex,
        stageLocal,
        cameraStageIndex,
        cameraStageLocal,
        journeyTrackRef,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollContext);
}

export { JOURNEY_STAGES, STAGE_COUNT, STAGE_VH };
