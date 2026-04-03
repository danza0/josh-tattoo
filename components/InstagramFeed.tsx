"use client";

// To add videos: place reel1.mp4, reel2.mp4, reel3.mp4, reel4.mp4 in /public/reels/
// Download reels from Instagram and rename them accordingly.

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const REELS = [
  {
    id: 1,
    src: "/reels/reel1.mp4",
    link: "https://www.instagram.com/reel/DU8pCbRlPxs/",
  },
  {
    id: 2,
    src: "/reels/reel2.mp4",
    link: "https://www.instagram.com/reel/DWM6e9vjC1a/",
  },
  {
    id: 3,
    src: "/reels/reel3.mp4",
    link: "https://www.instagram.com/reel/DVmBgBCD6BP/",
  },
  {
    id: 4,
    src: "/reels/reel4.mp4",
    link: "https://www.instagram.com/reel/DJFtfGNTWF-/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

function ReelPlayer({
  src,
  link,
  index,
}: {
  src: string;
  link: string;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={fadeUp}
      className="group relative w-full overflow-hidden bg-[#1a1a1a]"
      style={{ aspectRatio: "9 / 16", borderRadius: "4px" }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        aria-label={`Instagram reel ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Play / Pause overlay icon */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200"
        style={{ opacity: playing ? 0 : 1 }}
      >
        {/* Triangle play icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="drop-shadow-lg"
        >
          <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.45)" />
          <polygon points="19,14 37,24 19,34" fill="rgba(255,255,255,0.9)" />
        </svg>
      </div>

      {/* Mute / Unmute button — bottom-left */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-3 left-3 z-10 flex items-center justify-center rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            {/* volume_off: speaker + diagonal slash as a single fill path */}
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>

      {/* View on IG link — bottom-right, only on hover */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 z-10 text-[10px] tracking-widest uppercase text-white/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-white/80 font-body"
      >
        IG ↗
      </a>
    </motion.div>
  );
}

export default function InstagramFeed() {
  return (
    <section className="bg-bg-dark py-24 px-6 md:px-10 lg:px-16">
      {/* Section title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif italic text-text-light mb-14"
        style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
      >
        Instagram
      </motion.h2>

      {/* Reels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {REELS.map((reel, i) => (
          <ReelPlayer key={reel.id} src={reel.src} link={reel.link} index={i} />
        ))}
      </div>

      {/* Follow CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-14 flex justify-center"
      >
        <a
          href="https://instagram.com/joshswid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted text-xs tracking-widest uppercase font-body hover:text-accent transition-colors duration-300 flex items-center gap-2"
        >
          FOLLOW ON INSTAGRAM ↗
        </a>
      </motion.div>
    </section>
  );
}
