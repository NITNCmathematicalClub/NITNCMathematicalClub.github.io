// 記事タグの定義表（Issue #47）
//
// 数学記事の分類は、フォルダ＋カテゴリ方式を廃止し、front-matter の `tags` で
// 行います（複数指定可）。値は分野ベースの固定25種から slug で選び、定義外の
// slug を書くとビルドエラーになります（検証は src/content.config.ts）。
// お知らせ（src/content/news/）と活動報告（src/content/reports/）の tags は
// 従来どおり自由な文字列で、この定義表の対象外です。

/** タグの分野 */
export const TAG_FIELDS = ["数学", "物理", "化学"] as const;
export type TagField = (typeof TAG_FIELDS)[number];

export interface TagDefinition {
  /** サイトに表示する日本語名 */
  label: string;
  /** 英語名 */
  en: string;
  /** 分野 */
  field: TagField;
}

/** 記事タグの定義表（slug → 表示名・英語名・分野）。並びがチップ等の表示順 */
export const ARTICLE_TAGS = {
  // 数学
  information: { label: "情報", en: "Information", field: "数学" },
  "theory-of-computation": { label: "計算理論", en: "Theory of Computation", field: "数学" },
  programming: { label: "プログラミング", en: "Programming", field: "数学" },
  algebra: { label: "代数", en: "Algebra", field: "数学" },
  geometry: { label: "幾何", en: "Geometry", field: "数学" },
  analysis: { label: "解析", en: "Analysis", field: "数学" },
  "probability-and-statistics": { label: "確率/統計", en: "Probability and Statistics", field: "数学" },
  "set-theory-and-logic": { label: "集合/論理", en: "Set Theory and Logic", field: "数学" },
  // 物理
  mechanics: { label: "力学", en: "Mechanics", field: "物理" },
  electromagnetism: { label: "電磁気学", en: "Electromagnetism", field: "物理" },
  thermodynamics: { label: "熱力学", en: "Thermodynamics", field: "物理" },
  "statistical-mechanics": { label: "統計力学", en: "Statistical Mechanics", field: "物理" },
  "quantum-mechanics": { label: "量子力学", en: "Quantum Mechanics", field: "物理" },
  relativity: { label: "相対性理論", en: "Relativity", field: "物理" },
  waves: { label: "波動", en: "Waves", field: "物理" },
  optics: { label: "光学", en: "Optics", field: "物理" },
  "fluid-mechanics": { label: "流体力学", en: "Fluid Mechanics", field: "物理" },
  "condensed-matter-physics": { label: "物性物理学", en: "Condensed Matter Physics", field: "物理" },
  // 化学
  "inorganic-chemistry": { label: "無機化学", en: "Inorganic Chemistry", field: "化学" },
  "organic-chemistry": { label: "有機化学", en: "Organic Chemistry", field: "化学" },
  "physical-chemistry": { label: "物理化学", en: "Physical Chemistry", field: "化学" },
  "analytical-chemistry": { label: "分析化学", en: "Analytical Chemistry", field: "化学" },
  biochemistry: { label: "生物化学", en: "Biochemistry", field: "化学" },
  "chemical-engineering": { label: "化学工学", en: "Chemical Engineering", field: "化学" },
  "polymer-chemistry": { label: "高分子化学", en: "Polymer Chemistry", field: "化学" },
} as const satisfies Record<string, TagDefinition>;

export type ArticleTagSlug = keyof typeof ARTICLE_TAGS;

/** 定義済みタグの slug 一覧（定義表の並び順） */
export const ARTICLE_TAG_SLUGS = Object.keys(ARTICLE_TAGS) as ArticleTagSlug[];

/** 定義済みタグの一覧（slug つき。チップ等の表示用） */
export const ARTICLE_TAG_LIST = ARTICLE_TAG_SLUGS.map((slug) => ({
  slug,
  ...ARTICLE_TAGS[slug],
}));

/** slug から表示名を引く。定義外なら undefined */
export function tagLabel(slug: string): string | undefined {
  return (ARTICLE_TAGS as Record<string, TagDefinition>)[slug]?.label;
}
