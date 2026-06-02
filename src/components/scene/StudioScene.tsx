"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import {  Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function InfrastructureMatrix() {
  const masterGroupRef = useRef<THREE.Group>(null);
  
  // Create a massive grid of pillars
  const gridSize = 12;
  const pillars = useMemo(() => {
    const arr = [];
    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let z = -gridSize; z <= gridSize; z += 2) {
        // Distance from center determines height and delay
        const dist = Math.sqrt(x*x + z*z);
        // We only want some pillars to rise
        if (Math.random() > 0.3 && dist < 10) {
          arr.push({
            x,
            z,
            // Random target height between 1 and 8
            targetHeight: Math.random() * 6 + 2,
            // Pillars further out rise later
            delay: dist * 0.05 + Math.random() * 0.2,
            isGlass: Math.random() > 0.7
          });
        }
      }
    }
    return arr;
  }, []);

  const pillarRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
    const t = state.clock.elapsedTime;
    
    if (masterGroupRef.current) {
      // Very slow cinematic rotation
      masterGroupRef.current.rotation.y = t * 0.05;
    }

    // Animate pillars based on scroll
    pillars.forEach((pillar, i) => {
      const mesh = pillarRefs.current[i];
      if (mesh) {
        // Calculate progress for this specific pillar
        // It starts rising after its delay, and finishes within a window
        const progress = Math.max(0, Math.min(1, (scrollPercent * 1.5) - pillar.delay));
        
        // Use an easing function (easeOutCubic) for smooth rising
        const ease = 1 - Math.pow(1 - progress, 3);
        
        // Scale Y goes from 0.1 to targetHeight
        const currentHeight = 0.1 + ease * pillar.targetHeight;
        mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, currentHeight, 3, delta);
        
        // Position Y must be half of scale Y so the bottom stays on the floor
        mesh.position.y = mesh.scale.y / 2;
      }
    });
  });

  return (
    <group ref={masterGroupRef} position={[0, -5, 0]}>
      {/* The Dark Glass Floor */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        {/* Floor Grid Lines */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(40, 40, 20, 20)]} />
          <lineBasicMaterial attach="material" color="#CDA464" transparent opacity={0.2} />
        </lineSegments>
      </mesh>

      {/* The Rising Pillars */}
      {pillars.map((pillar, i) => (
        <mesh 
          key={i} 
          ref={(el) => {
            pillarRefs.current[i] = el;
          }} 
          position={[pillar.x, 0.05, pillar.z]} 
          scale={[1.5, 0.1, 1.5]}
        >
          <boxGeometry args={[1, 1, 1]} />
          {pillar.isGlass ? (
            <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#CDA464" />
          ) : (
            <meshPhysicalMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          )}
          {/* Golden Edges for solid pillars */}
          {!pillar.isGlass && (
            <lineSegments>
              <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
              <lineBasicMaterial attach="material" color="#CDA464" transparent opacity={0.5} />
            </lineSegments>
          )}
        </mesh>
      ))}
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
    
    // Start high up looking down, then swoop down into the city as it builds
    const targetY = 15 - scrollPercent * 10;
    const targetZ = 20 - scrollPercent * 5;
    
    const finalX = mouseRef.current.x * 5;
    const finalY = targetY + mouseRef.current.y * 2;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, finalX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, finalY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2, delta);
    
    const lookAtTarget = new THREE.Vector3(0, scrollPercent * 5, 0);
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    
    currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, lookAtTarget.x, 2, delta);
    currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, lookAtTarget.y, 2, delta);
    currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, lookAtTarget.z, 2, delta);
    
    state.camera.lookAt(currentLookAt);
  });

  return null;
}

export default function StudioScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} camera={{ position: [0, 15, 20], fov: 45 }} >
        <color attach="background" args={['#010204']} />
        <fog attach="fog" args={['#010204', 10, 40]} />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 0]} intensity={5} color="#CDA464" />
        <spotLight position={[10, 20, 10]} angle={0.8} penumbra={1} intensity={8} color="#ffffff" castShadow />
        
        <InfrastructureMatrix />

        <Stars radius={30} depth={50} count={1500} factor={2} saturation={0} fade speed={0.5} />
        <CinematicCamera />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

