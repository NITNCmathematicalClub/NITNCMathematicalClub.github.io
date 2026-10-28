// コンテンツの分類定義（Issue #48）
//
// 数学記事は src/content/articles/<フォルダ>/ に置き、フォルダ名からカテゴリを
// 自動で決めます（front-matter にカテゴリは書きません）。
// お知らせは src/content/news/、活動報告は src/content/reports/ の専用フォルダです。

/** 数学記事のカテゴリ対応表（英語フォルダ名 ⇔ 日本語表示名） */
export const ARTICLE_CATEGORIES = {
  lesson: "授業・教科解説",
  "university-math": "大学数学入門",
  competition: "競技数学・入試問題",
} as const;

export type ArticleCategoryFolder = keyof typeof ARTICLE_CATEGORIES;

/** お知らせ（src/content/news/）の表示カテゴリ名 */
export const NEWS_CATEGORY = "お知らせ";

/** 活動報告（src/content/reports/）の表示カテゴリ名 */
export const REPORTS_CATEGORY = "活動報告";

/** サイト全体のカテゴリ一覧（チップなどの表示順） */
export const ALL_CATEGORIES = [
  NEWS_CATEGORY,
  ...Object.values(ARTICLE_CATEGORIES),
  REPORTS_CATEGORY,
] as const;

/**
 * 数学記事のフォルダ名から日本語カテゴリ名を引く。
 * 対応表にないフォルダは、そのままの名前を表示名として返す（落とさない）。
 */
export function categoryOfFolder(folder: string): string {
  return (ARTICLE_CATEGORIES as Record<string, string>)[folder] ?? folder;
}
