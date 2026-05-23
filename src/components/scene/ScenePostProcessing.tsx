"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function ScenePostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.88}
        luminanceSmoothing={0.35}
        mipmapBlur
        radius={0.45}
      />
      <Vignette
        offset={0.35}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise opacity={0.012} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
