import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "about",
      title: "About text",
      type: "text",
      rows: 5,
      description: "Shown over the statue in the About overlay.",
    }),
    defineField({
      name: "philosophyQuote",
      title: "Philosophy quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sidenote",
      title: "Sidenote text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "availability",
      title: "Availability section",
      type: "object",
      fields: [
        defineField({ name: "headlineScript", title: "Headline (script line)", type: "string" }),
        defineField({ name: "headlineBold", title: "Headline (bold line)", type: "string" }),
        defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3 }),
        defineField({
          name: "details",
          title: "Detail rows",
          type: "array",
          of: [
            defineField({
              name: "row",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
              preview: {
                select: { title: "label", subtitle: "value" },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
