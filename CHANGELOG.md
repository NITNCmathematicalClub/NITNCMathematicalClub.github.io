# Changelog

このサイトの公開履歴です。形式は [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に準じ、
バージョンは Semantic Versioning に従います。

> v1 系（React + Vite）の履歴は、`main` ブランチの `CHANGELOG.md` を参照してください。

## [Unreleased]

v2.0.0（Astro 移行＋記事機能）に向けて作業中です。計画は `docs/article-spec.md` §12 と親 Issue #3 を参照してください。

### Changed

- サイトの基盤を React + Vite の SPA から Astro 7（静的生成）へ移行開始
- CI / デプロイの Node.js を 24 に更新（Astro 7 の要件 22.23.4 以上に対応）

### Removed

- 移行の第一段階として、旧ページ・旧コンポーネント・旧データ（JSON）を移行ブランチ上で一時的に削除（内容は `main` に保持され、順次引き継ぐ）
