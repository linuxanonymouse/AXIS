"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { SPACE_TEXTURES } from "@/lib/textures";
import { configureColorTexture } from "@/lib/configureTexture";

const SKY_RADIUS = 480;

export default function SpaceEnvironment() {
  const milkyWay = useTexture(SPACE_TEXTURES.milkyWay);
  const groupRef = useRef<THREE.Group>(null);

  useMemo(() => {
    configureColorTexture(milkyWay);
    milkyWay.wrapS = milkyWay.wrapT = THREE.RepeatWrapping;
  }, [milkyWay]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.008;
  });

  return (
    <group ref={groupRef}>
      {/* Deep space gradient fill */}
      <mesh scale={[-SKY_RADIUS * 1.02, SKY_RADIUS * 1.02, SKY_RADIUS * 1.02]} frustumCulled={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#020208" side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Milky Way panorama */}
      <mesh scale={[-SKY_RADIUS, SKY_RADIUS, SKY_RADIUS]} frustumCulled={false}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshBasicMaterial
          map={milkyWay}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped={false}
          opacity={0.92}
          transparent
        />
      </mesh>

      {/* Star layers — dense deep field */}
      <Stars
        radius={320}
        depth={120}
        count={45000}
        factor={3.2}
        saturation={0.05}
        fade
        speed={0.2}
      />
      <Stars
        radius={200}
        depth={60}
        count={12000}
        factor={6}
        saturation={0}
        fade={false}
        speed={0}
      />

      <Sparkles
        count={800}
        scale={140}
        size={2.5}
        speed={0.15}
        opacity={0.35}
        color="#ffffff"
      />

      {/* Subtle dust/nebula haze */}
      <mesh position={[40, 12, -80]} scale={[120, 80, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#1a2848"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-60, -20, -100]} scale={[100, 60, 1]} rotation-z={0.4}>
        <planeGeometry />
        <meshBasicMaterial
          color="#2a1840"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
