"use client";

/**
 * StatueSection — Scroll-driven sticky section.
 * The statue placeholder stays fixed while content (About, Philosophy,
 * Sidenote) fades in at different scroll positions using Framer Motion's
 * useScroll + useTransform.
 * Section height = 300vh to allow enough scroll room.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StatueSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content opacity/position at different scroll points
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0, 0.15], ["40px", "0px"]);

  const sidenoteOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const sidenoteY = useTransform(scrollYProgress, [0.3, 0.45], ["30px", "0px"]);

  const philosophyOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const philosophyY = useTransform(scrollYProgress, [0.6, 0.75], ["40px", "0px"]);

  // Subtle statue rotation (simulated with CSS rotate)
  const statueRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "8deg"]);
  const statueScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-bg-stone"
      style={{ height: "300vh" }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── Statue placeholder (centred, sticky) ── */}
        <motion.div
          style={{ rotate: statueRotate, scale: statueScale }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div
            className="flex flex-col items-center justify-center rounded-t-[50%] rounded-b-[20%] relative"
            style={{
              width: "clamp(180px, 22vw, 360px)",
              height: "clamp(300px, 45vw, 620px)",
              background:
                "linear-gradient(160deg, #2a2826 0%, #1a1815 50%, #0e0d0c 100%)",
              boxShadow:
                "0 20px 80px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-col items-center gap-3 opacity-15">
              <div className="w-14 h-18 rounded-full border border-white/40" />
              <div className="w-7 h-7 border-x border-white/40" />
              <div className="w-32 h-px border-t border-white/40" />
            </div>
            <p className="mt-4 text-white/30 uppercase tracking-[0.35em] font-body" style={{ fontSize: "0.55rem" }}>
              3D STATUE
            </p>
          </div>
        </motion.div>

        {/* ── ABOUT text — appears left side ── */}
        <motion.div
          style={{ opacity: aboutOpacity, y: aboutY }}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-xs z-20"
        >
          <p className="text-xs tracking-widest uppercase text-text-muted font-body mb-4">
            ABOUT
          </p>
          <p className="text-text-primary font-body leading-relaxed text-sm md:text-base">
            Josh Swid is a Vancouver-based tattoo artist. Most of his work
            happens before the needle touches skin. He draws from classical
            mythology, Stoic philosophy, sacred geometry. Subjects with real
            depth, built in black and grey, designed for your body specifically.
            He doesn&apos;t do flash. Every piece is its own world.
          </p>
        </motion.div>

        {/* ── Sidenote tooltip — appears bottom-right ── */}
        <motion.div
          style={{ opacity: sidenoteOpacity, y: sidenoteY }}
          className="absolute right-6 md:right-12 bottom-16 max-w-[260px] z-20"
        >
          <div
            className="p-5 rounded-sm"
            style={{ background: "#1a1815", color: "#f5f2ee" }}
          >
            <p className="text-xs tracking-widest uppercase text-accent font-body mb-3">
              SIDENOTE
            </p>
            <p className="text-sm font-body leading-relaxed opacity-80">
              Each piece is custom designed — drawn for you alone. No flash. No
              templates. Your tattoo exists nowhere else.
            </p>
          </div>
        </motion.div>

        {/* ── Philosophy text — appears right side ── */}
        <motion.div
          style={{ opacity: philosophyOpacity, y: philosophyY }}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 max-w-xs z-20"
        >
          <p className="text-xs tracking-widest uppercase text-text-muted font-body mb-4">
            PHILOSOPHY
          </p>
          <p className="text-text-primary font-body leading-relaxed text-sm md:text-base italic font-serif">
            &ldquo;My approach to designing tattoos is intentional. It creates
            space to think, refine, and allow you to commit with confidence.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}
