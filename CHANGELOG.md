# Changelog

このサイトの公開履歴です。形式は [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準じ、
バージョンは Semantic Versioning に従います。

> v1 系（React + Vite）の履歴は、`main` ブランチの `CHANGELOG.md` を参照してください。

## [Unreleased]

v2.0.0（Astro 移行＋記事機能）に向けて作業中です。計画は `docs/article-spec.md` §12 と親 Issue #3 を参照してください。

### Added

- 記事エディタ（Sveltia CMS）を `/admin` に試験導入（記事・お知らせ・活動報告の3コレクション、タグは固定25種から選択。#53）。あわせて PR プレビューの土台として、PR ごとにビルド成果物を残すワークフロー案と手順書（`docs/pr-preview.md`）を追加
- 部誌ページに「各号の紹介」を追加（第9〜11号の表紙・発売日・目次を掲載。号データは `src/data/magazine.ts` で管理）
- 部員向けの執筆ガイド（`docs/content-guide.md`）を追加し、公開前レビューの当面の運用を明記
- カテゴリ別・タグ別の記事一覧ページと、Pagefind によるサイト内検索（`/search`）を追加
- 記事機能を実装（Content Collections による記事管理、記事一覧・詳細ページ、目次、関連記事、ホームへのお知らせ・最近の記事の表示。下書きは本番に含めない）
- 数式表示（remark-math + rehype-katex）を導入し、記事の執筆テンプレート（`src/content/articles/_template.md`）を用意
- 既存ページ（ホーム／概要／活動紹介／過去問解説／雑記帳／部誌／お問い合わせ／404）を Astro へ移行。データ JSON はビルド時読み込みに変更し、画像・PDF 資産を引き継いだ
- Astro 移行基盤を整備（`@astrojs/react`・`@astrojs/mdx`・Tailwind CSS v4 の統合、`site` 設定、共通レイアウトとヘッダー／フッター、デザイントークンの CSS 化）
- v2.0.0 のデザイン確定版を仕様書に記録（`docs/article-spec.md` §12.10）。Figma テンプレート18種（Desktop／Mobile）を作成し、見出しはゴシック（Noto Sans JP）で確定

### Changed

- 記事の分類を、フォルダ＋カテゴリ方式から front-matter のタグ方式に切り替え（分野ベースの固定25種から複数指定可。定義表は `src/content/tags.ts`）。カテゴリ別ページは廃止してタグ別ページに統一し、お知らせ・活動報告のカードや詳細も種別ラベルの代わりにタグを表示するようにした
- コンテンツのフォルダ構成を変更（数学記事は `src/content/articles/<カテゴリフォルダ>/`、お知らせは `src/content/news/`、活動報告は `src/content/reports/` に分離。カテゴリはフォルダから自動で決まるようにし、対応表を `src/content/categories.ts` に新設。URL は変更なし）
- デザインを Figma テンプレートに全面準拠させて再実装（ホーム構成、一覧カード、記事詳細の目次・関連記事、お知らせ／活動報告の専用レイアウト、静的ページの組版）
- 英字フォントを Roboto（基本）＋ Montserrat（大きな表示）に決定し、Figma のテンプレートとコンポーネントに適用（`docs/article-spec.md` §12.11）
- サイトの基盤を React + Vite の SPA から Astro 7（静的生成）へ移行開始
- CI / デプロイの Node.js を 24 に更新（Astro 7 の要件 22.23.4 以上に対応）

### Removed

- 移行の第一段階として、旧ページ・旧コンポーネント・旧データ（JSON）を移行ブランチ上で一時的に削除（内容は `main` に保持され、順次引き継ぐ）
