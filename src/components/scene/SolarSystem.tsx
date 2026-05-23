"use client";

import { Suspense } from "react";
import { Line } from "@react-three/drei";
import { PLANETS } from "@/lib/solar";
import { PLANET_TEXTURES } from "@/lib/textures";
import SpaceEnvironment from "./SpaceEnvironment";
import SceneLighting from "./SceneLighting";
import RealisticSun from "./RealisticSun";
import RealisticEarth from "./RealisticEarth";
import RealisticPlanet from "./RealisticPlanet";

const TEXTURE_BY_PLANET: Record<string, string> = {
  Mercury: PLANET_TEXTURES.mercury,
  Venus: PLANET_TEXTURES.venus,
  Mars: PLANET_TEXTURES.mars,
  Jupiter: PLANET_TEXTURES.jupiter,
  Saturn: PLANET_TEXTURES.saturn,
};

function OrbitPath({ radius }: { radius: number }) {
  const points: [number, number, number][] = [];
  for (let i = 0; i <= 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    points.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
  }
  return (
    <Line
      points={points}
      color="#6a7a9a"
      transparent
      opacity={0.04}
      lineWidth={0.5}
    />
  );
}

function PlanetNode({ config }: { config: (typeof PLANETS)[0] }) {
  if (config.name === "Earth") {
    return (
      <Suspense fallback={null}>
        <RealisticEarth config={config} />
      </Suspense>
    );
  }

  const url = TEXTURE_BY_PLANET[config.name];
  if (!url) return null;

  return (
    <Suspense fallback={null}>
      <RealisticPlanet
        config={config}
        mapUrl={url}
        ringUrl={
          config.hasRing ? PLANET_TEXTURES.saturnRing : undefined
        }
      />
    </Suspense>
  );
}

type SolarSystemProps = {
  activePlanet: string;
};

export default function SolarSystem({ activePlanet: _activePlanet }: SolarSystemProps) {
  const orbits = [...new Set(PLANETS.map((p) => p.orbit))];

  return (
    <>
      <Suspense fallback={null}>
        <SpaceEnvironment />
      </Suspense>
      <SceneLighting />
      {orbits.map((r) => (
        <OrbitPath key={r} radius={r} />
      ))}
      <Suspense fallback={null}>
        <RealisticSun />
        {PLANETS.map((p) => (
          <PlanetNode key={p.name} config={p} />
        ))}
      </Suspense>
    </>
  );
}
