"use client";

import React, { useRef, useEffect, useState } from "react";

export interface StatueModelProps {
  autoRotate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatueModel({
  autoRotate = false,
  className,
  style,
}: StatueModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    async function init() {
      // Re-assert non-null since TypeScript can't narrow into async closures
      const el = container as HTMLDivElement;
      try {
        // Dynamic import Three.js only on client
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

        if (disposed) return;

        const width = el.clientWidth || 300;
        const height = el.clientHeight || 500;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 5);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        el.appendChild(renderer.domElement);
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
        keyLight.position.set(5, 8, 3);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xc8bfb8, 0.5);
        fillLight.position.set(-3, 2, -2);
        scene.add(fillLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1.2, 0, 0.4, 0.6);
        spotLight.position.set(0, 6, 2);
        scene.add(spotLight);

        // Load model
        const loader = new GLTFLoader();
        const MODEL_PATH = `/models/${encodeURIComponent("Hercules Bust.glb")}`;

        const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
          loader.load(MODEL_PATH, (g) => resolve(g as unknown as { scene: THREE.Group }), undefined, reject);
        });

        if (disposed) {
          renderer.dispose();
          return;
        }

        const model = gltf.scene;
        scene.add(model);

        // Auto-fit camera to model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const distance = (maxDim / 2) / Math.tan(fov / 2) * 1.6;

        camera.position.set(center.x, center.y + size.y * 0.1, center.z + distance);
        camera.lookAt(center);
        camera.near = Math.max(distance / 100, 0.01);
        camera.far = distance * 100;
        camera.updateProjectionMatrix();

        setIsLoading(false);

        // Animation loop
        let animationId: number;
        function animate() {
          if (disposed) return;
          animationId = requestAnimationFrame(animate);

          if (autoRotate) {
            model.rotation.y += 0.003;
          }

          renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        const observer = new ResizeObserver(() => {
          if (disposed) return;
          const w = el.clientWidth;
          const h = el.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
        observer.observe(el);

        // Cleanup
        return () => {
          disposed = true;
          observer.disconnect();
          cancelAnimationFrame(animationId);
          renderer.dispose();
          if (el.contains(renderer.domElement)) {
            el.removeChild(renderer.domElement);
          }
        };
      } catch (err) {
        console.error("[StatueModel] Failed to load 3D model:", err);
        if (!disposed) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cleanupPromise.then((cleanup) => cleanup?.()).catch(() => {});
    };
  }, [autoRotate]);

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background:
            "radial-gradient(ellipse at 50% 60%, #2a2520 0%, #1a1815 60%, transparent 100%)",
          borderRadius: "50% 50% 48% 52% / 60% 60% 40% 40%",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", ...style }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "2px solid #888880",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}

