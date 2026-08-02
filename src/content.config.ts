import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const tokenSchema = z.union([
  z.object({
    text: z.string(),
    reading: z.string().optional(),
    plain: z.literal(true),
  }),
  z.object({
    text: z.string(),
    reading: z.string().optional(),
    gloss: z.string().min(1),
    plain: z.literal(false).optional(),
  }),
]);

const exampleSchema = z.object({
  tokens: z.array(tokenSchema),
  english: z.string(),
  note: z.string().optional(),
});

const classes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/classes' }),
  schema: z.object({
    title: z.string(),
    japaneseTitle: z.string(),
    order: z.number(),
    kind: z.enum(['foundation', 'lesson', 'practice']),
    bookLesson: z.number().optional(),
    eyebrow: z.string(),
    summary: z.string(),
    sourceFiles: z.array(z.string()),
    takeaways: z.array(z.string()),
    grammar: z.array(z.object({
      id: z.string(),
      title: z.string(),
      pattern: z.string(),
      summary: z.string(),
      detail: z.string().optional(),
      examples: z.array(exampleSchema),
      caution: z.string().optional(),
    })),
    recall: z.array(z.object({ prompt: z.string(), answer: z.string() })),
    related: z.object({
      particles: z.array(z.string()),
      verbs: z.array(z.string()),
      adjectives: z.array(z.string()),
    }),
  }),
});

export const collections = { classes };
