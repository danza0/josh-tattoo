/**
 * seed.ts — one-time content seeding for Sanity.
 *
 * Preloads the site's current copy, photos, reel videos, travel dates and
 * testimonials into the Sanity dataset, so the Studio opens with everything
 * already filled in and editable (instead of blank fields).
 *
 * Usage (from the repo root):
 *   SANITY_WRITE_TOKEN=xxxxx npx --yes tsx scripts/seed.ts
 *
 * The token needs "Editor" permissions. Project id + dataset are read from
 * .env.local's NEXT_PUBLIC_SANITY_* vars (or the environment). Safe to re-run,
 * though re-running re-uploads the image/video assets.
 */

import { createClient } from "@sanity/client";
import { createReadStream, readFileSync, existsSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_SITE,
  DEFAULT_TRAVEL_DATES,
  DEFAULT_PORTFOLIO,
  DEFAULT_TESTIMONIALS,
} from "../lib/content-types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

// Load NEXT_PUBLIC_SANITY_* from .env.local if not already in the environment.
function loadEnvLocal() {
  const p = resolve(__dirname, "../.env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_WRITE_TOKEN (create one in Sanity → API → Tokens, Editor role)");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}${Date.now().toString(36)}`;
const withKeys = <T extends object>(items: T[]) => items.map((it) => ({ _key: key(), ...it }));

async function uploadAsset(kind: "image" | "file", relPath: string) {
  const abs = resolve(publicDir, relPath.replace(/^\//, ""));
  if (!existsSync(abs)) {
    console.warn(`  ! asset not found, skipping: ${relPath}`);
    return null;
  }
  console.log(`  ↑ uploading ${relPath}`);
  const asset = await client.assets.upload(kind, createReadStream(abs), { filename: basename(abs) });
  return asset._id;
}

const imageRef = (id: string) => ({ _type: "image", asset: { _type: "reference", _ref: id } });
const fileRef = (id: string) => ({ _type: "file", asset: { _type: "reference", _ref: id } });

async function run() {
  console.log(`Seeding project ${projectId} / ${dataset}\n`);
  const S = DEFAULT_SITE;

  // ── Assets ────────────────────────────────────────────────────────────────
  console.log("Uploading images & videos…");
  const portraitId = await uploadAsset("image", S.portraitUrl);

  const reels: Record<string, unknown>[] = [];
  for (let i = 0; i < S.reels.length; i++) {
    const videoId = await uploadAsset("file", S.reels[i].src);
    reels.push({
      _key: key(),
      link: S.reels[i].link,
      ...(videoId ? { video: fileRef(videoId) } : {}),
    });
  }

  // ── siteSettings singleton ─────────────────────────────────────────────────
  console.log("\nWriting Site Content…");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: S.brandName,
    navLinks: withKeys(S.navLinks),
    bookLabel: S.bookLabel,
    bookHref: S.bookHref,
    heroHeadline: S.heroHeadline,
    heroCreditLine1: S.heroCreditLine1,
    heroCreditLine2: S.heroCreditLine2,
    scrollLabel: S.scrollLabel,
    marqueeText: S.marqueeText,
    about: S.about,
    sidenote: S.sidenote,
    philosophyQuote: S.philosophyQuote,
    workHeadingTop: S.workHeadingTop,
    workHeadingBottom: S.workHeadingBottom,
    workSubtitle: S.workSubtitle,
    bookingLine1: S.bookingLine1,
    bookingLine2: S.bookingLine2,
    bookingSubtext: S.bookingSubtext,
    processLabel: S.processLabel,
    processSteps: withKeys(S.processSteps),
    philosophyAttribution: S.philosophyAttribution,
    ...(portraitId ? { portrait: imageRef(portraitId) } : {}),
    travelLabel: S.travelLabel,
    travelHeadingTop: S.travelHeadingTop,
    travelHeadingBottom: S.travelHeadingBottom,
    travelTagline: S.travelTagline,
    travelCtaLabel: S.travelCtaLabel,
    availabilityLabel: S.availabilityLabel,
    availabilityCtaLabel: S.availabilityCtaLabel,
    availability: {
      headlineScript: S.availability.headlineScript,
      headlineBold: S.availability.headlineBold,
      intro: S.availability.intro,
      details: withKeys(S.availability.details),
    },
    instagramHeading: S.instagramHeading,
    instagramFollowLabel: S.instagramFollowLabel,
    instagramUrl: S.instagramUrl,
    reels,
    testimonialsHeading: S.testimonialsHeading,
    footerSubscribeHeading: S.footerSubscribeHeading,
    footerDetails: S.footerDetails,
    contactEmail: S.contactEmail,
    copyright: S.copyright,
  });

  // ── Travel dates ────────────────────────────────────────────────────────────
  console.log("Writing travel dates…");
  for (let i = 0; i < DEFAULT_TRAVEL_DATES.length; i++) {
    await client.createOrReplace({
      _id: `travelDate-${i}`,
      _type: "travelDate",
      order: i,
      ...DEFAULT_TRAVEL_DATES[i],
    });
  }

  // ── Testimonials ────────────────────────────────────────────────────────────
  console.log("Writing testimonials…");
  for (let i = 0; i < DEFAULT_TESTIMONIALS.length; i++) {
    await client.createOrReplace({
      _id: `testimonial-${i}`,
      _type: "testimonial",
      order: i,
      ...DEFAULT_TESTIMONIALS[i],
    });
  }

  // ── Portfolio (upload each image) ───────────────────────────────────────────
  console.log("Writing portfolio…");
  for (let i = 0; i < DEFAULT_PORTFOLIO.length; i++) {
    const item = DEFAULT_PORTFOLIO[i];
    const imgId = await uploadAsset("image", item.src);
    if (!imgId) continue;
    await client.createOrReplace({
      _id: `portfolioItem-${i}`,
      _type: "portfolioItem",
      order: i,
      label: item.label,
      aspect: item.aspect,
      image: imageRef(imgId),
    });
  }

  console.log("\n✅ Done. Open the Studio to see everything filled in.");
}

run().catch((err) => {
  console.error("\n❌ Seed failed:", err.message || err);
  process.exit(1);
});
