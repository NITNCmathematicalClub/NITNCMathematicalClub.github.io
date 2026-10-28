import { getCollection, type CollectionEntry } from "astro:content";
import { categoryOfFolder, NEWS_CATEGORY, REPORTS_CATEGORY } from "../content/categories";

// 3コレクション（数学記事・お知らせ・活動報告）を共通の形に正規化する（Issue #48）
// - slug: 公開 URL（/articles/<slug>）に使うファイル名部分。フォルダ名は含めない
// - category: 日本語表示名。数学記事はフォルダ名から、お知らせ・活動報告はコレクションから導出する
export type EntryKind = "article" | "news" | "report";

type AnyEntry = CollectionEntry<"articles" | "news" | "reports">;

export interface SiteEntry {
  slug: string;
  kind: EntryKind;
  category: string;
  data: AnyEntry["data"];
  /** 描画（render）などに使う元エントリ */
  raw: AnyEntry;
}

const byDateDesc = (a: SiteEntry, b: SiteEntry) => b.data.date.getTime() - a.data.date.getTime();

function normalize(entry: AnyEntry, kind: EntryKind): SiteEntry {
  const segments = entry.id.split("/");
  const slug = segments[segments.length - 1];
  const category =
    kind === "news"
      ? NEWS_CATEGORY
      : kind === "report"
        ? REPORTS_CATEGORY
        : categoryOfFolder(segments.slice(0, -1).join("/"));
  return { slug, kind, category, data: entry.data, raw: entry };
}

async function load(kind: EntryKind): Promise<SiteEntry[]> {
  const collection = kind === "article" ? "articles" : kind === "news" ? "news" : "reports";
  const entries = await getCollection(collection);
  return entries.map((e) => normalize(e, kind)).sort(byDateDesc);
}

/** 数学記事のみ（下書きを含む。日付の新しい順） */
export const getArticles = () => load("article");

/** お知らせのみ（下書きを含む。日付の新しい順） */
export const getNews = () => load("news");

/** 活動報告のみ（下書きを含む。日付の新しい順） */
export const getReportArticles = () => load("report");

/** 全コンテンツ統合（下書きを含む。日付の新しい順） */
export async function getAllEntries(): Promise<SiteEntry[]> {
  const all = await Promise.all([getArticles(), getNews(), getReportArticles()]);
  return all.flat().sort(byDateDesc);
}
