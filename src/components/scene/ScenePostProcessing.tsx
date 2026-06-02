"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function ScenePostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.1}
        mipmapBlur={false}
        radius={0.6}
        resolutionX={256}
        resolutionY={256}
      />
      <Vignette
        offset={0.4}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
