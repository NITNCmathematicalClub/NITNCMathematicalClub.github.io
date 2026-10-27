# 運用ガイド

## デプロイ（公開）

- 公開は完全自動です。PR が `main` にマージされると
  `.github/workflows/deploy.yml` がビルドし、GitHub Pages へ公開します。
- 公開URL: https://math.nitnc.club/
  （`nitncmathematicalclub.github.io` はこちらへリダイレクトされます）
- カスタムドメイン `math.nitnc.club` は、リポジトリの **Settings > Pages** で
  設定されています。リポジトリ内に CNAME ファイルはないので、デプロイ方式を
  変えるときはドメイン設定が外れていないか必ず確認してください。
- 旧手順（`npm run deploy` の gh-pages 方式）は廃止予定です（Issue #10）。
  使わないでください。

## ブランチ保護

`main` には次の保護がかかっています。

- 直接 push 不可。変更は必ず PR 経由
- CI（`.github/workflows/ci.yml` の `check` ジョブ）の通過が必須
- 承認は必須ではない（一次レビューは担当者同士で行い、最終確認は作成者以外が望ましい）

## バージョン管理

- 公開の節目で Semantic Versioning のタグと GitHub Release を作ります。
  - MAJOR: デザイン刷新・基盤の移行
  - MINOR: ページ・機能の追加
  - PATCH: 文言・画像・軽微な修正
- 手順:
  1. Milestone（例: `v1.1.0`）の Issue がすべて閉じていることを確認する
  2. `CHANGELOG.md` の [Unreleased] を、そのバージョンの節に移す
  3. `package.json` の `version` を上げる PR をマージする
  4. GitHub の Releases から、タグ `vX.Y.Z` を `main` に向けて作成し、
     CHANGELOG の内容を貼る
- 次にやることは Milestone で管理します。当面の作業は `v1.1.0`、
  時期未定のものは `Backlog` Milestone に入れます。

## Issue / Project の運用

- Issue には必ずラベルを付けます。
  - `type:` 種別（bug / enhancement / content / chore / docs）…必須・1つ
  - `priority:` 優先度（high / medium / low）…必須・1つ
  - `area:` 対象（routing / ui / data / infra）…任意
  - 情報が足りないものには `needs-info`、初心者向けの小さい作業には `good first issue`
- すべての Issue は Organization の Project「数理同好会サイト開発」に入れます。
  - Status: `Backlog` → `Ready` → `In Progress` → `In Review` → `Done`
  - Project の Priority フィールドは、Issue の `priority:` ラベルと揃えます
- Issue の雛形は `.github/ISSUE_TEMPLATE/` のフォームを使ってください。

## 権限（コラボレーター）

- 方針: admin はサイト運営担当の最小限（目安2〜3人）。一般部員は write。
- 卒業・引退のタイミングで、年度末に権限の棚卸しを行います（Issue #9）。
- 権限の変更は部の合意のもとで行い、このリポジトリの Issue に記録を残します。

## 依存パッケージの更新

- Dependabot が npm と GitHub Actions の更新 PR を月次で作ります。
- CI が通ることを確認してからマージしてください。メジャー更新は変更内容を
  確認し、表示崩れがないか実機確認してから取り込むのが安全です。
