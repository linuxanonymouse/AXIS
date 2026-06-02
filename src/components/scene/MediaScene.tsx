"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import {  Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function TransmissionObelisk() {
  const spireRef = useRef<THREE.Mesh>(null);
  const shockwavesGroupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  const numWaves = 4;
  const shockwaves = useMemo(() => {
    const arr = [];
    for (let i = 0; i < numWaves; i++) {
      arr.push({ delay: i * 0.25 });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
    const t = state.clock.elapsedTime;
    
    if (spireRef.current) {
      // The massive spire rotates slowly and ominously
      spireRef.current.rotation.y = t * 0.1;
      // It physically elevates as you scroll
      spireRef.current.position.y = THREE.MathUtils.lerp(-5, 0, scrollPercent);
    }

    if (shockwavesGroupRef.current) {
      shockwavesGroupRef.current.children.forEach((wave, i) => {
        const sw = shockwaves[i];
        // Time-based expanding rings
        let progress = (t * 0.5 + sw.delay) % 1.0; 
        
        // As you scroll, the rings expand faster and larger
        const speedMultiplier = 1 + scrollPercent * 3;
        progress = (t * 0.5 * speedMultiplier + sw.delay) % 1.0;
        
        // Scale from 1 to 20
        const scale = 1 + progress * 20;
        wave.scale.set(scale, 1, scale);
        
        // Opacity fades out as it gets larger
        const mesh = wave as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = (1.0 - progress) * 0.8 * (0.2 + scrollPercent * 0.8);
        
        // Move with the spire
        wave.position.y = THREE.MathUtils.lerp(-5, 0, scrollPercent);
      });
    }

    if (coreLightRef.current) {
      // Pulse the central light
      coreLightRef.current.intensity = 5 + Math.sin(t * 5) * 2 + scrollPercent * 10;
    }
  });

  return (
    <group>
      {/* The Central Light Core */}
      <pointLight ref={coreLightRef} color="#CDA464" intensity={5} distance={30} position={[0, 0, 0]} />

      {/* The Massive Black Glass Spire */}
      <mesh ref={spireRef} position={[0, -5, 0]}>
        <cylinderGeometry args={[0, 3, 20, 3]} /> {/* Triangular tapering obelisk */}
        <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#050505" />
        
        {/* Golden Edges to make it strictly corporate and defined */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.CylinderGeometry(0, 3, 20, 3)]} />
          <lineBasicMaterial attach="material" color="#CDA464" transparent opacity={0.5} />
        </lineSegments>
      </mesh>

      {/* The Emitting Shockwaves */}
      <group ref={shockwavesGroupRef}>
        {shockwaves.map((_, i) => (
          <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.05, 16, 64]} />
            <meshBasicMaterial color="#CDA464" transparent opacity={0} blending={THREE.AdditiveBlending} />
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
    
    // PERFECTLY CENTERED CAMERA
    const targetZ = 15 - scrollPercent * 5;
    const targetY = scrollPercent * 8;
    
    const finalX = mouseRef.current.x * 2;
    const finalY = targetY + mouseRef.current.y * 2;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, finalX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, finalY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2, delta);
    
    const lookAtTarget = new THREE.Vector3(0, targetY, 0);
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    
    currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, lookAtTarget.x, 2, delta);
    currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, lookAtTarget.y, 2, delta);
    currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, lookAtTarget.z, 2, delta);
    
    state.camera.lookAt(currentLookAt);
  });

  return null;
}

export default function MediaScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} camera={{ position: [0, 0, 15], fov: 45 }} >
        <color attach="background" args={['#010204']} />
        <fog attach="fog" args={['#010204', 5, 30]} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 20, 10]} angle={0.8} penumbra={1} intensity={5} color="#ffffff" castShadow />
        <pointLight position={[-10, 0, 10]} intensity={2} color="#CDA464" />
        
        {/* Perfectly centered, scaled up slightly */}
        <group scale={[1.2, 1.2, 1.2]}>
          <TransmissionObelisk />
        </group>

        <Stars radius={30} depth={50} count={1500} factor={2} saturation={0} fade speed={0.5} />
        <CinematicCamera />

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={3.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

