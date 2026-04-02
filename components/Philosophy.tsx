"use client";

/**
 * Philosophy — Full-width dark quote section with Josh portrait.
 * Large italic serif quote + "PHILOSOPHY" label.
 */

import Image from "next/image";
import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="bg-bg-dark py-24 md:py-32 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — Quote */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-xs tracking-widest uppercase text-accent font-body mb-8">
            PHILOSOPHY
          </p>
          <blockquote
            className="text-text-light font-serif italic leading-snug"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 3rem)" }}
          >
            &ldquo;My approach to designing tattoos is intentional. It creates
            space to think, refine, and allow you to commit with confidence.&rdquo;
          </blockquote>
          <p className="mt-8 text-text-muted text-xs tracking-widest uppercase font-body">
            — Josh Swid
          </p>
        </motion.div>

        {/* Right — Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: "clamp(220px, 40vw, 480px)",
              height: "clamp(280px, 50vw, 600px)",
              borderRadius: "4px",
            }}
          >
            <Image
              src="/portrait/josh-portrait.jpg"
              alt="Josh Swid — Tattoo Artist"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
              priority={false}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}