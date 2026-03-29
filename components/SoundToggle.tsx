"use client";

/**
 * SoundToggle — ambient music on/off toggle using HTML5 Audio.
 * Default state is OFF (no autoplay).
 * Pass an `src` prop with the audio file path.
 */

import { useState, useRef, useEffect } from "react";

interface SoundToggleProps {
  src?: string;
}

export default function SoundToggle({ src = "/audio/ambient.mp3" }: SoundToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const fadeVolume = (from: number, to: number, duration = 800) => {
    const audio = audioRef.current;
    if (!audio) return;
    const steps = 20;
    const stepTime = duration / steps;
    const diff = (to - from) / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      audio.volume = Math.min(1, Math.max(0, from + diff * step));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.volume = 0;
      await audio.play().catch(() => {
        // Browser may block autoplay — silently fail
      });
      fadeVolume(0, 0.4);
      setIsPlaying(true);
    } else {
      fadeVolume(0.4, 0, 600);
      setTimeout(() => audio.pause(), 700);
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 text-xs tracking-widest uppercase text-current hover:text-accent transition-colors duration-300 focus:outline-none"
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {/* Speaker icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isPlaying ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
      <span>SOUND: {isPlaying ? "ON" : "OFF"}</span>
    </button>
  );
}
