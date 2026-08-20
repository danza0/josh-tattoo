import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { travelDate } from "./travelDate";
import { portfolioItem } from "./portfolioItem";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  travelDate,
  portfolioItem,
  testimonial,
];

export const schema = { types: schemaTypes };
