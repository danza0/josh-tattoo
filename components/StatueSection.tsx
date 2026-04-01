"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StatueModel from "./StatueModel";

export default function StatueSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Local scroll for text overlays (keyed to the container's own scroll progress)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text overlay keyframes remapped to the 0.33–1.0 active range
  const aboutOpacity = useTransform(scrollYProgress, [0.33, 0.43, 0.57, 0.67], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0.33, 0.43], ["40px", "0px"]);

  const sidenoteOpacity = useTransform(scrollYProgress, [0.53, 0.63, 0.77, 0.83], [0, 1, 1, 0]);
  const sidenoteY = useTransform(scrollYProgress, [0.53, 0.63], ["30px", "0px"]);

  const philosophyOpacity = useTransform(scrollYProgress, [0.73, 0.83, 0.93, 1], [0, 1, 1, 0]);
  const philosophyY = useTransform(scrollYProgress, [0.73, 0.83], ["40px", "0px"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-bg-stone"
      style={{ height: "400vh", marginTop: "-100vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Full-screen autoplay video bust */}
        <div className="absolute inset-0 z-0">
          <StatueModel
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* ABOUT text */}
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

        {/* Sidenote tooltip */}
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

        {/* Philosophy text */}
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

