"use client";

/**
 * Marquee — Infinite horizontal ticker bar.
 * Pure CSS animation — no JS scroll dependency.
 * Dark background, all-caps condensed text.
 */

import { DEFAULT_SITE, type SiteContent } from "@/lib/content-types";

export default function Marquee({ site = DEFAULT_SITE }: { site?: SiteContent }) {
  // Double the content so seamless looping looks natural
  const repeated = `${site.marqueeText}   ${site.marqueeText}   `;

  return (
    <section aria-label="Style tags ticker" className="overflow-hidden bg-bg-dark py-5">
      <div className="marquee-track select-none">
        {/* Two identical spans so the looping is seamless */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap text-text-light font-headline text-sm md:text-base tracking-widest uppercase pr-16"
            aria-hidden={i === 1}
          >
            {repeated}
          </span>
        ))}
      </div>
    </section>
  );
}
