"use client";

/**
 * StatueModel — Reusable 3D Canvas component that loads Hercules Bust.glb.
 * Uses React Three Fiber + Drei. Transparent background so the stone color
 * shows through. Accepts optional autoRotate and CSS size props.
 * SSR-safe: import this with `dynamic(() => import("./StatueModel"), { ssr: false })`.
 */

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = `/models/${encodeURIComponent("Hercules Bust.glb")}`;

// ── Loading spinner shown while the 21 MB model streams in ──────────────────
function Spinner() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * 1.5;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.4, 0.06, 8, 32]} />
      <meshStandardMaterial color="#888880" />
    </mesh>
  );
}

// ── Inner mesh — lives inside the Canvas context ────────────────────────────
interface ModelProps {
  autoRotate: boolean;
  scale: number;
}

function Model({ autoRotate, scale }: ModelProps) {
  const { scene } = useGLTF(MODEL_PATH);

  // useGLTF caches the parsed GLTF internally, so the 21 MB file is only
  // fetched once. We clone the scene so that Hero and StatueSection can each
  // own their own Object3D hierarchy (Three.js forbids two parents).
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
      <group scale={scale}>
        <Center>
          <primitive object={clonedScene} />
        </Center>
      </group>
    </>
  );
}

// Preload so the browser starts fetching before the Canvas mounts
useGLTF.preload(MODEL_PATH);

// ── Public component ─────────────────────────────────────────────────────────
export interface StatueModelProps {
  autoRotate?: boolean;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatueModel({
  autoRotate = false,
  scale = 0.5,
  className,
  style,
}: StatueModelProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      className={className}
      style={{ background: "transparent", ...style }}
    >
      {/* Cinematic museum-style lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 3]} intensity={2.5} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#c8bfb8" />
      <spotLight position={[0, 6, 2]} intensity={1.2} angle={0.4} penumbra={0.6} />

      <Suspense fallback={<Spinner />}>
        {/* Environment map for realistic stone reflections */}
        <Environment preset="studio" />
        <Model autoRotate={autoRotate} scale={scale} />
      </Suspense>
    </Canvas>
  );
}
