import { defineType, defineField } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Piece",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Label / alt text",
      type: "string",
      description: "Shown on hover and used for accessibility.",
    }),
    defineField({
      name: "aspect",
      title: "Shape",
      type: "string",
      description: "Controls the tile proportions in the grid.",
      options: {
        list: [
          { title: "Portrait (3:4)", value: "aspect-[3/4]" },
          { title: "Tall (2:3)", value: "aspect-[2/3]" },
          { title: "Square", value: "aspect-square" },
          { title: "Portrait (4:5)", value: "aspect-[4/5]" },
        ],
      },
      initialValue: "aspect-[3/4]",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "label", media: "image" },
  },
});
