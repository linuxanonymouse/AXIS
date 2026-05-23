"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PLANET_TEXTURES } from "@/lib/textures";
import { configureColorTexture } from "@/lib/configureTexture";
import { SUN_RADIUS } from "@/lib/solar";

export default function RealisticSun() {
  const map = useTexture(PLANET_TEXTURES.sun);
  const coronaRef = useRef<THREE.Mesh>(null);

  useMemo(() => configureColorTexture(map), [map]);

  useFrame((_, delta) => {
    if (coronaRef.current) coronaRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group>
      <pointLight
        intensity={22}
        color="#fff8ee"
        distance={450}
        decay={2}
        castShadow={false}
      />
      <pointLight
        intensity={8}
        color="#ffaa55"
        distance={180}
        decay={1.6}
      />

      <Sphere args={[SUN_RADIUS, 96, 96]}>
        <meshBasicMaterial map={map} toneMapped={false} />
      </Sphere>

      <mesh ref={coronaRef}>
        <sphereGeometry args={[SUN_RADIUS * 1.18, 48, 48]} />
        <meshBasicMaterial
          color="#ffcc88"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <Sphere args={[SUN_RADIUS * 1.55, 32, 32]}>
        <meshBasicMaterial
          color="#ff7722"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </Sphere>

      <Sphere args={[SUN_RADIUS * 2.4, 24, 24]}>
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
}
