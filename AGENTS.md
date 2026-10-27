# AGENTS.md — AIエージェント向け作業ガイド

このファイルは、AIエージェント（および初めてこのリポジトリ触る人）が
作業を始める前に読むための入口です。人間向けの運用ルールは
[CONTRIBUTING.md](CONTRIBUTING.md) が正本です。迷ったらそちらに従ってください。

## プロジェクト概要

- 沼津高専 数理同好会の公式サイト。公開URL: https://math.nitnc.club/
- React 19 + TypeScript + Vite 6 の SPA（Single Page Application）
- コンテンツの大半は `public/*.json` で管理され、画面は fetch して描画する
- GitHub Pages に GitHub Actions で自動デプロイされる

## コマンド

前提: Node.js 20（CI と同じバージョン）。

```bash
npm ci          # 依存インストール（lockfile 厳密）
npm run dev     # 開発サーバー http://localhost:5173/
npm run build   # tsc -b && vite build（型チェック込み）
npm run lint    # eslint .
npm run preview # ビルド結果の確認
```

作業の完了条件は `npm run build` と `npm run lint` の両方が通ることです。

## リポジトリ構成

| パス | 役割 |
|---|---|
| `src/App.tsx` | ルーティング定義（BrowserRouter）と全体レイアウト |
| `src/main.tsx` | エントリ。index.css と KaTeX の CSS を読み込む |
| `src/pages/` | ページの枠（PageTitle＋目次＋本文の配置） |
| `src/contents/` | 各ページの本文コンポーネント |
| `src/components/` | 共通部品（Navbar / Footer / PageTitle / TableOfContents 等） |
| `src/index.css` | Tailwind v4 の `@theme` で色・フォント変数を定義 |
| `public/*.json` | サイトのデータ（news / notes / exams / activities） |
| `public/img/`, `public/docs/` | 画像とPDF（過去問解説） |
| `docs/` | 設計・運用ドキュメント（下記参照） |
| `.github/workflows/deploy.yml` | main への push で Pages へ自動デプロイ |
| `.github/workflows/ci.yml` | PR 時に lint + build を検証 |

ルーティングとコンポーネントの対応は [docs/architecture.md](docs/architecture.md)、
JSON の形式は [docs/data-schema.md](docs/data-schema.md) を参照してください。

## 作業ルール（要約）

- `main` へ直接 push しない。ブランチを切って PR を作り、CI 通過後にマージする
- ブランチ名: `feat/…` / `fix/…` / `content/…` / `docs/…` / `chore/…`
- コミットメッセージは Conventional Commits（`feat:` / `fix:` / `content:` / `docs:` / `chore:` / `ci:`）
- 対応する Issue がある変更は、PR 本文に `Closes #番号` を書く
- 公開に値する変更は `CHANGELOG.md` の [Unreleased] に追記する
- ラベル・Milestone・Project の運用は [docs/operations.md](docs/operations.md) 参照

## 必ず知っておくべき注意点（既知の落とし穴）

1. **直接URLの404（Issue #4）**: SPA＋静的配信のため、トップ以外のURLを直接開くと
   GitHub Pages の404になる既知の問題がある。ルーティング変更時は必ず確認すること。
   `vercel.json` と `public/.htaccess` は Pages では無効（削除予定、Issue #10）。
2. **JSON の date は文字列**: `news.json` / `activities.json` の `date` は
   `"2026-04-22"` 形式の文字列。一部コードの型定義が `number` になっているのは
   既知のバグ（Issue #11）。日付の並び替えは文字列を引き算せず、Date として比較すること。
3. **アセットパスは絶対パスで**: 画像やJSONの参照は `"/img/..."` のように
   先頭スラッシュの絶対パスに統一する。`"./img/..."` は表示中URLで解決先が変わる。
4. **デプロイはマージだけ**: 公開は「PRを main にマージ」で自動で行われる。
   `npm run deploy`（gh-pages 方式）は旧手順なので**使わない**（Issue #10 で削除予定）。
5. **Tailwind は v4**: 色やフォントのカスタマイズは `src/index.css` の `@theme` で行う。
   `tailwind.config.js` は v3 時代の残骸で、v4 では自動で読まれない（Issue #13）。
6. **目次のアンカー（Issue #12）**: `TableOfContents` の slugify は日本語見出しで
   ID が衝突する既知の問題がある。見出し周りを触るときは注意する。
7. **ワークフローファイル**: `.github/workflows/` の変更は権限の都合で
   担当者が Web UI から行う場合がある。変更が必要なら PR 本文に明記する。

## コンテンツだけを更新したい場合

コードを触らず `public/*.json` の編集だけで更新できます。
手順は [docs/content-guide.md](docs/content-guide.md) を参照してください。
データ形式の正本は [docs/data-schema.md](docs/data-schema.md) です。

## ドキュメント一覧

- [docs/architecture.md](docs/architecture.md) — 構成・ルーティング・コンポーネント
- [docs/data-schema.md](docs/data-schema.md) — JSON データの形式（正本）
- [docs/content-guide.md](docs/content-guide.md) — コンテンツ更新の手順
- [docs/development.md](docs/development.md) — 開発手順・ページ追加チュートリアル
- [docs/operations.md](docs/operations.md) — デプロイ・バージョン・権限などの運用
- [CONTRIBUTING.md](CONTRIBUTING.md) — 人間向けの参加・運用ルール
- [CHANGELOG.md](CHANGELOG.md) — 公開履歴
