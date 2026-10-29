// 部誌『Σ』の各号データ（Issue #50）
// 号が増えたら、この配列に1件追加するだけで部誌ページに載ります。
// 目次は当面サンプル文です。実物の目次が分かり次第、ここを差し替えてください。

export interface MagazineIssue {
  /** 号数（例: 11 → 「第11号」） */
  number: number;
  /** 発売日（高専祭の日）の表示文字列 */
  releaseDate: string;
  /** 表紙写真のパス（絶対パス）。号ごとに用意できたら差し替える */
  cover: string;
  /** 目次（タイトルと開始ページ） */
  toc: { title: string; page: number }[];
}

/** 新しい号が先頭 */
export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    number: 11,
    releaseDate: "2025年11月8日（高専祭）",
    cover: "/img/ClubMagazine/cover.jpg",
    toc: [
      { title: "極限の考え方", page: 3 },
      { title: "数列と級数の収束", page: 11 },
      { title: "整数問題の見方", page: 19 },
      { title: "円周率を近似する", page: 27 },
      { title: "グラフ理論入門", page: 35 },
      { title: "編集後記", page: 42 },
    ],
  },
  {
    number: 10,
    releaseDate: "2024年11月2日（高専祭）",
    cover: "/img/ClubMagazine/cover.jpg",
    toc: [
      { title: "微分積分の入口", page: 3 },
      { title: "確率の数え方", page: 9 },
      { title: "合同式の計算", page: 17 },
      { title: "作図と証明", page: 25 },
      { title: "編集後記", page: 33 },
    ],
  },
  {
    number: 9,
    releaseDate: "2023年11月11日（高専祭）",
    cover: "/img/ClubMagazine/cover.jpg",
    toc: [
      { title: "数列の極限まとめ", page: 3 },
      { title: "幾何の証明入門", page: 10 },
      { title: "数学クイズ", page: 18 },
      { title: "編集後記", page: 24 },
    ],
  },
];
