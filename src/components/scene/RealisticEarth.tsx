"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PLANET_TEXTURES } from "@/lib/textures";
import { configureColorTexture } from "@/lib/configureTexture";
import {
  getPlanetPosition,
  type PlanetConfig} from "@/lib/solar";

type RealisticEarthProps = {
  config: PlanetConfig;
};

export default function RealisticEarth({ config }: RealisticEarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const spin = useRef(0);

  const [dayMap, moonMap] = useTexture([
    PLANET_TEXTURES.earth.day,
    PLANET_TEXTURES.moon,
  ]);

  useMemo(() => {
    configureColorTexture(dayMap);
    configureColorTexture(moonMap);
  }, [dayMap, moonMap]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const [x, y, z] = getPlanetPosition(
      config.orbit,
      config.showcaseAngle,
      0.1
    );
    groupRef.current.position.set(x, y, z);
    spin.current += delta * 0.05;
    groupRef.current.rotation.y = spin.current;

    if (moonRef.current) {
      const m = spin.current * 1.5;
      moonRef.current.position.set(
        Math.cos(m) * config.radius * 2.4,
        0.04,
        Math.sin(m) * config.radius * 2.4
      );
    }
  });

  const r = config.radius;

  return (
    <group ref={groupRef}>
      <Sphere args={[r, 96, 96]} renderOrder={0}>
        <meshStandardMaterial
          map={dayMap}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />
      </Sphere>

      <Sphere args={[r * 1.012, 64, 64]} renderOrder={1}>
        <meshBasicMaterial
          color="#7eb8ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>

      <mesh ref={moonRef} renderOrder={2}>
        <sphereGeometry args={[r * 0.27, 40, 40]} />
        <meshStandardMaterial
          map={moonMap}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
