import * as THREE from "three";
import { JOURNEY_STAGES } from "@/lib/journey";
import { getPlanetCoords, SUN_RADIUS } from "@/lib/solar";

export type CameraKeyframe = {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
};

/** Intro: dead-center on the Sun (copy sits over the disc) */
export function sunIntroRig(): CameraKeyframe {
  return {
    pos: new THREE.Vector3(0, 0, 10.5),
    look: new THREE.Vector3(0, 0, 0),
    fov: 36,
  };
}

/** Documentary-style fly-by: surface detail + Sun in deep background */
export function cinematicPlanetRig(planetName: string): CameraKeyframe {
  const p = getPlanetCoords(planetName);
  const planet = new THREE.Vector3(p.x, p.y, p.z);
  const sun = new THREE.Vector3(0, 0, 0);
  const outward = planet.clone().sub(sun).normalize();
  const orbitTangent = new THREE.Vector3(-outward.z, 0, outward.x).normalize();

  const scale =
    planetName === "Jupiter"
      ? 5.2
      : planetName === "Saturn"
        ? 5.8
        : planetName === "Earth"
          ? 6.8
          : 6.2;
  const dist = Math.max(p.radius * scale, 3.5);

  const pos = planet
    .clone()
    .add(orbitTangent.clone().multiplyScalar(dist * 0.72))
    .add(new THREE.Vector3(0, p.radius * 1.8, dist * 0.55))
    .add(outward.clone().multiplyScalar(dist * 0.15));

  const look = planet.clone().add(outward.clone().multiplyScalar(p.radius * 0.15));

  const fov =
    planetName === "Jupiter" || planetName === "Saturn"
      ? 34
      : planetName === "Earth"
        ? 38
        : 36;

  return { pos, look, fov };
}

export function buildCameraKeyframes(): CameraKeyframe[] {
  return JOURNEY_STAGES.map((stage) => {
    if (stage.id === "intro") return sunIntroRig();
    return cinematicPlanetRig(stage.planet);
  });
}
