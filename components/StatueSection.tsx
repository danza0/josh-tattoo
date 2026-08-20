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
  // fully sequential. On desktop they sit at different edges and may overlap.
  const aboutRange = isMobile ? [0.3, 0.38, 0.5, 0.56] : [0.4, 0.5, 0.6, 0.7];
  const sidenoteRange = isMobile ? [0.56, 0.63, 0.74, 0.8] : [0.55, 0.65, 0.75, 0.82];
  const philosophyRange = isMobile ? [0.8, 0.87, 0.95, 1] : [0.75, 0.85, 0.93, 1];

  const aboutOpacity = useTransform(scrollYProgress, aboutRange, [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [aboutRange[0], aboutRange[1]], ["40px", "0px"]);

  const sidenoteOpacity = useTransform(scrollYProgress, sidenoteRange, [0, 1, 1, 0]);
  const sidenoteY = useTransform(scrollYProgress, [sidenoteRange[0], sidenoteRange[1]], ["30px", "0px"]);

  const philosophyOpacity = useTransform(scrollYProgress, philosophyRange, [0, 1, 1, 0]);
  const philosophyY = useTransform(scrollYProgress, [philosophyRange[0], philosophyRange[1]], ["40px", "0px"]);

  // Card styling: on mobile every overlay gets a dark scrim + light text so it
  // stays readable over the statue; on desktop it's plain text on the stone margin.
  const cardBase =
    "absolute z-20 rounded-sm p-5 bg-black/65 backdrop-blur-sm text-text-light " +
    "md:bg-transparent md:backdrop-blur-none md:p-0 md:text-text-primary md:rounded-none";
  const mobileBottomSlot = "left-4 right-4 bottom-24 max-w-none";

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

        {/* ABOUT */}
        <motion.div
          style={{ opacity: aboutOpacity, y: aboutY }}
          className={`${cardBase} ${mobileBottomSlot} md:left-12 md:right-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-xs`}
        >
          <p className="text-xs tracking-widest uppercase text-accent md:text-text-muted font-body mb-3 md:mb-4">
            ABOUT
          </p>
          <p className="font-body leading-relaxed text-sm md:text-base">
            {about}
          </p>
        </motion.div>

        {/* SIDENOTE — already a dark card; keep it dark on every breakpoint */}
        <motion.div
          style={{ opacity: sidenoteOpacity, y: sidenoteY }}
          className="absolute z-20 rounded-sm p-5 bg-[#1a1815] text-[#f5f2ee] left-4 right-4 bottom-24 max-w-none md:left-auto md:right-12 md:bottom-16 md:max-w-[260px]"
        >
          <p className="text-xs tracking-widest uppercase text-accent font-body mb-3">
            SIDENOTE
          </p>
          <p className="text-sm font-body leading-relaxed opacity-80">
            {sidenote}
          </p>
        </motion.div>

        {/* PHILOSOPHY */}
        <motion.div
          style={{ opacity: philosophyOpacity, y: philosophyY }}
          className={`${cardBase} ${mobileBottomSlot} md:left-auto md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-xs`}
        >
          <p className="text-xs tracking-widest uppercase text-accent md:text-text-muted font-body mb-3 md:mb-4">
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
