"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function ExecutionGyroscope() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? Math.max(1, document.body.scrollHeight - window.innerHeight) : 1;
    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
    const t = state.clock.elapsedTime;
    
    if (masterGroupRef.current) {
      masterGroupRef.current.position.y = Math.sin(t) * 0.3;
    }

    // Rings start chaotic and lock into flawless rotation as you scroll
    if (ring1Ref.current) {
      const targetRotX = THREE.MathUtils.lerp(t * 0.5, 0, scrollPercent);
      const targetRotZ = THREE.MathUtils.lerp(t * 0.3, 0, scrollPercent);
      
      ring1Ref.current.rotation.x = THREE.MathUtils.damp(ring1Ref.current.rotation.x, targetRotX, 2, delta);
      ring1Ref.current.rotation.z = THREE.MathUtils.damp(ring1Ref.current.rotation.z, targetRotZ, 2, delta);
      // Continuous execution spin
      ring1Ref.current.rotation.y += (0.2 + scrollPercent * 2) * delta;
    }
    
    if (ring2Ref.current) {
      const targetRotY = THREE.MathUtils.lerp(t * 0.4, 0, scrollPercent);
      const targetRotZ = THREE.MathUtils.lerp(-t * 0.2, 0, scrollPercent);
      
      ring2Ref.current.rotation.y = THREE.MathUtils.damp(ring2Ref.current.rotation.y, targetRotY, 2, delta);
      ring2Ref.current.rotation.z = THREE.MathUtils.damp(ring2Ref.current.rotation.z, targetRotZ, 2, delta);
      ring2Ref.current.rotation.x -= (0.3 + scrollPercent * 1.5) * delta;
    }

    if (ring3Ref.current) {
      const targetRotX = THREE.MathUtils.lerp(-t * 0.3, Math.PI / 2, scrollPercent);
      const targetRotY = THREE.MathUtils.lerp(t * 0.6, 0, scrollPercent);
      
      ring3Ref.current.rotation.x = THREE.MathUtils.damp(ring3Ref.current.rotation.x, targetRotX, 2, delta);
      ring3Ref.current.rotation.y = THREE.MathUtils.damp(ring3Ref.current.rotation.y, targetRotY, 2, delta);
      ring3Ref.current.rotation.z += (0.4 + scrollPercent * 2.5) * delta;
    }

    if (coreRef.current) {
      const scale = 1 + scrollPercent * 0.5 + Math.sin(t * 5) * 0.05;
      coreRef.current.scale.setScalar(scale);
      // Brightness increases as execution locks in
      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(0.5, 3.0, scrollPercent);
    }
  });

  return (
    <group ref={masterGroupRef} scale={[1.2, 1.2, 1.2]}>
      {/* Central Power Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#CDA464" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
      </mesh>
      <pointLight color="#CDA464" intensity={5} distance={15} />

      {/* Outer Ring 1 */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[4, 0.2, 16, 64]} />
          <meshPhysicalMaterial color="#111" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Golden Tracking Nodes */}
        {[-1, 1].map((dir, i) => (
          <mesh key={i} position={[dir * 4, 0, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshPhysicalMaterial color="#CDA464" metalness={1} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Middle Ring 2 */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[3, 0.15, 16, 64]} />
          <meshPhysicalMaterial color="#CDA464" metalness={1} roughness={0.2} />
        </mesh>
        {/* Dark Tracking Nodes */}
        {[-1, 1].map((dir, i) => (
          <mesh key={i} position={[0, dir * 3, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Inner Ring 3 */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2, 0.1, 16, 64]} />
          <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.1} />
        </mesh>
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
    
    // Start wide, zoom into the flawless execution
    const targetZ = 15 - scrollPercent * 5;
    
    const finalX = mouseRef.current.x * 3 + scrollPercent * 2;
    const finalY = mouseRef.current.y * 3 + scrollPercent * 2;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, finalX, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, finalY, 2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 2, delta);
    
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function OperationsScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} 
        
        camera={{ position: [0, 0, 15], fov: 45 }}
      >
        <color attach="background" args={['#010204']} />
        <fog attach="fog" args={['#010204', 5, 30]} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={5} color="#ffffff" castShadow />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#CDA464" />
        
        <ExecutionGyroscope />

        <Stars radius={20} depth={50} count={1500} factor={2} saturation={0} fade speed={0.5} />
        <CinematicCamera />

        <EffectComposer>
          <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
