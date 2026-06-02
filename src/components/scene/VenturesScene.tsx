"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import {  Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function GrowthMonoliths() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const monolithsRef = useRef<(THREE.Mesh | null)[]>([]);

  // Generate a staggered set of monoliths representing a growth chart
  const numColumns = 8;
  const numRows = 3;
  const monoliths = useMemo(() => {
    const arr = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numColumns; c++) {
        // Base exponential curve based on column index
        // Columns go from left (-X) to right (+X)
        const curve = Math.pow((c + 1) / numColumns, 2); 
        
        arr.push({
          x: (c - numColumns / 2) * 1.5,
          z: (r - numRows / 2) * 1.5,
          targetHeight: 2 + curve * 12 + Math.random() * 2, // Exponential height + random noise
          delay: (c / numColumns) * 0.5 + Math.random() * 0.2, // Rising left to right
          isGold: Math.random() > 0.8 || (c === numColumns - 1 && r === 1) // Force rightmost center to be pure gold
        });
      }
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
    const t = state.clock.elapsedTime;
    
    if (masterGroupRef.current) {
      // Very slow cinematic pan
      masterGroupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
    }

    monoliths.forEach((m, i) => {
      const mesh = monolithsRef.current[i];
      if (mesh) {
        // Monoliths rise based on scroll and delay
        const progress = Math.max(0, Math.min(1, (scrollPercent * 1.5) - m.delay));
        
        // Aggressive easing for impact (easeOutExpo)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        // Start almost flat, rise to target height
        const currentHeight = 0.2 + ease * m.targetHeight;
        mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, currentHeight, 3, delta);
        
        // Keep the base of the monolith on the floor
        mesh.position.y = mesh.scale.y / 2 - 5;
      }
    });
  });

  return (
    <group ref={masterGroupRef}>
      {/* Dark reflective floor beneath the monoliths */}
      <mesh position={[0, -5.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={1} roughness={0.05} />
      </mesh>

      {/* The Rising Monoliths */}
      {monoliths.map((m, i) => (
        <mesh 
          key={i} 
          ref={(el) => {
            monolithsRef.current[i] = el;
          }} 
          position={[m.x, -5, m.z]} 
          scale={[1, 0.2, 1]}
        >
          <boxGeometry args={[1.2, 1, 1.2]} />
          {m.isGold ? (
            <meshPhysicalMaterial color="#ffffff" emissive="#CDA464" emissiveIntensity={1} metalness={1} roughness={0.1} />
          ) : (
            <meshPhysicalMaterial color="#111" metalness={0.9} roughness={0.2} />
          )}
          
          {/* Edge highlights for all dark monoliths */}
          {!m.isGold && (
            <lineSegments>
              <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1.2, 1, 1.2)]} />
              <lineBasicMaterial attach="material" color="#CDA464" transparent opacity={0.3} />
            </lineSegments>
          )}
        </mesh>
      ))}

      {/* Glass Prism hovering above representing capital extraction */}
      <mesh position={[4, 8, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#CDA464" />
      </mesh>
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
    
    // Start low, pan up the exponential curve
    const targetY = -2 + scrollPercent * 10;
    const targetZ = 18 - scrollPercent * 4;
    
    // OFFSET CAMERA TO THE RIGHT:
    const baseOffsetX = 3;
    
    const finalX = baseOffsetX + mouseRef.current.x * 3;
    const finalY = targetY + mouseRef.current.y * 2;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, finalX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, finalY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2, delta);
    
    // Look at the monoliths
    const lookAtTarget = new THREE.Vector3(baseOffsetX, targetY - 2, 0);
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    
    currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, lookAtTarget.x, 2, delta);
    currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, lookAtTarget.y, 2, delta);
    currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, lookAtTarget.z, 2, delta);
    
    state.camera.lookAt(currentLookAt);
  });

  return null;
}

export default function VenturesScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} camera={{ position: [3, -2, 18], fov: 45 }} >
        <color attach="background" args={['#010204']} />
        <fog attach="fog" args={['#010204', 10, 40]} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 20, 10]} angle={0.8} penumbra={1} intensity={5} color="#ffffff" castShadow />
        <pointLight position={[5, 10, 5]} intensity={3} color="#CDA464" />
        
        {/* Scale up so it dominates the right side */}
        <group scale={[1.1, 1.1, 1.1]} position={[-2, 0, 0]}>
          <GrowthMonoliths />
        </group>

        <Stars radius={30} depth={50} count={1500} factor={2} saturation={0} fade speed={0.5} />
        <CinematicCamera />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

