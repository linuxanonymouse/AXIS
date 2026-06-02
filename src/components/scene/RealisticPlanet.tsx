"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Ring, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { configureColorTexture } from "@/lib/configureTexture";
import {
  getPlanetPosition,
  type PlanetConfig} from "@/lib/solar";

type RealisticPlanetProps = {
  config: PlanetConfig;
  mapUrl: string;
  ringUrl?: string;
};

export default function RealisticPlanet({
  config,
  mapUrl,
  ringUrl}: RealisticPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const maps = useTexture(ringUrl ? [mapUrl, ringUrl] : [mapUrl]);
  const map = maps[0];
  const ringMap = ringUrl ? maps[1] : null;
  const useRingTex = ringMap && ringMap.image && ringMap.image.width > 64;

  useMemo(() => {
    configureColorTexture(map);
    if (ringMap) configureColorTexture(ringMap);
  }, [map, ringMap]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const [x, y, z] = getPlanetPosition(
      config.orbit,
      config.showcaseAngle,
      0.1
    );
    groupRef.current.position.set(x, y, z);
    spin.current += delta * (config.name === "Jupiter" ? 0.14 : 0.08);
    groupRef.current.rotation.y = spin.current;
  });

  const segments =
    config.name === "Jupiter" || config.name === "Saturn" ? 128 : 96;
  const r = config.radius;

  return (
    <group ref={groupRef}>
      <Sphere args={[r, segments, segments]}>
        <meshStandardMaterial
          map={map}
          color="#ffffff"
          roughness={0.95}
          metalness={0}
        />
      </Sphere>

      {config.atmosphere && (
        <Sphere args={[r * 1.015, 72, 72]}>
          <meshBasicMaterial
            color={config.atmosphere}
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </Sphere>
      )}

      {config.hasRing && (
        <Ring
          args={[r * 1.4, r * 2.3, 256]}
          rotation-x={Math.PI / 2.12}
        >
          <meshStandardMaterial
            map={useRingTex ? ringMap! : undefined}
            color="#d8ccb8"
            transparent
            opacity={useRingTex ? 0.88 : 0.55}
            side={THREE.DoubleSide}
            depthWrite={false}
            roughness={0.9}
            metalness={0}
          />
        </Ring>
      )}
    </group>
  );
}
