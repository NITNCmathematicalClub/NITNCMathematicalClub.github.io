# Changelog

このサイトの主な変更を記録します。形式は Keep a Changelog、
バージョンは Semantic Versioning に従います。

## [Unreleased]

### Changed

- サイト内の大きな画像8点を最適化（最大幅1920pxへのリサイズとJPEG再圧縮）。合計 約20.5MB → 約2.3MB

### Fixed

- 直接URLで各ページを開くと404になる問題（`public/404.html` によるリダイレクト方式を導入し、存在しないパス用の404ページを追加）
- ページ遷移時にスクロール位置が前のページのまま残る問題

## [1.0.0] - 2026-10-27

### Added

- バージョン管理の開始（このファイル、タグ、GitHub Release の運用開始）

<!-- 以後、公開の節目ごとに ## [X.Y.Z] - YYYY-MM-DD を追加し、
     Added / Changed / Fixed / Removed の見出しで変更を書く -->
