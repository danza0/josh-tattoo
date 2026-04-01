"use client";

import React, { useRef, useEffect, useState } from "react";
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

export default function StatueModel({
  autoRotate = false,
  className,
  style,
  scrollYProgress,
}: StatueModelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-driven scrubbing: update video.currentTime when scrollYProgress changes
  useEffect(() => {
    if (autoRotate || !scrollYProgress) return;
    const unsubscribe = scrollYProgress.on("change", (progress: number) => {
      if (videoRef.current && isLoaded) {
        videoRef.current.currentTime = progress * VIDEO_DURATION;
      }
    });
    return unsubscribe;
  }, [autoRotate, scrollYProgress, isLoaded]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
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
        preload="metadata"
        autoPlay={autoRotate}
        loop={autoRotate}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "transparent",
          opacity: isLoaded ? 1 : 0,
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

