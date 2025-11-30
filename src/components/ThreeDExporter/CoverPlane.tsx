import * as THREE from "three";

interface Props {
  coverTexture: THREE.Texture;
  rotation?: { x: number; y: number }; // 添加旋转参数
}

export default function CoverPlane({ coverTexture, rotation }: Props) {
  // 使用传入的旋转值或默认值
  const planeRotation = rotation ? [rotation.x, rotation.y, 0] : [-0.3, 0.5, 0];
  
  return (
    <mesh rotation={planeRotation as [number, number, number]} position={[0, 0, 0]}>
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