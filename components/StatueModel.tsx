"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { MotionValue } from "framer-motion";
import {
  FRAME_COUNT,
  framePath,
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

// A representative "front" frame used as the static mobile hero image.
const STATIC_FRAME = framePath(0);

export default function StatueModel({
  className,
  style,
  scrollYProgress,
}: StatueModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect small screens. On mobile we render a static image instead of the
  // scroll-scrubbed canvas — it renders reliably on every mobile browser and
  // avoids downloading ~270 frames over mobile data.
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const desktopCanvas = mounted && !isMobile;

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
      if (!canvas || !ctx || !container || !img) return;

      const rect = container.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      if (cw === 0 || ch === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const bw = Math.round(cw * dpr);
      const bh = Math.round(ch * dpr);
      if (canvas.width !== bw) canvas.width = bw;
      if (canvas.height !== bh) canvas.height = bh;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

  // Preload frames + reveal — desktop only.
  useEffect(() => {
    if (!desktopCanvas) return;
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      setReady(true);
      drawFrame(currentFrameRef.current);
    };
    preloadFrames().then(() => requestAnimationFrame(reveal));
    const safety = setTimeout(reveal, 12000);
    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [desktopCanvas, drawFrame]);

  // Scroll-driven frame switching — desktop only.
  useEffect(() => {
    if (!desktopCanvas || !scrollYProgress || !ready) return;
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
  }, [desktopCanvas, scrollYProgress, ready, drawFrame]);

  // Redraw on real container size changes — desktop only.
  useEffect(() => {
    if (!desktopCanvas || !ready) return;
    const container = containerRef.current;
    if (!container) return;
    const redraw = () => drawFrame(currentFrameRef.current);
    const ro = new ResizeObserver(redraw);
    ro.observe(container);
    window.addEventListener("resize", redraw);
    window.addEventListener("orientationchange", redraw);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", redraw);
      window.removeEventListener("orientationchange", redraw);
    };
  }, [desktopCanvas, ready, drawFrame]);

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
      {mounted && isMobile ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={STATIC_FRAME}
          alt="Classical marble bust"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 38%" }}
        />
      ) : (
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
      )}
    </div>
  );
}
