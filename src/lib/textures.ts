/** Local NASA / Solar System Scope textures /public/textures */

const P = "/textures/planets";
const SPACE = "/textures/space";
const SUN = "/textures/sun.jpg";

/** Verified local files (skip corrupt 16KB placeholders) */
export const PLANET_TEXTURES = {
  sun: SUN,
  earth: {
    day: `${P}/earth_atmos_2048.jpg`,
    clouds: `${P}/earth_atmos_2048.jpg`,
    night: `${P}/earth_atmos_2048.jpg`,
    normal: `${P}/earth_normal_4k.jpg`,
  },
  mercury: `${P}/mercury_2k.jpg`,
  venus: `${P}/venus_atmos_2048.jpg`,
  mars: `${P}/mars_1k_color.jpg`,
  jupiter: `${P}/jupiter_2k.jpg`,
  saturn: `${P}/saturn_2k.jpg`,
  saturnRing: `${P}/saturn_ring_alpha.png`,
  moon: `${P}/moon_1024.jpg`,
} as const;

export const SPACE_TEXTURES = {
  milkyWay: `${SPACE}/milky_way_4k.jpg`,
  stars: `${SPACE}/stars_2k.jpg`,
} as const;

/** All texture URLs for preloading */
export const ALL_TEXTURE_URLS = [
  PLANET_TEXTURES.sun,
  PLANET_TEXTURES.earth.day,
  PLANET_TEXTURES.mercury,
  PLANET_TEXTURES.venus,
  PLANET_TEXTURES.mars,
  PLANET_TEXTURES.jupiter,
  PLANET_TEXTURES.saturn,
  PLANET_TEXTURES.moon,
  SPACE_TEXTURES.milkyWay,
] as const;
