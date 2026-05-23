"use client";

/** Fill only — planets lit by the Sun point lights in RealisticSun */
export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.06} color="#223355" />
      <hemisphereLight
        args={["#4466aa", "#000000", 0.12]}
        position={[0, 1, 0]}
      />
    </>
  );
}
