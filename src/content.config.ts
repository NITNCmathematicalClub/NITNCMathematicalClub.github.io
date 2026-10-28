import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// カテゴリ（仕様書 §7 の案を当面の決定として採用。お知らせと活動報告を分離）
export const CATEGORIES = [
  "お知らせ",
  "授業・教科解説",
  "大学数学入門",
  "競技数学・入試問題",
  "活動報告",
] as const;

const articles = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.object({
      department: z.string(),
      grade: z.number().int().min(1).max(5),
      // 内部連携用。公開ページには出力しない（仕様書 §7 の著者仕様）
      github: z.string(),
    }),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).max(5).default([]),
    draft: z.boolean().default(false),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { articles };
