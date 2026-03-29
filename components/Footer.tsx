"use client";

/**
 * Footer — 4-column dark mega footer.
 * Email subscribe | Navigate | Connect | Details
 * Bottom bar: copyright + back to top
 */

import { useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
  { label: "Book", href: "#availability" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-bg-dark text-text-light pt-20 pb-8 px-6 md:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
      >
        {/* Column 1 — Email subscribe */}
        <div>
          <p className="text-xs tracking-widest uppercase text-text-muted font-body mb-6">
            STAY CONNECTED
          </p>
          {submitted ? (
            <p className="text-accent text-sm font-body">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-transparent border-b border-text-light/20 py-2 text-sm font-body text-text-light placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <button
                type="submit"
                className="self-start text-xs tracking-widest uppercase font-body text-accent hover:text-text-light transition-colors duration-300"
              >
                SUBSCRIBE →
              </button>
            </form>
          )}
        </div>

        {/* Column 2 — Navigate */}
        <div>
          <p className="text-xs tracking-widest uppercase text-text-muted font-body mb-6">
            NAVIGATE
          </p>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm font-body text-text-light/70 hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Connect */}
        <div>
          <p className="text-xs tracking-widest uppercase text-text-muted font-body mb-6">
            CONNECT
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body text-text-light/70 hover:text-accent transition-colors duration-300 flex items-center gap-1"
              >
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href="mailto:josh@joshswid.com"
                className="text-sm font-body text-text-light/70 hover:text-accent transition-colors duration-300 flex items-center gap-1"
              >
                Email ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 — Details */}
        <div>
          <p className="text-xs tracking-widest uppercase text-text-muted font-body mb-6">
            DETAILS
          </p>
          <p className="text-sm font-body text-text-light/60 leading-relaxed">
            Vancouver-based tattoo artist specialising in fine line, sacred
            geometry, and classical realism. Currently guest artist at Zen
            Tattoo Studio, Oakville, ON.
          </p>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-text-light/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-text-muted text-xs font-body tracking-wide">
          © 2026 Josh Swid · All Rights Reserved
        </p>
        <button
          onClick={scrollToTop}
          className="text-text-muted text-xs tracking-widest uppercase font-body hover:text-accent transition-colors duration-300"
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
