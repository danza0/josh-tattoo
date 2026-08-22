"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { MotionValue } from "framer-motion";
import {
  FRAME_COUNT,
  getFrameImages,
  isFrameLoaded,
  preloadFrames,
} from "@/lib/statueFrames";

export interface StatueModelProps {
  className?: string;
  style?: React.CSSProperties;
  scrollYProgress?: MotionValue<number>;
}

/**
 * The statue render is a 1920×1080 (16:9) frame with the bust centred and
 * empty margins around it. On a wide screen a "cover" fit shows the whole
 * bust; on a tall phone "cover" would zoom hard into the centre. So we scale
 * the cover factor down a touch and anchor slightly above centre on small
 * screens, keeping the whole bust — head to base — in view.
 */
function getFraming(viewportWidth: number): { zoom: number; focusY: number } {
  if (viewportWidth < 640) return { zoom: 0.82, focusY: 0.42 };
  if (viewportWidth < 1024) return { zoom: 0.9, focusY: 0.45 };
  return { zoom: 1, focusY: 0.5 };
}

export default function StatueModel({
  className,
  style,
  scrollYProgress,
}: StatueModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);

  // Frames are preloaded by the shared loader (and the intro screen). We reveal
  // the canvas once they're all in, so scrubbing is smooth from the first scroll.
  const [ready, setReady] = useState(false);

  // Returns the requested frame if it's loaded, otherwise the nearest loaded
  // frame, so a draw never blanks out.
  const resolveFrame = useCallback((index: number): HTMLImageElement | null => {
    const imgs = getFrameImages();
    if (isFrameLoaded(index)) return imgs[index];
    for (let i = index; i >= 0; i--) if (isFrameLoaded(i)) return imgs[i];
    for (let i = index + 1; i < FRAME_COUNT; i++) if (isFrameLoaded(i)) return imgs[i];
    return null;
  }, []);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const container = containerRef.current;
      const img = resolveFrame(index);
      if (!canvas || !ctx || !img) return;

      if (container) {
        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const { zoom, focusY } = getFraming(cw);
      const scale = Math.max(cw / iw, ch / ih) * zoom;
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) * focusY;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    },
    [resolveFrame]
  );

  // ── Reveal once all frames are preloaded ─────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      setReady(true);
      drawFrame(currentFrameRef.current);
    };
    preloadFrames().then(reveal);
    // Safety: reveal anyway if a few frames are slow to settle.
    const safety = setTimeout(reveal, 12000);
    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [drawFrame]);

  // ── Scroll-driven frame switching ────────────────────────────────────
  useEffect(() => {
    if (!scrollYProgress || !ready) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const frameIndex = Math.max(
        0,
        Math.min(Math.floor(v * FRAME_COUNT), FRAME_COUNT - 1)
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, ready, drawFrame]);

  // ── Redraw on resize ─────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ready, drawFrame]);

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
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
}
