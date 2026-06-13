"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import {  Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function ProcessingCore() {
  const outerWireframeRef = useRef<THREE.Group>(null);
  const middleGlassRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const isSpeakingRef = useRef(false);
  const speakStateRef = useRef(0);

  useEffect(() => {
    const handleState = (e: any) => {
      isSpeakingRef.current = e.detail?.isSpeaking || false;
    };
    window.addEventListener("jarvis-state", handleState);
    return () => window.removeEventListener("jarvis-state", handleState);
  }, []);
  
  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
    const t = state.clock.elapsedTime;
    
    // Base floating motion
    const floatY = Math.sin(t * 1.5) * 0.2;
    
    // Smoothly transition the speaking state
    speakStateRef.current = THREE.MathUtils.damp(speakStateRef.current, isSpeakingRef.current ? 1 : 0, 3, delta);
    const speakVal = speakStateRef.current;

    if (outerWireframeRef.current) {
      // Spins slightly faster when speaking smoothly
      const spinSpeed = 0.2 + scrollPercent * 2 + speakVal * 0.5;
      outerWireframeRef.current.rotation.y += spinSpeed * delta;
      outerWireframeRef.current.rotation.z += spinSpeed * 0.5 * delta;
      
      // Wireframe expands slightly when speaking
      const wireScale = 1 + (speakVal * 0.05);
      outerWireframeRef.current.scale.setScalar(wireScale);
      outerWireframeRef.current.position.y = floatY;
    }
    
    if (middleGlassRef.current) {
      middleGlassRef.current.rotation.y -= (0.3 + speakVal * 0.2) * delta;
      middleGlassRef.current.rotation.x = Math.sin(t) * 0.2;
      middleGlassRef.current.position.y = floatY;
    }
    
    if (coreRef.current) {
      // Core pulses with "processing power" as you scroll and slightly swells when speaking
      const pulseScale = 1 + Math.sin(t * (5 + scrollPercent * 10)) * 0.05 + scrollPercent * 0.2 + (speakVal * 0.1);
      coreRef.current.scale.setScalar(pulseScale);
      
      // Smoothly transition emissive intensity
      if ((coreRef.current.material as any).emissiveIntensity !== undefined) {
        (coreRef.current.material as any).emissiveIntensity = 2 + (speakVal * 1.5);
      }
      
      coreRef.current.rotation.y += (1.0 + speakVal * 0.5) * delta;
      coreRef.current.position.y = floatY;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Intense Core Light */}
      <pointLight color="#CDA464" intensity={8} distance={20} />
      
      {/* Solid Glowing Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#CDA464" emissiveIntensity={2} roughness={0.1} />
      </mesh>

      {/* Middle Glass Shell */}
      <mesh ref={middleGlassRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color="#ffffff" />
      </mesh>

      {/* Outer Data Wireframe */}
      <group ref={outerWireframeRef}>
        <mesh>
          <icosahedronGeometry args={[3.5, 2]} />
          <meshBasicMaterial color="#CDA464" wireframe transparent opacity={0.3} />
        </mesh>
        {/* Nodes at the vertices */}
        <points>
          <icosahedronGeometry args={[3.5, 2]} />
          <pointsMaterial color="#ffffff" size={0.05} />
        </points>
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
    
    // Zoom in dramatically as you scroll
    const targetZ = 15 - scrollPercent * 5;
    
    // Smooth mouse parallax
    const finalX = mouseRef.current.x * 3;
    const finalY = mouseRef.current.y * 3;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, finalX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, finalY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2, delta);
    
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function IntelligenceScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} camera={{ position: [0, 0, 15], fov: 45 }} >
        <color attach="background" args={['#010204']} />
        <fog attach="fog" args={['#010204', 8, 30]} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={5} color="#ffffff" castShadow />
        
        <ProcessingCore />

        <Stars radius={20} depth={50} count={1500} factor={3} saturation={0} fade speed={1.0} />
        <CinematicCamera />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

