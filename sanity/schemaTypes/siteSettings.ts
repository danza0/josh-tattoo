import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * siteSettings — the single "everything else" document.
 * One editable record holding all global text, labels, images and links that
 * aren't already their own document type (travel dates, portfolio, testimonials).
 * Fields are grouped so the Studio form stays navigable.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Content",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & Nav" },
    { name: "hero", title: "Hero" },
    { name: "marquee", title: "Marquee" },
    { name: "about", title: "About / Statue" },
    { name: "portfolio", title: "Portfolio" },
    { name: "booking", title: "Booking CTA" },
    { name: "process", title: "Process" },
    { name: "philosophy", title: "Philosophy" },
    { name: "travel", title: "Travel" },
    { name: "availability", title: "Availability" },
    { name: "instagram", title: "Instagram" },
    { name: "testimonials", title: "Testimonials" },
    { name: "footer", title: "Footer & Contact" },
  ],
  fields: [
    // ── Brand & navigation ──────────────────────────────────────────────────
    defineField({ name: "brandName", title: "Brand name (logo text)", type: "string", group: "brand" }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      group: "brand",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Anchor (e.g. #work)", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "bookLabel", title: "Book button label", type: "string", group: "brand" }),
    defineField({ name: "bookHref", title: "Book button target (e.g. #availability)", type: "string", group: "brand" }),

    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", group: "hero" }),
    defineField({ name: "heroCreditLine1", title: "Credit line 1", type: "string", group: "hero" }),
    defineField({ name: "heroCreditLine2", title: "Credit line 2", type: "string", group: "hero" }),
    defineField({ name: "scrollLabel", title: "Scroll cue text", type: "string", group: "hero" }),

    // ── Marquee ─────────────────────────────────────────────────────────────
    defineField({
      name: "marqueeText",
      title: "Marquee ticker text",
      type: "text",
      rows: 2,
      description: "Separate phrases with ' · '.",
      group: "marquee",
    }),

    // ── About / statue overlays ─────────────────────────────────────────────
    defineField({ name: "about", title: "About paragraph", type: "text", rows: 5, group: "about" }),
    defineField({ name: "sidenote", title: "Sidenote", type: "text", rows: 3, group: "about" }),
    defineField({ name: "philosophyQuote", title: "Philosophy quote", type: "text", rows: 3, group: "about" }),

    // ── Portfolio header ────────────────────────────────────────────────────
    defineField({ name: "workHeadingTop", title: "Heading — top line", type: "string", group: "portfolio" }),
    defineField({ name: "workHeadingBottom", title: "Heading — bottom line", type: "string", group: "portfolio" }),
    defineField({ name: "workSubtitle", title: "Subtitle", type: "string", group: "portfolio" }),

    // ── Booking CTA ─────────────────────────────────────────────────────────
    defineField({ name: "bookingLine1", title: "CTA line 1", type: "string", group: "booking" }),
    defineField({ name: "bookingLine2", title: "CTA line 2 (outlined)", type: "string", group: "booking" }),
    defineField({ name: "bookingSubtext", title: "CTA subtext", type: "string", group: "booking" }),

    // ── Process ─────────────────────────────────────────────────────────────
    defineField({ name: "processLabel", title: "Section label", type: "string", group: "process" }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        }),
      ],
    }),

    // ── Philosophy section ──────────────────────────────────────────────────
    defineField({ name: "philosophyAttribution", title: "Quote attribution", type: "string", group: "philosophy" }),
    defineField({
      name: "portrait",
      title: "Portrait photo",
      type: "image",
      options: { hotspot: true },
      group: "philosophy",
    }),

    // ── Travel header ───────────────────────────────────────────────────────
    defineField({ name: "travelLabel", title: "Section label", type: "string", group: "travel" }),
    defineField({ name: "travelHeadingTop", title: "Heading — top line", type: "string", group: "travel" }),
    defineField({ name: "travelHeadingBottom", title: "Heading — bottom line", type: "string", group: "travel" }),
    defineField({ name: "travelTagline", title: "Tagline", type: "text", rows: 2, group: "travel" }),
    defineField({ name: "travelCtaLabel", title: "CTA label", type: "string", group: "travel" }),

    // ── Availability ────────────────────────────────────────────────────────
    defineField({ name: "availabilityLabel", title: "Section label", type: "string", group: "availability" }),
    defineField({ name: "availabilityCtaLabel", title: "CTA button label", type: "string", group: "availability" }),
    defineField({
      name: "availability",
      title: "Availability details",
      type: "object",
      group: "availability",
      fields: [
        defineField({ name: "headlineScript", title: "Headline (script)", type: "string" }),
        defineField({ name: "headlineBold", title: "Headline (bold)", type: "string" }),
        defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 4 }),
        defineField({
          name: "details",
          title: "Detail rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
              preview: { select: { title: "label", subtitle: "value" } },
            }),
          ],
        }),
      ],
    }),

    // ── Instagram ───────────────────────────────────────────────────────────
    defineField({ name: "instagramHeading", title: "Section heading", type: "string", group: "instagram" }),
    defineField({ name: "instagramFollowLabel", title: "Follow link label", type: "string", group: "instagram" }),
    defineField({ name: "instagramUrl", title: "Instagram profile URL", type: "url", group: "instagram" }),
    defineField({
      name: "reels",
      title: "Reels",
      type: "array",
      group: "instagram",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "link", title: "Instagram reel link", type: "url" }),
            defineField({
              name: "video",
              title: "Video file (optional — falls back to bundled clip)",
              type: "file",
              options: { accept: "video/*" },
            }),
          ],
          preview: { select: { title: "link" } },
        }),
      ],
    }),

    // ── Testimonials header ─────────────────────────────────────────────────
    defineField({ name: "testimonialsHeading", title: "Section heading", type: "string", group: "testimonials" }),

    // ── Footer & contact ────────────────────────────────────────────────────
    defineField({ name: "footerSubscribeHeading", title: "Subscribe heading", type: "string", group: "footer" }),
    defineField({ name: "footerDetails", title: "Footer details paragraph", type: "text", rows: 3, group: "footer" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string", group: "footer" }),
    defineField({ name: "copyright", title: "Copyright line", type: "string", group: "footer" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Content" }),
  },
});
