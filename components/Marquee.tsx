"use client";

/**
 * Marquee — Infinite horizontal ticker bar.
 * Pure CSS animation — no JS scroll dependency.
 * Dark background, all-caps condensed text.
 */

const TICKER_CONTENT =
  "FINE LINE · SACRED GEOMETRY · CLASSICAL REALISM · BLACK & GREY · MEMENTO VIVERE · JOSH SWID · VANCOUVER · ZEN TATTOO · CUSTOM ONLY";

export default function Marquee() {
  // Double the content so seamless looping looks natural
  const repeated = `${TICKER_CONTENT}   ${TICKER_CONTENT}   `;

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
