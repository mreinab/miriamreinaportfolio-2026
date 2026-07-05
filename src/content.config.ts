import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  cover: z.string(),
  tags: z.array(z.string()),
  order: z.number(),
  summary: z.string(),
  featured: z.boolean().default(false),
});

const graphicdesign = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/graphicdesign' }),
  schema: projectSchema,
});

const fashion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fashion' }),
  schema: projectSchema,
});

const webdev = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/webdev' }),
  schema: projectSchema.extend({
    link: z.string().url().optional(),
  }),
});

export const collections = { graphicdesign, fashion, webdev };
