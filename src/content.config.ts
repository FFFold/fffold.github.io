import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Note: `--isolatedDeclarations` cannot infer the type of an object literal
// holding multiple `defineCollection()` results (TS9013). The explicit
// annotation keeps `pnpm type-check` green; schema validation still runs at
// runtime via zod. Trade-off: editor-time `entry.data` typing degrades to
// `any` for content collections.
// biome-ignore lint/suspicious/noExplicitAny: required by the isolatedDeclarations workaround above
export const collections: Record<string, CollectionConfig<any, any>> = {
	posts: defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				published: z.date(),
				updated: z.date().optional(),
				draft: z.boolean().optional().default(false),
				description: z.string().optional().default(""),
				image: image().optional(),
				tags: z.array(z.string()).optional().default([]),
				category: z.string().optional().nullable().default(""),
				lang: z.string().optional().default(""),
				pinned: z.boolean().optional().default(false),

				/* For internal use */
				prevTitle: z.string().default(""),
				prevSlug: z.string().default(""),
				nextTitle: z.string().default(""),
				nextSlug: z.string().default(""),
			}),
	}),
	spec: defineCollection({
		loader: glob({ pattern: "**/*.md", base: "./src/content/spec" }),
		schema: z.object({}),
	}),
};
