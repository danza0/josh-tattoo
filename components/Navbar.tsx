"use client";

/**
 * Navbar — fixed top navigation bar.
 * Left: Josh Swid logo/name
 * Center-left: Sound toggle
 * Center-right: Nav links (Work, About, Process)
 * Right: Book Experience CTA
 * Collapses to hamburger on mobile.
 */

import { useState, useEffect } from "react";
import SoundToggle from "./SoundToggle";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "PROCESS", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-stone/90 backdrop-blur-md border-b border-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* LEFT — Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-headline text-sm md:text-base tracking-widest uppercase text-text-primary hover:text-accent transition-colors duration-300 font-black"
        >
          JOSH SWID
        </a>

        {/* CENTER — Sound toggle + nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <SoundToggle />
          <span className="w-px h-4 bg-current opacity-20" />
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-xs tracking-widest uppercase text-text-primary hover:text-accent transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT — Book CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <a
            href="#availability"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#availability");
            }}
            className="hidden md:inline-flex items-center gap-1 text-xs tracking-widest uppercase text-text-primary border border-text-primary px-4 py-2 hover:bg-text-primary hover:text-text-light transition-all duration-300 font-medium"
          >
            BOOK EXPERIENCE <span className="ml-1">↗</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-bg-stone/95 backdrop-blur-md border-t border-black/10`}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          <SoundToggle />
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm tracking-widest uppercase text-text-primary hover:text-accent transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#availability"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#availability");
            }}
            className="inline-flex items-center gap-1 text-sm tracking-widest uppercase text-text-primary border border-text-primary px-4 py-2 hover:bg-text-primary hover:text-text-light transition-all duration-300 font-medium w-fit"
          >
            BOOK EXPERIENCE ↗
          </a>
        </div>
      </div>
    </header>
  );
}
