"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import {  Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function AxisCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Group>(null);
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
    const t = state.clock.getElapsedTime();
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));

    // Base rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      coreRef.current.position.y = Math.sin(t * 0.5) * 0.1 - scrollPercent * 2;
      coreRef.current.position.z = scrollPercent * -2;
      
      coreRef.current.position.x += (mouseRef.current.x * 0.3 - coreRef.current.position.x) * 0.05;
      coreRef.current.position.y += (mouseRef.current.y * 0.3 - coreRef.current.position.y) * 0.05;
    }

    // Rotating Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += delta * 0.15;
      ring1Ref.current.rotation.x += delta * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.12;
      ring2Ref.current.rotation.z += delta * 0.06;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.20;
      ring3Ref.current.rotation.x += delta * 0.10;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.position.y = Math.sin(t * 2.5) * 0.15;
      innerCoreRef.current.rotation.y += delta * 0.25;
      innerCoreRef.current.rotation.x = Math.sin(t * 0.8) * 0.1;
    }
  });

  return (
    <group ref={coreRef}>
      <pointLight color="#CDA464" intensity={6} distance={8} />
      <group>
        <mesh ref={ring1Ref} position={[0, 0.55, 0]}>
          <torusGeometry args={[1.2, 0.06, 16, 64]} />
          <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#F2E8C6" />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.45, 0.06, 16, 64]} />
          <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#CDA464" />
        </mesh>
        <mesh ref={ring3Ref} position={[0, -0.55, 0]}>
          <torusGeometry args={[1.1, 0.06, 16, 64]} />
          <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#EFEFEF" />
        </mesh>
      </group>

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
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.12}>
          <octahedronGeometry args={[0.42]} />
          <meshBasicMaterial color="#FFFFFF" wireframe transparent opacity={0.18} />
        </mesh>
      </group>
    </group>
  );
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
      {Array.from({ length: 30 }).map((_, i) => {
        const radius = 3 + Math.random() * 10;
        const angle = (i / 30) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 10;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <octahedronGeometry args={[0.1 + Math.random() * 0.3, 0]} />
            <meshPhysicalMaterial 
              color={Math.random() > 0.3 ? "#CDA464" : "#222222"}
              metalness={1.0}
              roughness={0.1}
              envMapIntensity={2.5}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#CDA464" />
      <directionalLight position={[10, 10, 5]} intensity={1.0} color="#F2E8C6" />
      <spotLight position={[0, 6, 0]} angle={1.0} penumbra={1} intensity={4} color="#CDA464" castShadow />
      <fog attach="fog" args={["#010204", 3, 22]} />
    </>
  );
}

export default function AxisRingsScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} 
        
        camera={{ position: [0, 0, 5.5], fov: 45 }}
      >
        <color attach="background" args={['#010204']} />
        <CinematicLighting />
        <AxisCore />
        <FloatingGeometries />
        <Stars radius={25} depth={60} count={1500} factor={4} saturation={0.5} fade speed={1.5} />
        <EffectComposer>
          <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

