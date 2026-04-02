"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { MotionValue } from "framer-motion";

export interface StatueModelProps {
  className?: string;
  style?: React.CSSProperties;
  scrollYProgress?: MotionValue<number>;
}

const FRAME_COUNT = 90;
const PLACEHOLDER_BG =
  "radial-gradient(ellipse at 50% 60%, #2a2520 0%, #1a1815 60%, transparent 100%)";

function framePath(index: number): string {
  return `/frames/${String(index + 1).padStart(4, "0")}.webp`;
}

export default function StatueModel({
  className,
  style,
  scrollYProgress,
}: StatueModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const container = containerRef.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    const cw = canvas.width / (window.devicePixelRatio || 1);
    const ch = canvas.height / (window.devicePixelRatio || 1);
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };
      images[i] = img;
    }
  }, []);

  // Draw first frame once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // Scroll-driven frame switching
  useEffect(() => {
    if (!scrollYProgress || !isLoaded) return;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      const frameIndex = Math.max(0, Math.min(Math.floor(v * FRAME_COUNT), FRAME_COUNT - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isLoaded, drawFrame]);

  // Handle resize
  useEffect(() => {
    if (!isLoaded) return;

    function handleResize() {
      drawFrame(currentFrameRef.current);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, drawFrame]);

  return (
    <div
      ref={containerRef}
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

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}