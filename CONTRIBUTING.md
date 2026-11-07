# CONTRIBUTING — サイト運用ルール

数理同好会公式サイト（https://math.nitnc.club/）の開発・運用ルールです。

> **v2.0.0 移行中**: 現在、Astro への移行作業中です（ブランチ `feat/astro-migration`、親 Issue #3）。
> 旧サイト（React + Vite）は `main` ブランチで公開が続いています。
> 移行完了までは、コンテンツ更新の手順など一部が移行後に再整備される予定です。

## ドキュメント

作業の前に、目的に応じて以下を参照してください。

- 全体像と注意点: `AGENTS.md`（AIエージェント向けガイドですが、人間にも有用です）
- 記事機能と移行計画: `docs/article-spec.md`
- 設計: `docs/architecture.md` / 開発手順: `docs/development.md`
- 運用（デプロイ・バージョン・権限）: `docs/operations.md`

## 開発環境

- **Node.js 22.23.4 以上**（CI は Node 24 を使用）
  - 導入には nvm を推奨します。Ubuntu の `sudo apt install nodejs npm` では版が古く、Astro の要件を満たしません
  - 手順: [docs/development.md](docs/development.md)
- セットアップ: `npm ci` → 開発: `npm run dev` → 確認: `npm run build && npm run lint`

## 公開の仕組み

- `main` ブランチへマージされると GitHub Actions（`.github/workflows/deploy.yml`）が
  自動でビルドし GitHub Pages へ公開します。手動のデプロイコマンドは使いません。
- カスタムドメイン `math.nitnc.club` はリポジトリの Settings > Pages で設定しています。

## ブランチと PR

- `main` は保護されています。直接 push せず、必ず PR を作ってください。
- ブランチ名: `feat/…`（新機能）/ `fix/…`（修正）/ `content/…`（コンテンツ）/ `docs/…`（文書）/ `chore/…`（雑務）
- PR にはテンプレートに沿って概要と確認結果を書き、CI（lint + build）の通過を確認してください。
- 対応する Issue がある変更は、PR 本文に `Closes #番号` を書いてください。

## コミット

- コミットメッセージは Conventional Commits で書きます。
  - `feat: 部誌ページに目次を追加` / `fix: /exams の直接アクセスで404になる問題を修正`
  - `content: 活動報告に高専祭を追加` / `docs: READMEの公開手順を現行方式に更新`
  - `chore: 未使用の依存を削除`
- **コミットは、Issue を解決できる段階（作業単位が完了した段階）まで来てから行ってください。** 途中の断片的な状態ではコミットしません。
- **ファイルの編集・追加・削除は、1ファイルごとにコミットせず、関連する変更をまとめて1コミットにしてください。**

## Issue と Project

- Issue には必ずラベル（type / priority、必要に応じて area）を付け、Project「数理同好会サイト開発」に入れてください。
- 大きな作業は親 Issue＋子 Issue に分割します（例: v2.0.0 は親 Issue #3）。
- 担当は立候補制。着手したらボードで `In Progress` へ動かしてください。
- 詳細は [docs/operations.md](docs/operations.md) を参照してください。

## バージョンの付け方

- 公開の節目で Semantic Versioning（vMAJOR.MINOR.PATCH）のタグと Release を作ります。
  - MAJOR: デザイン刷新・基盤の移行
  - MINOR: ページ・機能の追加
  - PATCH: 文言・画像・軽微な修正
- 次のバージョンで入れる Issue には Milestone を設定します。
- 変更は CHANGELOG.md の [Unreleased] に追記してください。

## コンテンツ更新について

- 記事は Markdown / MDX で書く方式へ移行します。執筆手順は移行後に `docs/` へ整備します（子 Issue「[docs] 執筆ガイド・docs 更新」）。
- 既存ページのコンテンツと画像・PDF は、移行作業の中で `main` ブランチから順次引き継ぎます。
