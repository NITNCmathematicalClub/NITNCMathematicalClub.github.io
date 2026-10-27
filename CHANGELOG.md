# Changelog

このサイトの主な変更を記録します。形式は Keep a Changelog、
バージョンは Semantic Versioning に従います。

## [Unreleased]

### Removed

- 未使用ファイルの整理（Issue #13）: `src/App.css`、`src/assets/react.svg`、`src/components/HomeCard.tsx`、`src/contents/NoteContents.tsx`、`update_getbase.mjs` を削除
- 未使用の依存を削除: `@vitejs/plugin-vue`、`@vitejs/plugin-vue-jsx`、`@tailwindcss/aspect-ratio`、`@tailwindcss/postcss`
- Tailwind v3 時代の `tailwind.config.js` を削除（v4 では `@import "tailwindcss"` と `@theme` が正で、config は読み込まれていなかった）

### Fixed

- 直接URLで各ページを開くと404になる問題（`public/404.html` によるリダイレクト方式を導入し、存在しないパス用の404ページを追加）
- ページ遷移時にスクロール位置が前のページのまま残る問題

## [1.0.0] - 2026-10-27

### Added

- バージョン管理の開始（このファイル、タグ、GitHub Release の運用開始）

<!-- 以後、公開の節目ごとに ## [X.Y.Z] - YYYY-MM-DD を追加し、
     Added / Changed / Fixed / Removed の見出しで変更を書く -->
