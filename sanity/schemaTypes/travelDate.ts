import { defineType, defineField } from "sanity";

export const travelDate = defineType({
  name: "travelDate",
  title: "Travel Date",
  type: "document",
  fields: [
    defineField({ name: "city", title: "City", type: "string", validation: (r) => r.required() }),
    defineField({ name: "studio", title: "Studio", type: "string" }),
    defineField({
      name: "dates",
      title: "Dates",
      type: "string",
      description: 'Free text, e.g. "May 15–18, 2025".',
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["BOOKING OPEN", "WAITLIST", "COMING SOON", "COMPLETED"],
        layout: "radio",
      },
      initialValue: "BOOKING OPEN",
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
    select: { title: "city", subtitle: "dates" },
  },
});
