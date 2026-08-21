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
  const readyOnceRef = useRef(false);

  // `ready` flips true only once every frame is loaded, so scrubbing is smooth
  // from the very first scroll (no racing ahead of the loader). While loading
  // the canvas stays hidden over the plain stone background — no dark blob.
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

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

  // ── Preload everything, then reveal ──────────────────────────────────
  // Load all frames up front with a parallel pool (fast), and only show the
  // statue once they're all in — so scrolling is smooth immediately. A safety
  // timeout reveals anyway if a few frames are slow, and resolveFrame covers
  // any that failed.
  useEffect(() => {
    let cancelled = false;
    let settled = 0;

    const reveal = () => {
      if (cancelled || readyOnceRef.current) return;
      readyOnceRef.current = true;
      setReady(true);
      drawFrame(currentFrameRef.current);
    };

    const markLoaded = (i: number, img: HTMLImageElement) => {
      imagesRef.current[i] = img;
      loadedRef.current[i] = true;
    };

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const done = () => {
          settled++;
          setProgress(settled / FRAME_COUNT);
          resolve();
        };
        img.onload = () => {
          markLoaded(i, img);
          done();
        };
        img.onerror = () => done();
        img.src = framePath(i);
      });

    // Reveal anyway after 12s even if a handful of frames never resolve.
    const safety = setTimeout(reveal, 12000);

    (async () => {
      const CONCURRENCY = 16;
      let next = 0;
      const worker = async () => {
        while (!cancelled) {
          const i = next++;
          if (i >= FRAME_COUNT) return;
          await loadFrame(i);
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
      clearTimeout(safety);
      reveal();
    })();

    return () => {
      clearTimeout(safety);
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

      {/* Slim, understated loading bar — shown only while frames preload, so
          the empty space doesn't look broken. No dark placeholder. */}
      {!ready && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: "18%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "2px",
            background: "rgba(17,17,17,0.12)",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              background: "#c9a96e",
              transition: "width 0.2s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}
