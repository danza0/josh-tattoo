/**
 * /studio — the embedded Sanity editing dashboard.
 * The client visits yoursite.com/studio, logs in, and edits content.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
