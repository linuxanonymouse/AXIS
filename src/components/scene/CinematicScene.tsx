"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Float, Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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

  useFrame((state) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const docHeight = typeof document !== "undefined" ? (document.documentElement.scrollHeight - window.innerHeight) : 1;
    const scrollProgress = scrollY / Math.max(1, docHeight);

    // Let's create beautiful cinematic camera positions:
    // Scroll progress moves from 0 to 1
    // Section 1 (Hero): Camera starts at [0, 1.2, 7.5]
    // Section 2 (Split): Camera moves to [-2.2, 0.6, 5.2] (pans left, looking right)
    // Section 3 (Clarity Panels): Camera moves to [2.4, -0.2, 4.8] (pans right, looking left)
    // Section 4 (Ecosystem): Camera moves to [0, -1.2, 3.2] (low angle looking up)
    // Section 5 (Final CTA): Camera retreats back and high: [0, 2.5, 8] (high view looking down)

    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    // Helper to finish the transition halfway through the section's scroll, allowing it to rest
    const getP = (start: number, end: number) => {
      return Math.min(1, Math.max(0, (scrollProgress - start) / ((end - start) * 0.5)));
    };

    if (scrollProgress < 0.2) {
      // 0 to 20%: Hero to What Axis Is (Core on left, text on right)
      const p = getP(0, 0.2);
      targetPos.set(
        THREE.MathUtils.lerp(0, -0.5, p),
        THREE.MathUtils.lerp(1.2, 0.8, p),
        THREE.MathUtils.lerp(7.5, 6.0, p)
      );
      targetLookAt.set(
        THREE.MathUtils.lerp(0, -1.0, p), // Look slightly left at the core
        THREE.MathUtils.lerp(0, -0.1, p),
        THREE.MathUtils.lerp(0, -0.5, p)
      );
    } else if (scrollProgress < 0.4) {
      // 20% to 40%: What Axis Is to What Axis Is Not (Core on right, text on left)
      const p = getP(0.2, 0.4);
      targetPos.set(
        THREE.MathUtils.lerp(-0.5, 0.5, p),
        THREE.MathUtils.lerp(0.8, 0.8, p),
        THREE.MathUtils.lerp(6.0, 6.0, p)
      );
      targetLookAt.set(
        THREE.MathUtils.lerp(-1.0, 1.0, p), // Look slightly right at the core
        THREE.MathUtils.lerp(-0.1, -0.1, p),
        THREE.MathUtils.lerp(-0.5, -0.5, p)
      );
    } else if (scrollProgress < 0.6) {
      // 40% to 60%: What Axis Is Not to Panels
      const p = getP(0.4, 0.6);
      targetPos.set(
        THREE.MathUtils.lerp(0.5, 0, p),
        THREE.MathUtils.lerp(0.8, -0.5, p),
        THREE.MathUtils.lerp(6.0, 4.0, p)
      );
      targetLookAt.set(
        THREE.MathUtils.lerp(1.0, 0, p), // Center
        THREE.MathUtils.lerp(-0.1, -0.5, p),
        THREE.MathUtils.lerp(-0.5, -1.0, p)
      );
    } else if (scrollProgress < 0.8) {
      // 60% to 80%: Panels to Ecosystem
      const p = getP(0.6, 0.8);
      targetPos.set(
        THREE.MathUtils.lerp(0, 0, p),
        THREE.MathUtils.lerp(-0.5, 0, p),
        THREE.MathUtils.lerp(4.0, 3.5, p)
      );
      targetLookAt.set(
        THREE.MathUtils.lerp(0, 0, p),
        THREE.MathUtils.lerp(-0.5, 0, p), // Looking straight at center
        THREE.MathUtils.lerp(-1.0, -0.5, p)
      );
    } else {
      // 80% to 100%: Ecosystem to Final CTA
      const p = getP(0.8, 1.0);
      targetPos.set(
        THREE.MathUtils.lerp(0, 0, p),
        THREE.MathUtils.lerp(0, 2.5, p),
        THREE.MathUtils.lerp(3.5, 8.0, p)
      );
      targetLookAt.set(
        THREE.MathUtils.lerp(0, 0, p),
        THREE.MathUtils.lerp(0, 0.1, p),
        THREE.MathUtils.lerp(-0.5, -0.4, p)
      );
    }

    // Add subtle mouse parallax to camera position
    targetPos.x += mouseRef.current.x * 0.4;
    targetPos.y += mouseRef.current.y * 0.4;

    // Smoothly interpolate camera position
    state.camera.position.lerp(targetPos, 0.05);

    // Smoothly update camera lookAt
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    currentLookAt.lerp(targetLookAt, 0.05);
    state.camera.lookAt(currentLookAt);
  });

  return null;
}

function VerticalLightBeams() {
  const beamsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (beamsRef.current) {
      beamsRef.current.children.forEach((beam, idx) => {
        const material = (beam as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = 0.05 + Math.sin(t * 1.5 + idx * 0.8) * 0.15;
      });
    }
  });

  return (
    <group ref={beamsRef} position={[0, 0, 0]}>
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[(i - 6.5) * 2.5, 0.5, -8 + (i % 2) * 1.5]}>
          <cylinderGeometry args={[0.015, 0.04, 10, 8]} />
          <meshBasicMaterial color="#CDA464" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
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
      <VerticalLightBeams />
      
      {/* Floor Grid */}
      <group position={[0, -2.5, 0]}>
        <gridHelper
          ref={bottomGridRef}
          args={[120, 60, 0xCDA464, 0x222222]}
          position={[0, 0, 0]}
        />
        {/* Floor fade plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[120, 120]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Ceiling Grid */}
      <group position={[0, 3.5, 0]}>
        <gridHelper
          ref={topGridRef}
          args={[120, 60, 0xCDA464, 0x222222]}
          position={[0, 0, 0]}
        />
        {/* Ceiling fade plane */}
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
      count={2000}
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

  // Balanced premium golden crystals floating in structured coordinates
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
            <meshPhysicalMaterial
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

function AxisCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const docHeight = typeof document !== "undefined" ? (document.documentElement.scrollHeight - window.innerHeight) : 1;
    const scrollProgress = scrollY / Math.max(1, docHeight);

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12 + scrollProgress * Math.PI * 0.6;
      coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      
      // Target position adjusts as we scroll
      const targetPos = new THREE.Vector3();
      const getP = (start: number, end: number) => {
        return Math.min(1, Math.max(0, (scrollProgress - start) / ((end - start) * 0.5)));
      };

      if (scrollProgress < 0.2) {
        // Hero to What Axis Is: Core moves to the Left empty space
        const p = getP(0, 0.2);
        targetPos.set(
          THREE.MathUtils.lerp(0, -2.5, p), // Move to left
          THREE.MathUtils.lerp(0, -0.1, p),
          THREE.MathUtils.lerp(0, -1.2, p)
        );
      } else if (scrollProgress < 0.4) {
        // What Axis Is to What Axis Is Not: Core moves to the Right empty space
        const p = getP(0.2, 0.4);
        targetPos.set(
          THREE.MathUtils.lerp(-2.5, 2.5, p), // Move to right
          THREE.MathUtils.lerp(-0.1, 0.4, p),
          THREE.MathUtils.lerp(-1.2, 0.8, p)
        );
      } else if (scrollProgress < 0.6) {
        // What Axis Is Not to Panels: Core moves to center
        const p = getP(0.4, 0.6);
        targetPos.set(
          THREE.MathUtils.lerp(2.5, 0, p), // Center horizontally
          THREE.MathUtils.lerp(0.4, -0.4, p),
          THREE.MathUtils.lerp(0.8, -1.5, p)
        );
      } else if (scrollProgress < 0.8) {
        // Panels to Ecosystem
        const p = getP(0.6, 0.8);
        targetPos.set(
          THREE.MathUtils.lerp(0, 0, p),
          THREE.MathUtils.lerp(-0.4, 0, p),
          THREE.MathUtils.lerp(-1.5, -0.5, p)
        );
      } else {
        // Ecosystem to Final CTA: Core perfectly centered for final bold statement
        const p = getP(0.8, 1.0);
        targetPos.set(
          THREE.MathUtils.lerp(0, 0, p),
          THREE.MathUtils.lerp(0, 0, p), // Center vertically
          THREE.MathUtils.lerp(-0.5, 0, p) // Center depth
        );
      }
      
      // Smooth mouse parallax
      targetPos.x += mouseRef.current.x * 0.3;
      targetPos.y += mouseRef.current.y * 0.3;
      
      coreRef.current.position.lerp(targetPos, 0.05);
    }

    // Rings separation for Clarity, Structure, Monetization stack
    const separation = Math.max(0, (scrollProgress - 0.3) * 3);
    const sepLimit = Math.min(1.0, separation);
    
    if (ring1Ref.current) {
      ring1Ref.current.position.y = sepLimit * 0.55;
      ring1Ref.current.rotation.y = t * 0.35;
      ring1Ref.current.rotation.x = t * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.position.y = 0;
      ring2Ref.current.rotation.y = -t * 0.25;
      ring2Ref.current.rotation.z = t * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.position.y = -sepLimit * 0.55;
      ring3Ref.current.rotation.y = t * 0.45;
      ring3Ref.current.rotation.x = -t * 0.15;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Premium glow ambient light inside */}
      <pointLight color="#CDA464" intensity={6} distance={8} />
      
      {/* Ring 1 (Top - Clarity) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.06, 16, 64]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.7}
          roughness={0.12}
          transmission={0.96}
          ior={1.3}
          chromaticAberration={0.04}
          color="#F2E8C6"
        />
      </mesh>

      {/* Ring 2 (Middle - Structure) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.45, 0.06, 16, 64]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.7}
          roughness={0.08}
          transmission={0.96}
          ior={1.4}
          chromaticAberration={0.07}
          color="#CDA464"
        />
      </mesh>

      {/* Ring 3 (Bottom - Monetization) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.1, 0.06, 16, 64]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.7}
          roughness={0.18}
          transmission={0.96}
          ior={1.35}
          chromaticAberration={0.05}
          color="#EFEFEF"
        />
      </mesh>

      {/* Crystalline Core Monolith */}
      <Float speed={2.5} floatIntensity={0.8} rotationIntensity={0.8}>
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
      </Float>
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

export default function CinematicScene() {
  return (
    <div className="scene-bg">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 1.2, 7.5], fov: 45 }}
      >
        <CinematicCamera />
        <CinematicLighting />
        <ArchitecturalGrid />
        <FloatingParticles />
        <FloatingDataShards />
        <AxisCore />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
      <div className="scene-vignette" />
    </div>
  );
}
