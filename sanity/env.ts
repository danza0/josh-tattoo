/**
 * Sanity environment configuration.
 *
 * The site is designed to run WITHOUT Sanity configured — every component ships
 * with hard-coded fallback content. Once the client creates a free Sanity
 * project and sets these two env vars, the CMS takes over automatically.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
 *   NEXT_PUBLIC_SANITY_DATASET=production
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True only when a real project id has been supplied. */
export const hasSanity = projectId.trim().length > 0;
