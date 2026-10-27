# CONTRIBUTING — サイト運用ルール（ドラフト）

数理同好会公式サイト（https://math.nitnc.club/）の開発・運用ルールです。

## 開発環境

- Node.js 20（GitHub Actions と同じバージョン）
- セットアップ: `npm ci` → 開発: `npm run dev` → 確認: `npm run build && npm run lint`

## 公開の仕組み（現行）

- `main` ブランチへマージされると GitHub Actions（`.github/workflows/deploy.yml`）が
  自動でビルドし GitHub Pages へ公開します。手動のデプロイコマンドは使いません。
- カスタムドメイン `math.nitnc.club` はリポジトリの Settings > Pages で設定しています。

## ブランチと PR

- `main` は保護されています。直接 push せず、必ず PR を作ってください。
- ブランチ名: `feat/…`（新機能）/ `fix/…`（修正）/ `content/…`（コンテンツ）/ `chore/…`（雑務）
- PR にはテンプレートに沿って概要とスクリーンショットを書き、
  レビューを1人以上受けてからマージしてください。

## コミットメッセージ

Conventional Commits で書きます。

- `feat: 部誌ページに目次を追加` / `fix: /exams の直接アクセスで404になる問題を修正`
- `content: 活動報告に高専祭を追加` / `docs: READMEの公開手順を現行方式に更新`
- `chore: 未使用の依存を削除`

## Issue と Project

- Issue には必ずラベル（type / area / priority）を付け、Project ボードに入れてください。
- 担当は立候補制。着手したらボードで `In Progress` へ動かしてください。

## バージョンの付け方

- 公開の節目で Semantic Versioning（vMAJOR.MINOR.PATCH）のタグと Release を作ります。
  - MAJOR: デザイン刷新・基盤の移行
  - MINOR: ページ・機能の追加
  - PATCH: 文言・画像・軽微な修正
- 次のバージョンで入れる Issue には Milestone を設定します。
- 変更は CHANGELOG.md の [Unreleased] に追記してください。

## コンテンツ更新（コードを書かない場合）

- `public/*.json` の編集だけで更新できます。形式は README を参照してください。
- 自信がない場合は Issue の「コンテンツ追加・修正依頼」テンプレートから依頼してください。
- 画像は表示サイズにリサイズし、`YYYY-MM-DD-連番.jpg` の名前で `public/img/` 以下へ。

## 権限について

- admin は運営担当の最小限（目安2〜3人）のみ。一般メンバーは write です。
- 卒業・引退のタイミングで、年度末に権限の棚卸しをします。
