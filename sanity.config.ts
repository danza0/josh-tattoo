"use client";

/**
 * Sanity Studio configuration — the editing dashboard.
 * Served in-app at /studio (see app/studio/[[...tool]]/page.tsx).
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "josh-swid",
  title: "Josh Swid — Content",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Site Settings as a single (singleton) document
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("travelDate").title("Travel Dates"),
            S.documentTypeListItem("portfolioItem").title("Portfolio Pieces"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
