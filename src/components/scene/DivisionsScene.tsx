"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import {  Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function AstrolabeCore() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create many delicate rings
  const rings = useMemo(() => {
    const arr = [];
    const colors = ["#CDA464", "#ffffff", "#4A90E2", "#9b59b6", "#2ecc71"];
    for (let i = 0; i < 15; i++) {
      arr.push({
        radius: 3 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        speedZ: (Math.random() - 0.5) * 0.2,
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        thickness: Math.random() > 0.8 ? 0.02 : 0.005,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    return arr;
  }, []);

  const particlesRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        angle: Math.random() * Math.PI * 2,
        radius: 2 + Math.random() * 6,
        speed: (Math.random() - 0.5) * 0.5,
        yOffset: (Math.random() - 0.5) * 4});
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.05 * delta;
      groupRef.current.rotation.x += 0.02 * delta;
      
      groupRef.current.children.forEach((child, i) => {
        if (i < rings.length) {
          child.rotation.x += rings[i].speedX * delta;
          child.rotation.y += rings[i].speedY * delta;
          child.rotation.z += rings[i].speedZ * delta;
        }
      });
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.1 * delta;
      particlesRef.current.children.forEach((child, i) => {
        const p = particles[i];
        p.angle += p.speed * delta;
        child.position.x = Math.cos(p.angle) * p.radius;
        child.position.z = Math.sin(p.angle) * p.radius;
      });
    }
  });

  return (
    <group>
      {/* Central Prism */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#ffffff" />
      </mesh>
      
      <mesh scale={1.1}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#CDA464" wireframe transparent opacity={0.2} />
      </mesh>

      <group ref={groupRef}>
        {rings.map((ring, i) => (
          <mesh key={i} rotation={ring.rot}>
            <torusGeometry args={[ring.radius, ring.thickness, 16, 100]} />
            <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
          </mesh>
        ))}
      </group>

      <group ref={particlesRef}>
        {particles.map((p, i) => (
          <mesh key={i} position={[Math.cos(p.angle) * p.radius, p.yOffset, Math.sin(p.angle) * p.radius]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

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
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    // Zoom in slightly as you scroll
    const radius = 12 - scrollPercent * 4;
    const targetY = scrollPercent * -2;
    
    const finalX = mouseRef.current.x * 2;
    const finalY = targetY + mouseRef.current.y * 1;
    const finalZ = radius;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, finalX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, finalY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, finalZ, 2, delta);
    
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function DivisionsScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#020305', pointerEvents: 'none' }}>
      <Canvas dpr={1} camera={{ position: [0, 0, 12], fov: 45 }} >
        <color attach="background" args={['#020305']} />
        <fog attach="fog" args={['#020305', 8, 25]} />
        
        <AstrolabeCore />

        <Stars radius={20} depth={50} count={1500} factor={2} saturation={0} fade speed={1} />
        <CinematicCamera />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

