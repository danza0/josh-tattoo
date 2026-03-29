"use client";

import { Suspense, useMemo, useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";

// Dynamically import Canvas and Environment to ensure they only run on the client
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { 
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#1a1815" }} />
});

const Environment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), { 
  ssr: false 
});

const MODEL_PATH = `/models/${encodeURIComponent("Hercules Bust.glb")}`;

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

function Model({ autoRotate }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(MODEL_PATH);
  const { camera } = useThree();
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // AUTO-FIT: measure model and position camera to see it all
  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Get the max dimension to figure out how far the camera needs to be
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    // Distance needed so the model fills ~60% of the viewport
    const distance = (maxDim / 2) / Math.tan(fov / 2) * 1.6;

    camera.position.set(center.x, center.y + size.y * 0.1, center.z + distance);
    camera.lookAt(center.x, center.y, center.z);
    (camera as THREE.PerspectiveCamera).near = Math.max(distance / 100, 0.01);
    (camera as THREE.PerspectiveCamera).far = distance * 100;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
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

// useGLTF.preload(MODEL_PATH); // Disabled to avoid SSR issues during build

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
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      className={className}
      style={{ background: "transparent", ...style }}
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
  );
}
