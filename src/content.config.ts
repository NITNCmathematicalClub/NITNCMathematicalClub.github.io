import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ARTICLE_TAG_SLUGS } from "./content/tags";

// コレクション共通の front-matter
const baseSchema = {
  title: z.string(),
  date: z.coerce.date(),
  author: z.object({
    department: z.string(),
    grade: z.number().int().min(1).max(5),
    // 内部連携用。公開ページには出力しない（仕様書 §7 の著者仕様）
    github: z.string(),
  }),
  draft: z.boolean().default(false),
  description: z.string(),
  image: z.string().optional(),
};

// 数学記事: articles/ 直下に置き、分類は front-matter の tags で行う（Issue #47）。
// tags は定義表（src/content/tags.ts）の固定25種から slug で選ぶ（複数指定可）。
// 定義外の slug を書くとここでビルドエラーになる
const articles = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/articles" }),
  schema: z.object({
    ...baseSchema,
    tags: z
      .array(z.enum(ARTICLE_TAG_SLUGS as [string, ...string[]]))
      .max(5)
      .default([]),
  }),
});

// お知らせ・活動報告: tags は自由な文字列
const freeTagSchema = z.object({
  ...baseSchema,
  tags: z.array(z.string()).max(5).default([]),
});

// お知らせ
const news = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/news" }),
  schema: freeTagSchema,
});

// 活動報告
const reports = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/reports" }),
  schema: freeTagSchema,
});

export const collections = { articles, news, reports };
