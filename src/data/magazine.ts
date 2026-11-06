// 部誌『Σ』の各号データ（Issue #50）
// 号が増えたら、この配列に1件追加するだけで部誌ページに載ります。
// 目次は第1〜6号が実物（ページ数は不明のため未記載）、第9〜11号は当面サンプル文です。
// 実物の目次が分かり次第、ここを差し替えてください。

export interface MagazineIssue {
  /** 号数（例: 11 → 「第11号」） */
  number: number;
  /** 発売日（高専祭の日）の表示文字列。不明な号は省略できる */
  releaseDate?: string;
  /** 表紙写真のパス（絶対パス）。号ごとに用意できたら差し替える */
  cover: string;
  /** 目次（タイトルと開始ページ。ページ数が不明な号は page を省略する） */
  toc: { title: string; page?: number }[];
}

/** 新しい号が先頭 */
export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    number: 11,
    releaseDate: "2025年11月8日（高専祭）",
    cover: "/img/no-image.svg",
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
    cover: "/img/no-image.svg",
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
  {
    number: 6,
    cover: "/img/no-image.svg",
    toc: [
      { title: "アルゴリズムとは" },
      { title: "ラプラス変換を用いた過渡解析" },
      { title: "金属材料" },
      { title: "好きのベクトル" },
      { title: "数列の足し合わせと冪乗和の計算について" },
      { title: "世界を支配する方程式" },
      { title: "魔法人の書き方" },
    ],
  },
  {
    number: 5,
    cover: "/img/no-image.svg",
    toc: [
      { title: "1. 四次方程式の解法" },
      { title: "2. 複素数と電気" },
      { title: "3. 連分数を用いた約分" },
      { title: "4. モンティ・ホール問題" },
      { title: "5. 証明と鳩の巣論法" },
      { title: "6. 一筆書き完全攻略" },
      { title: "7. Stefan-Boltzmannの法則の導出" },
      { title: "8. 身近な蛍光物質の調査" },
      { title: "9. OB・OGからの寄稿" },
      { title: "9-1. マイクロフローリアクター内での「pH瞬間転換」と「瞬間両基質活性化」" },
      { title: "9-2. 宇宙の航海図を描く" },
      { title: "9-3. 植物のアスコルピン酸(ビタミンC)強化を目指した生合成改変に関する研究" },
    ],
  },
  {
    number: 4,
    cover: "/img/no-image.svg",
    toc: [
      { title: "1. 先入観と数学" },
      { title: "2. 太陽風による影響と対策" },
      { title: "3. 計算を工夫してみる" },
      { title: "4. 実験と測定の不確かさ" },
      { title: "5. 状態変数型フィルタ回路の回路解析" },
      { title: "6. 星形正多角形を考える" },
      { title: "7. 単位を利用した解析法" },
      { title: "8. 3次方程式の解" },
      { title: "9. 体験授業補助プリント" },
      { title: "9-1. サマーウォーズ-日付から曜日を-" },
      { title: "9-2. インド式計算" },
    ],
  },
  {
    number: 3,
    cover: "/img/no-image.svg",
    toc: [
      { title: "1. 自然単位系" },
      { title: "2. 数列と黄金比" },
      { title: "3. 光線群からなるカップ内カージオイド" },
      { title: "4. 円周率" },
      { title: "5. 相対性理論" },
      { title: "6. LaTex入門" },
      { title: "7. 付録" },
      { title: "7-1. サマーウォーズ" },
      { title: "7-2. インド式計算" },
    ],
  },
  {
    number: 2,
    cover: "/img/no-image.svg",
    toc: [
      { title: "1. 球面上の図形の面積を求める" },
      { title: "2. ニューラルネットワーク" },
      { title: "3. 暦はグレゴリオ歴に限る" },
      { title: "4. 集合を同値関係で割る" },
      { title: "5. ブラックホール" },
      { title: "付録. 中学生のための体験授業「サマーウォーズ」(10/15実施)" },
    ],
  },
  {
    number: 1,
    cover: "/img/no-image.svg",
    toc: [
      { title: "1. 面積ゼロのカーペット" },
      { title: "2. ベクトル空間" },
      { title: "3. 核融合入門" },
      { title: "4. 無限のパラドックス" },
      { title: "5. 統計学入門" },
      { title: "6. 元素変換" },
      { title: "付録. 東工大 化学過去問解答" },
    ],
  },
];
