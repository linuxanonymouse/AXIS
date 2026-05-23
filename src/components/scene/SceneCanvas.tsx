"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import dynamic from "next/dynamic";
import SolarSystem from "./SolarSystem";
import PlanetCamera from "./PlanetCamera";
import { useScrollProgress } from "@/context/ScrollContext";
import { JOURNEY_STAGES } from "@/lib/journey";
const ScenePostProcessing = dynamic(
  () => import("./ScenePostProcessing"),
  { ssr: false }
);

export default function SceneCanvas() {
  const { stageIndex, cameraStageIndex, cameraStageLocal } =
    useScrollProgress();
  const activePlanet = JOURNEY_STAGES[stageIndex]?.planet ?? "Earth";

  return (
    <div className="scene-canvas" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
        }}
        className="scene-canvas__gl"
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 10.5]}
          fov={36}
          near={0.05}
          far={900}
        />
        <PlanetCamera
          stageIndex={cameraStageIndex}
          stageLocal={cameraStageLocal}
        />
        <SolarSystem activePlanet={activePlanet} />
        <Preload all />
        <ScenePostProcessing />
      </Canvas>
      <div className="scene-canvas__vignette" />
      <div className="scene-canvas__grain" />
    </div>
  );
}
