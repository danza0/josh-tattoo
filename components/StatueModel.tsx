"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { MotionValue } from "framer-motion";

export interface StatueModelProps {
  className?: string;
  style?: React.CSSProperties;
  scrollYProgress?: MotionValue<number>;
}

const FRAME_COUNT = 270;

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
  const imagesRef = useRef<HTMLImageElement[]>(new Array(FRAME_COUNT));
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const currentFrameRef = useRef(0);

  // `ready` flips true the moment the FIRST frame is on screen — we no longer
  // wait for all 270 frames (~20 MB) before showing anything.
  const [ready, setReady] = useState(false);

  // Returns the requested frame if it's loaded, otherwise the nearest earlier
  // loaded frame, so scrubbing never blanks out while later frames stream in.
  const resolveFrame = useCallback((index: number): HTMLImageElement | null => {
    const loaded = loadedRef.current;
    if (loaded[index]) return imagesRef.current[index];
    for (let i = index; i >= 0; i--) {
      if (loaded[i]) return imagesRef.current[i];
    }
    for (let i = index + 1; i < FRAME_COUNT; i++) {
      if (loaded[i]) return imagesRef.current[i];
    }
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

  // ── Progressive loading ──────────────────────────────────────────────
  // 1. Load frame 0 first, draw it, reveal the canvas.
  // 2. Then stream the remaining frames in order, in the background.
  useEffect(() => {
    let cancelled = false;

    const markLoaded = (i: number, img: HTMLImageElement) => {
      imagesRef.current[i] = img;
      loadedRef.current[i] = true;
    };

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          markLoaded(i, img);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(i);
      });

    (async () => {
      await loadFrame(0);
      if (cancelled) return;
      setReady(true);
      drawFrame(0);

      // Stream the rest with real parallelism (a bounded pool) so all frames
      // are ready within a couple of seconds — otherwise fast scrolling races
      // ahead of the loader and the statue appears to freeze. Frames are still
      // claimed in ascending order, so the ones you hit first load first.
      const CONCURRENCY = 12;
      let next = 1;
      const worker = async () => {
        while (!cancelled) {
          const i = next++;
          if (i >= FRAME_COUNT) return;
          await loadFrame(i);
          // Keep the current view fresh if the user is already scrubbing.
          if (i === currentFrameRef.current) drawFrame(i);
        }
      };
      await Promise.all(
        Array.from({ length: CONCURRENCY }, () => worker())
      );
    })();

    return () => {
      cancelled = true;
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
