# AGENTS.md — AIエージェント向け作業ガイド

このファイルは、AIエージェント（および初めてこのリポジトリに触る人）が
作業を始める前に読むための入口です。人間向けの運用ルールは
[CONTRIBUTING.md](CONTRIBUTING.md) が正本です。迷ったらそちらに従ってください。

> **v2.0.0 移行中**: このブランチ（`feat/astro-migration`）は Astro への移行作業中です。
> 旧サイト（React + Vite）は `main` ブランチに残っています。
> 移行の全体計画は [docs/article-spec.md](docs/article-spec.md) §12 と親 Issue #3 を参照してください。

## プロジェクト概要

- 沼津高専 数理同好会の公式サイト。公開URL: https://math.nitnc.club/
- Astro 7 + TypeScript（strict）の静的サイト。記事は Markdown / MDX（Content Collections）で管理する方針
- 対話的コンポーネントは Astro Islands として React を使う（統合は移行基盤 Issue の範囲）
- GitHub Pages に GitHub Actions で自動デプロイされる

## コマンド

前提: **Node.js 22.23.4 以上**（CI は Node 24 を使用。Astro 7 の要件）。

```bash
npm ci          # 依存インストール（lockfile 厳密）
npm run dev     # 開発サーバー http://localhost:4321/
npm run build   # astro build（出力は dist/）
npm run lint    # eslint .
npm run preview # ビルド結果の確認
```

作業の完了条件は `npm run build` と `npm run lint` の両方が通ることです。

- Node の導入には nvm を推奨します。**Ubuntu の `apt install nodejs` では版が古く要件を満たしません**。
- 手順の詳細は [docs/development.md](docs/development.md) を参照してください。

## リポジトリ構成

| パス | 役割 |
|---|---|
| `src/pages/` | ファイルベースルーティング。`.astro` / `.md` がそのままページになる |
| `src/layouts/` | 共通レイアウト |
| `src/styles/` | グローバル CSS（Tailwind v4 はここで `@import "tailwindcss"` する方針） |
| `public/` | 静的ファイル（画像・PDFなど）。ビルド時にそのままコピーされる |
| `docs/` | 設計・運用ドキュメント（下記参照） |
| `.github/workflows/deploy.yml` | main への push で Pages へ自動デプロイ |
| `.github/workflows/ci.yml` | PR 時に lint + build を検証 |

## 作業ルール（要約）

- `main` へ直接 push しない。ブランチを切って PR を作る
- ブランチ名: `feat/…` / `fix/…` / `content/…` / `docs/…` / `chore/…`
- コミットメッセージは Conventional Commits（`feat:` / `fix:` / `content:` / `docs:` / `chore:` / `ci:`）
- **コミットは、Issue を解決できる段階（作業単位が完了した段階）まで来てから行う。** 途中の断片的な状態ではコミットしない
- **ファイルの編集・追加・削除は、1ファイルごとにコミットせず、関連する変更をまとめて1コミットにする**
- 対応する Issue がある変更は、PR 本文に `Closes #番号` を書く
- 公開に値する変更は `CHANGELOG.md` の [Unreleased] に追記する
- ラベル・Milestone・Project の運用は [docs/operations.md](docs/operations.md) 参照

## 必ず知っておくべき注意点（既知の落とし穴）

1. **Node の版数**: CI / デプロイのワークフローは Node 24 に揃えてあります。Astro の要件（22.23.4 以上）を下回る環境ではビルドできません。ローカルと CI で版数を揃えてください。
2. **アセットパスは絶対パスで**: 画像などの参照は `"/img/..."` のように先頭スラッシュの絶対パスに統一する。
3. **デプロイはマージだけ**: 公開は「PR を main にマージ」で自動で行われます。手動のデプロイコマンドはありません。
4. **カスタムドメイン**: `math.nitnc.club` はリポジトリの Settings > Pages で設定されています（CNAME ファイルはありません）。デプロイ方式を変えるときはドメイン設定の確認を忘れないこと。
5. **ワークフローファイル**: `.github/workflows/` の変更は、ツール側の権限の都合で Web UI から行う場合があります。変更が必要なら PR 本文に明記してください。
6. **Tailwind は v4**: 色やフォントのカスタマイズは CSS の `@theme` で行う方針です（v3 の `tailwind.config.js` は使いません）。
7. **URL の互換性**: 既存パス（`/`、`/introduce`、`/activities`、`/exams`、`/note`、`/club-magazine`、`/contact`）は移行後も維持します。ページ移行時は必ず確認してください。

## ドキュメント一覧

- [docs/article-spec.md](docs/article-spec.md) — 記事機能の仕様書（v2.0.0 確定版）。移行計画 §12 を含む
- [docs/content-guide.md](docs/content-guide.md) — 部員向けの執筆ガイド（記事の作り方・レビューの流れ）
- [docs/architecture.md](docs/architecture.md) — 構成・ルーティング・コンポーネント
- [docs/development.md](docs/development.md) — 開発手順・環境構築
- [docs/operations.md](docs/operations.md) — デプロイ・バージョン・権限などの運用
- [CONTRIBUTING.md](CONTRIBUTING.md) — 人間向けの参加・運用ルール
- [CHANGELOG.md](CHANGELOG.md) — 公開履歴
