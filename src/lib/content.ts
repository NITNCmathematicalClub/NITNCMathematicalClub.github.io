import { getCollection, type CollectionEntry } from "astro:content";
import { tagLabel } from "../content/tags";

// 3コレクション（数学記事・お知らせ・活動報告）を共通の形に正規化する
// - slug: 公開 URL（/articles/<slug>）に使うファイル名部分
// - tags: 表示用に解決したタグ。数学記事は定義表（src/content/tags.ts）の slug を
//   表示名に引き、お知らせ・活動報告は front-matter の文字列をそのまま使う
export type EntryKind = "article" | "news" | "report";

type AnyEntry = CollectionEntry<"articles" | "news" | "reports">;

export interface ResolvedTag {
  slug: string;
  label: string;
}

export interface SiteEntry {
  slug: string;
  kind: EntryKind;
  /** slug と表示名を解決したタグ（表示順は front-matter の並び） */
  tags: ResolvedTag[];
  /** タグの表示名だけの一覧（カードのラベル用） */
  tagLabels: string[];
  data: AnyEntry["data"];
  /** 描画（render）などに使う元エントリ */
  raw: AnyEntry;
}

const byDateDesc = (a: SiteEntry, b: SiteEntry) => b.data.date.getTime() - a.data.date.getTime();

function normalize(entry: AnyEntry, kind: EntryKind): SiteEntry {
  const segments = entry.id.split("/");
  const slug = segments[segments.length - 1];
  const tags: ResolvedTag[] = entry.data.tags.map((t) => {
    const value: string = t;
    return kind === "article"
      ? { slug: value, label: tagLabel(value) ?? value }
      : { slug: value, label: value };
  });
  return { slug, kind, tags, tagLabels: tags.map((t) => t.label), data: entry.data, raw: entry };
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
