import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// コレクション共通の front-matter（カテゴリはフォルダ構成から決まるため持たない。Issue #48）
const entrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.object({
    department: z.string(),
    grade: z.number().int().min(1).max(5),
    // 内部連携用。公開ページには出力しない（仕様書 §7 の著者仕様）
    github: z.string(),
  }),
  tags: z.array(z.string()).max(5).default([]),
  draft: z.boolean().default(false),
  description: z.string(),
  image: z.string().optional(),
});

// 数学記事: articles/<カテゴリフォルダ>/ に置く。カテゴリはフォルダ名から導出する
// （対応表は src/content/categories.ts）。articles 直下のファイル（_template.md 等）は対象外
const articles = defineCollection({
  loader: glob({ pattern: ["*/**/*.md", "!**/_*.md"], base: "./src/content/articles" }),
  schema: entrySchema,
});

// お知らせ
const news = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/news" }),
  schema: entrySchema,
});

// 活動報告
const reports = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/reports" }),
  schema: entrySchema,
});

export const collections = { articles, news, reports };
