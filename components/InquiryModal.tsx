"use client";

/**
 * InquiryModal — a single booking/travel inquiry form, mounted once.
 * Any button opens it by dispatching a window "open-inquiry" CustomEvent
 * (optionally with a { subject } detail). On submit it emails the artist at
 * `contactEmail` with the details filled in — no backend required.
 */

import { useEffect, useRef, useState } from "react";

export interface InquiryModalProps {
  contactEmail: string;
}

const OPEN_EVENT = "open-inquiry";

/** Open the inquiry modal from anywhere on the page. */
export function openInquiry(subject?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { subject } }));
}

export default function InquiryModal({ contactEmail }: InquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("Booking Inquiry");
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ name: "", email: "", location: "", message: "" });

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { subject?: string } | undefined;
      setSubject(detail?.subject || "Booking Inquiry");
      setSent(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => nameRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `City / tour stop: ${form.location}`,
      "",
      "Tattoo idea:",
      form.message,
    ].join("\n");
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  const inputCls =
    "w-full bg-transparent border-b border-text-primary/25 py-2 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={subject}
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(17,17,17,0.6)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="bg-bg-light w-full max-w-md p-7 md:p-9 relative"
        style={{ borderRadius: "4px" }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors text-xl leading-none"
        >
          ×
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <p className="text-xs tracking-widest uppercase text-accent font-body mb-4">
              THANK YOU
            </p>
            <p className="font-body text-text-primary text-sm leading-relaxed mb-6">
              Your email should have opened with the details filled in — just hit
              send and Josh will get back to you. If it didn&apos;t, email{" "}
              <a href={`mailto:${contactEmail}`} className="text-accent underline">
                {contactEmail}
              </a>{" "}
              directly.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-xs tracking-widest uppercase font-body text-text-primary border border-text-primary px-6 py-3 hover:bg-text-primary hover:text-text-light transition-colors"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs tracking-widest uppercase text-accent font-body mb-2">
              {subject}
            </p>
            <h3
              className="hero-headline text-text-primary leading-none mb-6"
              style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)" }}
            >
              LET&apos;S TALK.
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input ref={nameRef} required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
              <input required type="email" value={form.email} onChange={set("email")} placeholder="Email" className={inputCls} />
              <input value={form.location} onChange={set("location")} placeholder="City / tour stop you're interested in" className={inputCls} />
              <textarea required value={form.message} onChange={set("message")} placeholder="Your tattoo idea — placement, size, style" rows={4} className={`${inputCls} resize-none`} />
              <button
                type="submit"
                className="mt-2 self-start inline-flex items-center gap-2 bg-text-primary text-text-light px-8 py-3.5 text-xs tracking-widest uppercase font-body hover:bg-accent transition-colors font-medium"
              >
                SEND INQUIRY ↗
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
