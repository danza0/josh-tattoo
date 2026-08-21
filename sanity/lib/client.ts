import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // No CDN cache — the site reads the very latest published content so Studio
  // edits appear immediately.
  useCdn: false,
});
