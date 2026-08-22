"use client";

/**
 * Preloader — full-screen intro loading screen.
 * Shows a thin progress bar on a clean background while the statue's frame
 * sequence downloads, then fades away to reveal the fully-loaded site.
 */

import { useEffect, useState } from "react";
import { preloadFrames, onFrameProgress } from "@/lib/statueFrames";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // NOTE: we deliberately do NOT lock <html> overflow here. Doing so reflowed
    // the page the instant the statue canvas first sized itself, which left the
    // canvas mis-sized on mobile. The fixed full-screen overlay already hides
    // the page during the brief load.
    let exited = false;
    const exit = () => {
      if (exited) return;
      exited = true;
      setExiting(true);
      window.setTimeout(() => setGone(true), 650);
    };

    const unsub = onFrameProgress(setProgress);
    preloadFrames().then(exit);
    // Safety: never trap the visitor if a few frames stall.
    const safety = window.setTimeout(exit, 15000);

    return () => {
      unsub();
      window.clearTimeout(safety);
    };
  }, []);

  if (gone) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f5f2ee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "22px",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <span
        className="hero-headline"
        style={{
          color: "#111",
          fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
          letterSpacing: "0.12em",
        }}
      >
        JOSH SWID
      </span>

      {/* Track */}
      <div
        style={{
          width: "200px",
          maxWidth: "55vw",
          height: "2px",
          background: "rgba(17,17,17,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: "100%",
            width: `${Math.max(pct, 3)}%`,
            background: "#111",
            transition: "width 0.25s ease",
          }}
        />
      </div>

      <span
        style={{
          color: "rgba(17,17,17,0.45)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {pct}%
      </span>
    </div>
  );
}
