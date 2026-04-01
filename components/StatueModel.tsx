"use client";

import React, { useRef, useState } from "react";

const PLACEHOLDER_BG =
  "radial-gradient(ellipse at 50% 60%, #2a2520 0%, #1a1815 60%, transparent 100%)";

export default function StatueModel({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
        autoPlay
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "transparent",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        onLoadedMetadata={() => setIsLoaded(true)}
      >
        <source src="/videos/hercules-bust.webm" type="video/webm" />
        <source src="/videos/hercules-bust.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

