"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {  Float, Stars,  Environment, Html , MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, useMotionValue } from "framer-motion";
import EcosystemGraph from "../overview/EcosystemGraph";

const getScrollRatio = (scrollY: number) => {
  if (typeof document === "undefined") return 0;
  const sections = document.querySelectorAll('.overview-section');
  if (sections.length === 6) {
    let currentIdx = 0;
    let prevTop = 0;
    let nextTop = window.innerHeight;
    
    for (let i = 0; i < sections.length; i++) {
      const el = sections[i] as HTMLElement;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      
      if (scrollY >= top && scrollY < top + height) {
        currentIdx = i;
        prevTop = top;
        nextTop = top + height;
        break;
      } else if (i === sections.length - 1 && scrollY >= top + height) {
        currentIdx = i;
        prevTop = top;
        nextTop = top + height;
      }
    }
    
    const localProgress = (scrollY - prevTop) / Math.max(1, nextTop - prevTop);
    return Math.min(5, Math.max(0, currentIdx + localProgress));
  }
  
  let vh = window.innerHeight;
  const el = document.getElementById('axis-dvh-ref');
  if (el) vh = el.clientHeight || vh;
  return Math.min(5, Math.max(0, scrollY / vh));
};

function CinematicCamera() {
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const rawSectionFloat = getScrollRatio(scrollY);
    
    // Smooth the scroll value itself using THREE.MathUtils.damp to prevent stutter
    if (state.camera.userData.smoothedFloat === undefined) {
      state.camera.userData.smoothedFloat = rawSectionFloat;
    }
    state.camera.userData.smoothedFloat = THREE.MathUtils.damp(state.camera.userData.smoothedFloat, rawSectionFloat, 4, delta);
    
    const sectionFloat = state.camera.userData.smoothedFloat;
    
    // Determine the two indices to interpolate between
    const lowerIndex = Math.min(5, Math.floor(sectionFloat));
    const upperIndex = Math.min(5, lowerIndex + 1);
    const p = sectionFloat - lowerIndex;

    const cameraTargets = [
      { pos: [0, 1.2, 7.5], lookAt: [0, -1.0, -0.5] }, // Hero (0)
      { pos: [-0.5, 0.8, 6.0], lookAt: [-1.0, -0.1, -0.5] }, // Is (1)
      { pos: [0.5, 0.8, 6.0], lookAt: [1.0, -0.1, -0.5] }, // Is Not (2)
      { pos: [0, -0.5, 4.0], lookAt: [0, -0.5, -1.0] }, // Panels (3)
      { pos: [0, 0, 5.5], lookAt: [0, 0, 0] }, // Ecosystem (4)
      { pos: [0, 2.5, 8.0], lookAt: [0, 0, -2.0] }, // Final CTA (5)
    ];

    const c1 = cameraTargets[lowerIndex];
    const c2 = cameraTargets[upperIndex];

    const targetPos = new THREE.Vector3(
      THREE.MathUtils.lerp(c1.pos[0], c2.pos[0], p),
      THREE.MathUtils.lerp(c1.pos[1], c2.pos[1], p),
      THREE.MathUtils.lerp(c1.pos[2], c2.pos[2], p)
    );

    const targetLookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(c1.lookAt[0], c2.lookAt[0], p),
      THREE.MathUtils.lerp(c1.lookAt[1], c2.lookAt[1], p),
      THREE.MathUtils.lerp(c1.lookAt[2], c2.lookAt[2], p)
    );

    // Add subtle mouse parallax
    targetPos.x += mouseRef.current.x * 0.15;
    targetPos.y += mouseRef.current.y * 0.15;

    // Smoothly apply position (moderate damping for smoother motion)
    const dampingFactor = 2.5; // balanced smoothness and responsiveness
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetPos.x, dampingFactor, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetPos.y, dampingFactor, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetPos.z, dampingFactor, delta);
    
    // Damping lookAt with same factor
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, targetLookAt.x, dampingFactor, delta);
    currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, targetLookAt.y, dampingFactor, delta);
    currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, targetLookAt.z, dampingFactor, delta);
    state.camera.lookAt(currentLookAt);
  });

  return null;
}

function FloatingGeometries() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.1 + i * 0.05);
        child.rotation.z = t * (0.1 + i * 0.05);
        child.position.y += Math.sin(t * 1.5 + i) * 0.005;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 15 }).map((_, i) => {
        const radius = 3 + Math.random() * 10;
        const angle = (i / 15) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 10;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <octahedronGeometry args={[0.1 + Math.random() * 0.3, 0]} />
            <meshStandardMaterial 
              color={Math.random() > 0.3 ? "#CDA464" : "#222222"}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ArchitecturalGrid() {
  const bottomGridRef = useRef<THREE.GridHelper>(null);
  const topGridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.3;
    if (bottomGridRef.current) {
      bottomGridRef.current.position.z = t % 2;
    }
    if (topGridRef.current) {
      topGridRef.current.position.z = t % 2;
    }
  });

  return (
    <group>
      <group position={[0, -2.5, 0]}>
        <gridHelper
          ref={bottomGridRef}
          args={[120, 60, 0xCDA464, 0x222222]}
          position={[0, 0, 0]}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[120, 120]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.65} />
        </mesh>
      </group>

      <group position={[0, 3.5, 0]}>
        <gridHelper
          ref={topGridRef}
          args={[120, 60, 0xCDA464, 0x222222]}
          position={[0, 0, 0]}
        />
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[120, 120]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    }
  });

  return (
    <Stars
      ref={particlesRef}
      radius={25}
      depth={60}
      count={1500}
      factor={4}
      saturation={0.5}
      fade
      speed={1.5}
    />
  );
}

function FloatingDataShards() {
  const shardsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shardsRef.current) {
      shardsRef.current.rotation.y = t * 0.015;
      shardsRef.current.position.y = Math.sin(t * 0.08) * 0.15;
      
      shardsRef.current.children.forEach((child, idx) => {
        child.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
        child.rotation.y += 0.002 * (idx % 3 === 0 ? 1 : -1);
      });
    }
  });

  const shardPositions: [number, number, number][] = [
    [-4, 2, -2],
    [5, -2, -3],
    [-3.5, -1.5, 1],
    [4, 2.5, -1],
    [-5.5, 0, -4],
    [5.5, 1.5, 2],
    [2, 3, -5],
    [-2, -3, -3],
  ];

  return (
    <group ref={shardsRef}>
      {shardPositions.map((pos, idx) => {
        const size = 0.12 + (idx % 3) * 0.06;
        return (
          <mesh key={idx} position={pos}>
            <tetrahedronGeometry args={[size]} />
            <meshStandardMaterial
              color="#CDA464"
              emissive="#CDA464"
              emissiveIntensity={2.5}
              roughness={0.15}
              metalness={0.85}
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function AxisCore({ showGraph = false }: { showGraph?: boolean }) {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringSepRef = useRef(0);
  
  const [isActiveGraph, setIsActiveGraph] = useState(false);
  const graphProgress = useMotionValue(0);

  // Rotation accumulators (to resume spinning smoothly without jumps)
  const coreRotY = useRef(0);
  const ring1RotY = useRef(0);
  const ring1RotX = useRef(0);
  const ring2RotY = useRef(0);
  const ring2RotZ = useRef(0);
  const ring3RotY = useRef(0);
  const ring3RotX = useRef(0);
  const innerCoreRotY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollRatio = getScrollRatio(scrollY);
    
    // Graph activates strictly when user is scrolling near the ecosystem section (4.5)
    // We open it a bit early so it animates in as they scroll down
    const isEcosystemActive = scrollRatio >= 3.8 && scrollRatio <= 5.2;
    if (isEcosystemActive !== isActiveGraph) {
      setIsActiveGraph(isEcosystemActive);
    }

    // Interactive freeze factor based purely on scroll distance from 4.5
    let targetFreeze = 0;
    if (scrollRatio > 4.0 && scrollRatio < 5.0) {
       // Peaks at 1.0 exactly at 4.5
       targetFreeze = 1.0 - (Math.abs(scrollRatio - 4.5) * 2.0);
    }
    targetFreeze = Math.max(0, Math.min(1, targetFreeze));
    
    // Update the framer-motion value without re-rendering React
    graphProgress.set(targetFreeze);
    
    const amp = 1.0 - targetFreeze;
    const rawSectionFloat = Math.min(5, Math.max(0, scrollRatio));
    
    if (coreRef.current && coreRef.current.userData.smoothedFloat === undefined) {
      coreRef.current.userData.smoothedFloat = rawSectionFloat;
    }
    if (coreRef.current) {
      coreRef.current.userData.smoothedFloat = THREE.MathUtils.damp(coreRef.current.userData.smoothedFloat, rawSectionFloat, 4, delta);
      
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
      const targetScale = isMobile ? 0.6 : 1.0;
      coreRef.current.scale.set(targetScale, targetScale, targetScale);
    }
    const sectionFloat = coreRef.current ? coreRef.current.userData.smoothedFloat : rawSectionFloat;
    
    const lowerIndex = Math.min(5, Math.floor(sectionFloat));
    const upperIndex = Math.min(5, lowerIndex + 1);
    const p = sectionFloat - lowerIndex;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const ecosystemY = isMobile ? 0.35 : 0;

    const coreTargets = [
      { pos: [0, -0.1, -1.2], sep: 0.0 }, // Hero (0)
      { pos: [-2.5, -0.1, -1.2], sep: 1.0 }, // Is (1)
      { pos: [2.5, 0.4, 0.8], sep: 1.0 }, // Is Not (2)
      { pos: [0, -0.4, -1.5], sep: 1.0 }, // Panels (3)
      { pos: [0, ecosystemY, 0], sep: 1.0 }, // Ecosystem (4)
      { pos: [0, ecosystemY, 0], sep: 1.0 }, // Final CTA (5)
    ];

    const c1 = coreTargets[lowerIndex];
    const c2 = coreTargets[upperIndex];

    const targetPos = new THREE.Vector3(
      THREE.MathUtils.lerp(c1.pos[0], c2.pos[0], p),
      THREE.MathUtils.lerp(c1.pos[1], c2.pos[1], p),
      THREE.MathUtils.lerp(c1.pos[2], c2.pos[2], p)
    );

    const targetRingSepLimit = THREE.MathUtils.lerp(c1.sep, c2.sep, p);
    
    targetPos.x += mouseRef.current.x * 0.3 * amp;
    targetPos.y += mouseRef.current.y * 0.3 * amp;

    const t = state.clock.getElapsedTime();

    coreRotY.current += delta * 0.08 * amp;
    ring1RotY.current += delta * 0.15 * amp;
    ring1RotX.current += delta * 0.08 * amp;
    ring2RotY.current += delta * 0.12 * amp;
    ring2RotZ.current += delta * 0.06 * amp;
    ring3RotY.current += delta * 0.20 * amp;
    ring3RotX.current += delta * 0.10 * amp;
    innerCoreRotY.current += delta * 0.25 * amp;

    if (coreRef.current) {
      coreRef.current.position.x = THREE.MathUtils.damp(coreRef.current.position.x, targetPos.x * amp, 4, delta);
      coreRef.current.position.y = THREE.MathUtils.damp(coreRef.current.position.y, targetPos.y * amp, 4, delta);
      coreRef.current.position.z = THREE.MathUtils.damp(coreRef.current.position.z, targetPos.z * amp, 4, delta);
      
      const targetCoreRotX = Math.sin(t * 0.15) * 0.08 * amp;
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRotY.current, 0, targetFreeze);
      coreRef.current.rotation.x = THREE.MathUtils.lerp(targetCoreRotX, 0, targetFreeze);
    }

    ringSepRef.current = THREE.MathUtils.damp(ringSepRef.current, targetRingSepLimit, 4, delta);
    const ringSep = ringSepRef.current * amp;
    
    if (ring1Ref.current) {
      ring1Ref.current.position.y = ringSep * 0.55;
      ring1Ref.current.rotation.y = THREE.MathUtils.lerp(ring1RotY.current, 0, targetFreeze);
      ring1Ref.current.rotation.x = THREE.MathUtils.lerp(ring1RotX.current, 0, targetFreeze);
    }
    if (ring2Ref.current) {
      ring2Ref.current.position.y = 0;
      ring2Ref.current.rotation.y = THREE.MathUtils.lerp(ring2RotY.current, 0, targetFreeze);
      ring2Ref.current.rotation.z = THREE.MathUtils.lerp(ring2RotZ.current, 0, targetFreeze);
    }
    if (ring3Ref.current) {
      ring3Ref.current.position.y = -ringSep * 0.55;
      ring3Ref.current.rotation.y = THREE.MathUtils.lerp(ring3RotY.current, 0, targetFreeze);
      ring3Ref.current.rotation.x = THREE.MathUtils.lerp(ring3RotX.current, 0, targetFreeze);
    }

    if (innerCoreRef.current) {
      const targetInnerCorePosY = Math.sin(t * 2.5) * 0.15 * amp;
      innerCoreRef.current.position.y = THREE.MathUtils.lerp(targetInnerCorePosY, 0, targetFreeze);
      innerCoreRef.current.rotation.y = THREE.MathUtils.lerp(innerCoreRotY.current, 0, targetFreeze);
      
      const targetInnerCoreRotX = Math.sin(t * 0.8) * 0.1 * amp;
      innerCoreRef.current.rotation.x = THREE.MathUtils.lerp(targetInnerCoreRotX, 0, targetFreeze);
    }
  });

  return (
    <group ref={coreRef}>
      <pointLight color="#CDA464" intensity={6} distance={8} />
      <group>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.2, 0.06, 16, 64]} />
          <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#F2E8C6" />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.45, 0.06, 16, 64]} />
          <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#CDA464" />
        </mesh>
        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.1, 0.06, 16, 64]} />
          <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#EFEFEF" />
        </mesh>
      </group>

      {/* Crystalline Core Monolith */}
      <group ref={innerCoreRef}>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.42]} />
          <meshPhysicalMaterial
            color="#CDA464"
            emissive="#CDA464"
            emissiveIntensity={3.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Core Wireframe Outer Cage */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.12}>
          <octahedronGeometry args={[0.42]} />
          <meshBasicMaterial
            color="#FFFFFF"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      {showGraph && (
        <Html center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: isActiveGraph ? 'auto' : 'none' }}>
            <EcosystemGraph isActive={isActiveGraph} progress={graphProgress} centerLayout={true} />
          </div>
        </Html>
      )}
    </group>
  );
}

function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#CDA464" />
      <directionalLight position={[10, 10, 5]} intensity={1.0} color="#F2E8C6" />
      <spotLight
        position={[0, 6, 0]}
        angle={1.0}
        penumbra={1}
        intensity={4}
        color="#CDA464"
        castShadow
      />
      <fog attach="fog" args={["#000000", 3, 22]} />
    </>
  );
}

export default function CinematicScene({ showGraph = false }: { showGraph?: boolean }) {


  return (
    <div className="scene-bg">
      <Canvas
        style={{ pointerEvents: 'none' }}
        dpr={1}
        
        camera={{ position: [0, 1.2, 7.5], fov: 45 }}
      >
        <CinematicCamera />
        <CinematicLighting />
        {/* Environment removed to avoid HDR fetch errors */}

        {/* --- SCENE OBJECTS --- */}
        <ArchitecturalGrid />
        <FloatingGeometries />
        <FloatingParticles />
        <FloatingDataShards />
        <AxisCore showGraph={showGraph} />
        <EffectComposer>
          <Bloom luminanceThreshold={1.2} mipmapBlur resolutionX={512} resolutionY={512} intensity={1.5} />
        </EffectComposer>
      </Canvas>
      <div className="scene-vignette" />
    </div>
  );
}











