"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StatueModel from "./StatueModel";
import { DEFAULT_SITE } from "@/lib/content-types";

interface StatueSectionProps {
  about?: string;
  philosophyQuote?: string;
  sidenote?: string;
}

export default function StatueSection({
  about = DEFAULT_SITE.about,
  philosophyQuote = DEFAULT_SITE.philosophyQuote,
  sidenote = DEFAULT_SITE.sidenote,
}: StatueSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // On mobile the three overlays share the same bottom slot, so they must be
  // fully sequential with snappy fades (short in/out, long hold) so the text
  // spends as little time as possible at a partial, hard-to-read opacity.
  // On desktop they sit at different edges and keep the original timing.
  const aboutRange = isMobile ? [0.3, 0.34, 0.5, 0.54] : [0.4, 0.5, 0.6, 0.7];
  const sidenoteRange = isMobile ? [0.56, 0.6, 0.74, 0.78] : [0.55, 0.65, 0.75, 0.82];
  const philosophyRange = isMobile ? [0.8, 0.84, 0.96, 1] : [0.75, 0.85, 0.93, 1];

  const aboutOpacity = useTransform(scrollYProgress, aboutRange, [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [aboutRange[0], aboutRange[1]], ["40px", "0px"]);

  const sidenoteOpacity = useTransform(scrollYProgress, sidenoteRange, [0, 1, 1, 0]);
  const sidenoteY = useTransform(scrollYProgress, [sidenoteRange[0], sidenoteRange[1]], ["30px", "0px"]);

  const philosophyOpacity = useTransform(scrollYProgress, philosophyRange, [0, 1, 1, 0]);
  const philosophyY = useTransform(scrollYProgress, [philosophyRange[0], philosophyRange[1]], ["40px", "0px"]);

  // Persistent dark scrim behind the mobile text zone. It fades in once the
  // overlays begin (~0.25) and stays, so text is ALWAYS on a readable base
  // even while an individual card is mid-fade. Independent of card opacity.
  const scrimOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.98, 1], [0, 1, 1, 0]);

  // Overlay treatment (matches the SIDENOTE card the client said reads well):
  //  - mobile: light text on the shared bottom scrim, no per-card box.
  //  - desktop: a solid dark card on the stone margin, so the statue can never
  //    bleed through the text.
  const cardBase =
    "absolute z-20 text-text-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] " +
    "md:p-5 md:rounded-sm md:bg-[#1a1815] md:text-[#f5f2ee] md:drop-shadow-none";
  const mobileBottomSlot = "left-5 right-5 bottom-20 max-w-none";

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative"
      style={{ height: "400vh", marginTop: "-100vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <div className="absolute inset-0 z-10">
          <StatueModel
            scrollYProgress={frameProgress}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Persistent bottom scrim — mobile only. Keeps overlay text readable
            over the statue regardless of each card's fade state. */}
        <motion.div
          aria-hidden
          style={{ opacity: scrimOpacity }}
          className="md:hidden absolute inset-x-0 bottom-0 h-[62%] z-[15] pointer-events-none bg-gradient-to-t from-black/85 via-black/55 to-transparent"
        />

        {/* ABOUT */}
        <motion.div
          style={{ opacity: aboutOpacity, y: aboutY }}
          className={`${cardBase} ${mobileBottomSlot} md:left-12 md:right-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-xs`}
        >
          <p className="text-xs tracking-widest uppercase text-accent font-body mb-3 md:mb-4">
            ABOUT
          </p>
          <p className="font-body leading-relaxed text-sm md:text-base">
            {about}
          </p>
        </motion.div>

        {/* SIDENOTE — light text on the shared scrim on mobile; a dark card on
            the desktop right margin. */}
        <motion.div
          style={{ opacity: sidenoteOpacity, y: sidenoteY }}
          className="absolute z-20 text-text-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] left-5 right-5 bottom-20 max-w-none md:left-auto md:right-12 md:bottom-16 md:max-w-[260px] md:p-5 md:rounded-sm md:bg-[#1a1815] md:text-[#f5f2ee] md:drop-shadow-none"
        >
          <p className="text-xs tracking-widest uppercase text-accent font-body mb-3">
            SIDENOTE
          </p>
          <p className="text-sm font-body leading-relaxed md:opacity-80">
            {sidenote}
          </p>
        </motion.div>

        {/* PHILOSOPHY */}
        <motion.div
          style={{ opacity: philosophyOpacity, y: philosophyY }}
          className={`${cardBase} ${mobileBottomSlot} md:left-auto md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-xs`}
        >
          <p className="text-xs tracking-widest uppercase text-accent font-body mb-3 md:mb-4">
            PHILOSOPHY
          </p>
          <p className="font-body leading-relaxed text-sm md:text-base italic font-serif">
            &ldquo;{philosophyQuote}&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}
