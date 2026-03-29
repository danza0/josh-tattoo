"use client";

/**
 * ClientSections — thin client boundary that hosts all dynamic imports
 * that require { ssr: false }.
 *
 * Next.js 15 enforces that `dynamic(..., { ssr: false })` may only be called
 * inside a Client Component. Since `app/page.tsx` is a Server Component (to
 * keep the `metadata` export), this file acts as the client-side boundary for
 * any component that must never be rendered on the server.
 */

import dynamic from "next/dynamic";

export const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
export const StatueSection = dynamic(
  () => import("@/components/StatueSection"),
  { ssr: false }
);
