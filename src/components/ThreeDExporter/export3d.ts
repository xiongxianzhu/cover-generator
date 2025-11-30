import * as THREE from "three";
import { createRoot } from "react-dom/client";
import ThreeDCanvas from "./ThreeDCanvas";

/**
 * 导出 3D Canvas 为 PNG 图片
 */
export function exportCanvasAsPNG(canvas: HTMLCanvasElement, filename?: string): void {
  try {
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename || `cover-3d-${Date.now()}.png`;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("导出 3D 图片失败:", error);
    throw new Error("导出 3D 图片失败");
  }
}

/**
 * 创建临时容器用于 3D 渲染
 */
export function createTempContainer(): HTMLElement {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.zIndex = "-1";
  container.style.width = "800px";
  container.style.height = "600px";
  document.body.appendChild(container);
  return container;
}

/**
 * 清理临时容器
 */
export function cleanupTempContainer(container: HTMLElement): void {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

/**
 * 等待指定时间
 */
export function waitForRender(ms: number = 800): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 导出 3D 封面的核心函数
 */
export async function export3DCover(
  canvas2d: HTMLCanvasElement, 
  background: string = "#ffffff",
  filename?: string
): Promise<void> {
  // 创建纹理
  const texture = new THREE.CanvasTexture(canvas2d);
  
  // 创建临时容器
  const container = createTempContainer();
  
  try {
    // 挂载 3D Canvas
    const root = createRoot(container);
    // 使用 createElement 来避免 JSX 语法错误
    const element = ThreeDCanvas({ coverTexture: texture, background });
    root.render(element);
    
    // 等待渲染完成
    await waitForRender(800);
    
    // 导出
    const threeCanvas = container.querySelector("canvas");
    if (threeCanvas) {
      exportCanvasAsPNG(threeCanvas, filename);
    } else {
      throw new Error("无法找到 3D Canvas 元素");
    }
    
    // 清理
    root.unmount();
  } finally {
    cleanupTempContainer(container);
  }
}