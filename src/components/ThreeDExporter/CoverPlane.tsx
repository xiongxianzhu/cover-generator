import * as THREE from "three";

interface Props {
  coverTexture: THREE.Texture;
}

export default function CoverPlane({ coverTexture }: Props) {
  return (
    <mesh rotation={[-0.3, 0.5, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2.8]} />
      <meshStandardMaterial
        map={coverTexture}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}