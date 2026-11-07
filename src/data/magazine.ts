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
    releaseDate: "2026年11月7日",
    cover: "/img/ClubMagazine/sigma-11.jpg",
    toc: [
      { title: "ショートテキスト: 有限次元ベクトル空間自作キット", page: 1 },
      { title: "量子コンピュータの雰囲気を掴もう", page: 17 },
      { title: "ブール代数, まじで何", page: 29 },
      { title: "5次方程式の解の公式", page: 41 },
      { title: "交通工学の数学", page: 45 },
      { title: "微積問題つくったよ", page: 59 },
      { title: "∑の問題をシステマチックに倒す", page: 67 },
    ],
  },
  {
    number: 10,
    releaseDate: "2025年11月8日",
    cover: "/img/ClubMagazine/sigma-10.jpg",
    toc: [
      { title: "対数による計算", page: 1 },
      { title: "ぼくがかんがえたさいきょうのみずでっぽう", page: 3 },
      { title: "女子寮を投石によって破壊する", page: 9 },
      { title: "失われたゲーム機を求めて", page: 19 },
      { title: "ブラックホールをレイトレーシングで見てみよう", page: 21 },
      { title: "最短経路問題に対するアルゴリズムについて", page: 37 },
      { title: "工夫が必要な問題で工夫をしない・単発週", page: 43 },
      { title: "M87銀河の中心のブラックホール画像の解説", page: 53 },
    ],
  },
  {
    number: 9,
    releaseDate: "2024年11月9日",
    cover: "/img/ClubMagazine/sigma-9.jpg",
    toc: [],
  },
  {
    number: 8,
    releaseDate: "2023年11月11日",
    cover: "/img/no-image.svg",
    toc: [],
  },
  {
    number: 7,
    releaseDate: "2022年10月29日",
    cover: "/img/no-image.svg",
    toc: [],
  },
  {
    number: 6,
    releaseDate: "2021年10月30日",
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
      { title: "四次方程式の解法" },
      { title: "複素数と電気" },
      { title: "連分数を用いた約分" },
      { title: "モンティ・ホール問題" },
      { title: "証明と鳩の巣論法" },
      { title: "一筆書き完全攻略" },
      { title: "Stefan-Boltzmannの法則の導出" },
      { title: "身近な蛍光物質の調査" },
      {
        title:
          "OB・OGからの寄稿. マイクロフローリアクター内での「pH瞬間転換」と「瞬間両基質活性化」",
      },
      { title: "OB・OGからの寄稿. 宇宙の航海図を描く" },
      {
        title:
          "OB・OGからの寄稿. 植物のアスコルピン酸(ビタミンC)強化を目指した生合成改変に関する研究",
      },
    ],
  },
  {
    number: 4,
    releaseDate: "2019年11月2日",
    cover: "/img/no-image.svg",
    toc: [
      { title: "先入観と数学" },
      { title: "太陽風による影響と対策" },
      { title: "計算を工夫してみる" },
      { title: "実験と測定の不確かさ" },
      { title: "状態変数型フィルタ回路の回路解析" },
      { title: "星形正多角形を考える" },
      { title: "単位を利用した解析法" },
      { title: "3次方程式の解" },
      { title: "体験授業補助プリント. サマーウォーズ-日付から曜日を-" },
      { title: "体験授業補助プリント. インド式計算" },
    ],
  },
  {
    number: 3,
    releaseDate: "2018年11月10日",
    cover: "/img/no-image.svg",
    toc: [
      { title: "自然単位系" },
      { title: "数列と黄金比" },
      { title: "光線群からなるカップ内カージオイド" },
      { title: "円周率" },
      { title: "相対性理論" },
      { title: "LaTex入門" },
      { title: "付録. サマーウォーズ" },
      { title: "付録. インド式計算" },
    ],
  },
  {
    number: 2,
    releaseDate: "2017年11月3日",
    cover: "/img/no-image.svg",
    toc: [
      { title: "球面上の図形の面積を求める" },
      { title: "ニューラルネットワーク" },
      { title: "暦はグレゴリオ歴に限る" },
      { title: "集合を同値関係で割る" },
      { title: "ブラックホール" },
      { title: "付録. 中学生のための体験授業「サマーウォーズ」(10/15実施)" },
    ],
  },
  {
    number: 1,
    releaseDate: "2016年11月5日",
    cover: "/img/no-image.svg",
    toc: [
      { title: "面積ゼロのカーペット" },
      { title: "ベクトル空間" },
      { title: "核融合入門" },
      { title: "無限のパラドックス" },
      { title: "統計学入門" },
      { title: "元素変換" },
      { title: "付録. 東工大 化学過去問解答" },
    ],
  },
];
