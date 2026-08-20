import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "stars",
      title: "Stars",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (r) => r.min(1).max(5),
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
    select: { title: "name", subtitle: "text" },
  },
});
