"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildCameraKeyframes, type CameraKeyframe } from "@/lib/cameraRigs";

function smootherstep(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function bezier3(
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  t: number,
  out: THREE.Vector3
) {
  const u = 1 - t;
  out.set(0, 0, 0);
  out.addScaledVector(a, u * u);
  out.addScaledVector(b, 2 * u * t);
  out.addScaledVector(c, t * t);
  return out;
}

function arcControl(from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3 {
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const lift = from.distanceTo(to) * 0.28 + 3.5;
  mid.y += lift;
  return mid;
}

type PlanetCameraProps = {
  stageIndex: number;
  stageLocal: number;
};

const POS_DAMP = 3.2;
const LOOK_DAMP = 3.5;
const FOV_DAMP = 3;

export default function PlanetCamera({
  stageIndex,
  stageLocal,
}: PlanetCameraProps) {
  const { camera } = useThree();
  const keyframes = useMemo(() => buildCameraKeyframes(), []);
  const pos = useRef(new THREE.Vector3(0, 0, 10.5));
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const currentFov = useRef(36);
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const global = stageIndex + Math.min(1, Math.max(0, stageLocal));
    const idx = Math.min(Math.floor(global), keyframes.length - 1);
    const nextIdx = Math.min(idx + 1, keyframes.length - 1);
    const blend = smootherstep(global - idx);

    const from = keyframes[idx];
    const to = keyframes[nextIdx];
    const mid = arcControl(from.pos, to.pos);

    bezier3(from.pos, mid, to.pos, blend, targetPos.current);
    targetLook.current.copy(from.look).lerp(to.look, blend);
    const targetFov = from.fov + (to.fov - from.fov) * blend;

    const posK = 1 - Math.exp(-POS_DAMP * dt);
    const lookK = 1 - Math.exp(-LOOK_DAMP * dt);
    const fovK = 1 - Math.exp(-FOV_DAMP * dt);

    pos.current.lerp(targetPos.current, posK);
    look.current.lerp(targetLook.current, lookK);
    currentFov.current += (targetFov - currentFov.current) * fovK;

    camera.position.copy(pos.current);
    camera.lookAt(look.current);

    const persp = camera as THREE.PerspectiveCamera;
    if ("fov" in persp) {
      persp.fov = currentFov.current;
      persp.updateProjectionMatrix();
    }
  });

  return null;
}
