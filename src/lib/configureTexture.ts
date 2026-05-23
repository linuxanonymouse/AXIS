import * as THREE from "three";

/** Ensure PBR maps render with correct color space (Three r152+) */
export function configureColorTexture(
  texture: THREE.Texture,
  colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace
) {
  texture.colorSpace = colorSpace;
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export function configureDataTexture(texture: THREE.Texture) {
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 4;
  return texture;
}
