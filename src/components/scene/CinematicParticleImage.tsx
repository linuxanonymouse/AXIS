"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  
  // Calculate noise field
  float n = fbm(vUv * 8.0 + uTime * 0.1);
  
  // Calculate brightness of the original image
  float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  
  // Threshold combines noise and the image's own structure
  // This makes the "building" effect follow the contours of the image
  float threshold = mix(n, 1.0 - brightness, 0.6);
  
  // Adjusted progress ensures we go from fully black to fully revealed
  float adjustedProgress = uProgress * 1.4 - 0.2; 
  
  // If the pixel hasn't materialized yet, it's black
  if (threshold > adjustedProgress) {
    discard;
  }
  
  // Calculate the glowing leading edge
  float edgeWidth = 0.08;
  float edgeIntensity = smoothstep(adjustedProgress - edgeWidth, adjustedProgress, threshold);
  
  // Axis Gold color for the laser edge: #CDA464
  vec3 edgeColor = vec3(0.804, 0.643, 0.392) * 2.5; 
  
  // Combine original texture with glowing edge
  vec3 finalColor = mix(texColor.rgb, edgeColor, edgeIntensity);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface MaterializeEngineProps {
  src: string;
}

function MaterializeEngine({ src }: MaterializeEngineProps) {
  const texture = useTexture(src);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  // Calculate plane size to perfectly cover the viewport while maintaining image aspect ratio (16:9)
  const planeAspect = 16 / 9;
  const viewportAspect = viewport.width / viewport.height;
  
  let scaleX = viewport.width;
  let scaleY = viewport.height;
  
  if (viewportAspect > planeAspect) {
    // Screen is wider than image, scale Y to match
    scaleY = viewport.width / planeAspect;
  } else {
    // Screen is taller than image, scale X to match
    scaleX = viewport.height * planeAspect;
  }

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uProgress: { value: 0.0 },
    uTime: { value: 0.0 }
  }), [texture]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const vh = typeof window !== "undefined" ? window.innerHeight : 1;
      
      // Progress from 0 to 1 based on scroll
      const rawProgress = Math.min(1, Math.max(0, scrollY / (vh * 0.8)));
      
      // Smooth dampening
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.damp(
        materialRef.current.uniforms.uProgress.value,
        rawProgress,
        4,
        delta
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[scaleX, scaleY]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function CinematicParticleImage({ src }: MaterializeEngineProps) {
  // We keep the component name 'CinematicParticleImage' so we don't have to update all the imports,
  // but internally this is now a High-Fidelity Materialize Shader.
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010204', pointerEvents: 'none' }}>
      <Canvas dpr={1} >
        <color attach="background" args={['#010204']} />
        
        <MaterializeEngine src={src} />

        <EffectComposer>
          {/* Intense bloom makes the laser edge glow brilliantly */}
          <Bloom luminanceThreshold={1.2} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, #010204 100%)',
          opacity: 0.6
        }}
      />
    </div>
  );
}
