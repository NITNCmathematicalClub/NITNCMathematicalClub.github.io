# 数理同好会 公式サイト

沼津工業高等専門学校 数理同好会の公式サイトです。公開 URL: https://math.nitnc.club/

Astro 7 で静的に生成し、GitHub Pages にデプロイしています。記事は Markdown / MDX（Content Collections）で管理します。仕様は [docs/article-spec.md](docs/article-spec.md)、全体計画は Issue #3 を参照してください。

## 開発環境

前提: **Node.js 22.23.4 以上**（CI は Node 24 を使用）。導入には nvm を推奨します（Ubuntu の `apt install nodejs` では版が古く要件を満たしません）。

```bash
npm ci          # 依存インストール（lockfile 厳密）
npm run dev     # 開発サーバー http://localhost:4321/
npm run build   # ビルド（出力は dist/）
npm run lint    # ESLint
npm run preview # ビルド結果の確認
```

作業の完了条件は `npm run build` と `npm run lint` の両方が通ることです。手順の詳細は [docs/development.md](docs/development.md) を参照してください。

## 構成

| パス | 役割 |
|---|---|
| `src/pages/` | ページ（ファイルベースルーティング） |
| `src/layouts/` | 共通レイアウト |
| `src/components/` | コンポーネント（対話的なものは React の Islands） |
| `src/content/` | 記事などのコンテンツ（Content Collections） |
| `src/styles/` | グローバル CSS（Tailwind v4、`@theme` でトークン管理） |
| `public/` | 静的アセット（画像など、絶対パスで参照） |
| `docs/` | 設計・運用ドキュメント |

## ドキュメント

- [docs/article-spec.md](docs/article-spec.md) — 記事機能の仕様書（v2.0.0 確定版）
- [docs/architecture.md](docs/architecture.md) — 構成・ルーティング・コンポーネント
- [docs/development.md](docs/development.md) — 開発手順・環境構築
- [docs/operations.md](docs/operations.md) — デプロイ・バージョン・権限などの運用
- [CONTRIBUTING.md](CONTRIBUTING.md) — 参加・運用ルール
- [CHANGELOG.md](CHANGELOG.md) — 公開履歴
