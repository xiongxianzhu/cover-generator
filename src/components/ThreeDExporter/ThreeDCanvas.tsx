import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CoverPlane from "./CoverPlane";

interface Props {
  coverTexture: THREE.Texture;
  background?: string;
}

export default function ThreeDCanvas({ coverTexture, background = "#ffffff" }: Props) {
  return (
    <Canvas
      gl={{
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: true
      }}
      camera={{ position: [0, 0, 3], fov: 40 }}
      style={{
        width: 800,
        height: 600,
        background: background === "transparent" ? "transparent" : background
      }}
    >
      {/* 环境光 */}
      <ambientLight intensity={0.7} />
      {/* 方向光 */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* 补充光 */}
      <pointLight position={[-5, -5, 5]} intensity={0.3} />

      {/* 封面贴图平面 */}
      <CoverPlane coverTexture={coverTexture} />

      {/* 轨道控制器 */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 3}
        autoRotate={false}
      />
    </Canvas>
  );
}