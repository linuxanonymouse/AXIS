/** Shared orbital math + planet showcase positions */

export const SUN_RADIUS = 2.4;

export type PlanetId =
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn";

export type PlanetConfig = {
  name: PlanetId;
  radius: number;
  orbit: number;
  color: string;
  emissive?: string;
  atmosphere?: string;
  hasRing?: boolean;
  textureKey?: "earth" | "mars" | "jupiter" | "mercury" | "venus" | "saturn";
  showcaseAngle: number;
};

export const PLANETS: PlanetConfig[] = [
  {
    name: "Mercury",
    radius: 0.16,
    orbit: 3.4,
    color: "#9a8b7a",
    textureKey: "mercury",
    showcaseAngle: 0.4,
  },
  {
    name: "Venus",
    radius: 0.3,
    orbit: 4.8,
    color: "#d4c4a0",
    emissive: "#4a3520",
    atmosphere: "#e8d4a8",
    textureKey: "venus",
    showcaseAngle: 1.35,
  },
  {
    name: "Earth",
    radius: 0.44,
    orbit: 6.8,
    color: "#1a4d7a",
    textureKey: "earth",
    showcaseAngle: -Math.PI / 2,
  },
  {
    name: "Mars",
    radius: 0.24,
    orbit: 8.6,
    color: "#b84a32",
    textureKey: "mars",
    showcaseAngle: 2.25,
  },
  {
    name: "Jupiter",
    radius: 1.15,
    orbit: 12,
    color: "#c4a882",
    textureKey: "jupiter",
    showcaseAngle: 3.6,
  },
  {
    name: "Saturn",
    radius: 0.9,
    orbit: 15,
    color: "#ddd0b0",
    hasRing: true,
    textureKey: "saturn",
    showcaseAngle: 4.9,
  },
];

export const EARTH_ORBIT = 6.8;
export const EARTH_RADIUS = 0.44;

export function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function getPlanetByName(name: string): PlanetConfig | undefined {
  return PLANETS.find((p) => p.name === name);
}

export function getPlanetPosition(
  orbit: number,
  angle: number,
  tilt = 0
): [number, number, number] {
  const y = Math.sin(angle * 0.35) * tilt;
  return [Math.cos(angle) * orbit, y, Math.sin(angle) * orbit];
}

export function getPlanetCoords(name: string): { x: number; y: number; z: number; radius: number } {
  const p = getPlanetByName(name);
  if (!p) return { x: 0, y: 0, z: 0, radius: 0.5 };
  const [x, y, z] = getPlanetPosition(p.orbit, p.showcaseAngle, 0.12);
  return { x, y, z, radius: p.radius };
}
