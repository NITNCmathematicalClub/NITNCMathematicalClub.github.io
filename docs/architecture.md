# 設計ガイド（v2.0.0 / Astro）

v2.0.0 の構成です。全体計画は [article-spec.md](article-spec.md) §12、
旧構成（v1: React + Vite の SPA）は `main` ブランチの同名ドキュメントを参照してください。

## 全体構成

- フレームワーク: Astro 7 + TypeScript（strict）
- 出力: 完全な静的 HTML（ビルド成果物は `dist/`）。ページごとに実ファイルが生成されるため、
  v1 で必要だった SPA 向けの 404 リダイレクト回避策は不要になる
- 対話的コンポーネント: Astro Islands として React を使う方針
  （対象: HeroSlider、NoteCalendar、PieChartByGakka、Navbar のモバイルメニュー等。統合は移行基盤の子 Issue で実施）
- スタイル: Tailwind CSS v4（`@tailwindcss/vite` プラグイン + CSS の `@theme` でトークン定義）
- ホスティング: GitHub Pages（GitHub Actions でデプロイ）

## ルーティング

Astro のファイルベースルーティングです。`src/pages/` 配下のファイルがそのまま URL になります。

- `src/pages/index.astro` → `/`
- `src/pages/articles/[...slug].astro` → `/articles/<slug>`（記事詳細。Content Collections から生成）
- 既存パス（`/introduce`、`/activities`、`/exams`、`/note`、`/club-magazine`、`/contact`）は
  v1 と同じパスで維持する（URL 互換性）

## コンテンツの置き方（方針）

- 記事（お知らせ・過去問解説を含む）: Astro の Content Collections で Markdown / MDX として管理する。
  メタデータ（title / date / author / category / tags / draft / description）は front-matter で持つ。
  仕様の詳細は [article-spec.md](article-spec.md) §7 を参照
- 既存ページの本文: `.astro` ページとして移行済み（Phase 2）。文章は各ページに持ち、データは `src/data/` の JSON をビルド時に読み込む
- データファイル（v1 の `public/*.json`）: ビルド時に読み込む形へ移し替える。画像・PDF は `public/` に置く

## コンポーネント

- 共通レイアウトは `src/layouts/`、共通部品は `src/components/`（v1 の部品は必要に応じて
  `.astro` 化するか、Islands として React のまま持ってくる）
- 目次は Markdown の見出しから静的生成し、スクロール連動だけを軽い JS で行う

## デザイン

- デザインは Figma で先に作成する（Phase 0）。方針は「企業の公式サイトのような、
  汎用的で尖りすぎないデザイン」。具体像は [article-spec.md](article-spec.md) §12.8 を参照
- デザイントークン（色・フォント・余白）は Figma 側で定め、実装は Tailwind v4 の `@theme` に写す
