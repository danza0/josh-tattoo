"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { MotionValue } from "framer-motion";

export interface StatueModelProps {
  autoRotate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  scrollYProgress?: MotionValue<number>;
}

const VIDEO_DURATION = 5; // seconds
const PLACEHOLDER_BG =
  "radial-gradient(ellipse at 50% 60%, #2a2520 0%, #1a1815 60%, transparent 100%)";

// Lerp helper — smoothly interpolates between current and target
function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export default function StatueModel({
  autoRotate = false,
  className,
  style,
  scrollYProgress,
}: StatueModelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Smooth animation loop that lerps video currentTime toward target
  const animate = useCallback(() => {
    if (videoRef.current && isLoaded) {
      const target = targetTimeRef.current;
      const current = currentTimeRef.current;

      // Lerp with factor 0.12 — smooth but responsive
      const newTime = lerp(current, target, 0.12);

      // Only seek if the difference is meaningful (> ~1 frame at 30fps)
      if (Math.abs(newTime - current) > 0.008) {
        videoRef.current.currentTime = newTime;
        currentTimeRef.current = newTime;
      } else if (Math.abs(target - current) > 0.001) {
        // Snap to exact target when close enough
        videoRef.current.currentTime = target;
        currentTimeRef.current = target;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isLoaded]);

  // Start/stop the animation loop
  useEffect(() => {
    if (autoRotate || !scrollYProgress || !isLoaded) return;

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [autoRotate, scrollYProgress, isLoaded, animate]);

  // Update target time when scroll changes (just sets a ref — no DOM work)
  useEffect(() => {
    if (autoRotate || !scrollYProgress) return;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      targetTimeRef.current = Math.max(0, Math.min(v * VIDEO_DURATION, VIDEO_DURATION));
    });

    return () => unsubscribe();
  }, [autoRotate, scrollYProgress]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Placeholder gradient shown while loading or on error */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: PLACEHOLDER_BG,
          }}
        />
      )}

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        autoPlay={autoRotate}
        loop={autoRotate}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "transparent",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onLoadedMetadata={() => setIsLoaded(true)}
      >
        <source src="/videos/hercules-bust.webm" type="video/webm" />
        <source src="/videos/hercules-bust.mp4" type="video/mp4" />
        Your browser does not support the video element.
      </video>
    </div>
  );
}

