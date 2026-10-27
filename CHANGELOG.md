# Changelog

このサイトの主な変更を記録します。形式は Keep a Changelog、
バージョンは Semantic Versioning に従います。

## [Unreleased]

### Removed

- デプロイ経路を GitHub Actions に一本化し、GitHub Pages では無効だった `vercel.json` と `public/.htaccess`、旧デプロイ手順の `npm run deploy`（gh-pages 方式）スクリプトと `gh-pages` パッケージを削除

### Fixed

- 直接URLで各ページを開くと404になる問題（`public/404.html` によるリダイレクト方式を導入し、存在しないパス用の404ページを追加）
- ページ遷移時にスクロール位置が前のページのまま残る問題

## [1.0.0] - 2026-10-27

### Added

- バージョン管理の開始（このファイル、タグ、GitHub Release の運用開始）

<!-- 以後、公開の節目ごとに ## [X.Y.Z] - YYYY-MM-DD を追加し、
     Added / Changed / Fixed / Removed の見出しで変更を書く -->
