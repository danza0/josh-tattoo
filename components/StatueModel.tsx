"use client";

import React, { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";

const MODEL_PATH = `/models/${encodeURIComponent("Hercules Bust.glb")}`;

/**
 * Spinner — simple 3D loading indicator.
 */
function Spinner() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 1.5;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.4, 0.06, 8, 32]} />
      <meshStandardMaterial color="#888880" />
    </mesh>
  );
}

interface ModelProps {
  autoRotate: boolean;
}

/**
 * Model — handles GLB loading, cloning, and auto-fitting.
 */
function Model({ autoRotate }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(MODEL_PATH);
  const { camera } = useThree();
  
  // Clone the scene to avoid shared state if multiple models are rendered
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // AUTO-FIT: measure model and position camera to see it all
  useEffect(() => {
    if (!groupRef.current || !camera) return;
    
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const distance = (maxDim / 2) / Math.tan(fov / 2) * 1.6;

    camera.position.set(center.x, center.y + size.y * 0.1, center.z + distance);
    camera.lookAt(center.x, center.y, center.z);
    
    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      (camera as THREE.PerspectiveCamera).near = Math.max(distance / 100, 0.01);
      (camera as THREE.PerspectiveCamera).far = distance * 100;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  }, [clonedScene, camera]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

export interface StatueModelProps {
  autoRotate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * StatueModel — The main exported component.
 * It uses a local state to ensure it only renders on the client,
 * which is the most reliable way to avoid Next.js hydration/context errors.
 */
export default function StatueModel({
  autoRotate = false,
  className,
  style,
}: StatueModelProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder with the same dimensions during SSR/Hydration
    return (
      <div 
        className={className} 
        style={{ 
          background: "#1a1815", 
          borderRadius: "50%",
          ...style 
        }} 
      />
    );
  }

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 3]} intensity={2.5} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#c8bfb8" />
        <spotLight position={[0, 6, 2]} intensity={1.2} angle={0.4} penumbra={0.6} />

        <Suspense fallback={<Spinner />}>
          <Environment preset="studio" />
          <Model autoRotate={autoRotate} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model for better performance
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_PATH);
}
