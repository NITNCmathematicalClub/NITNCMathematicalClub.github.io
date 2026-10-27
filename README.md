# 沼津高専 数理同好会 公式サイト

沼津高専数理同好会の公式サイトのソースコードです。

- 公開サイト: https://math.nitnc.club/
- 技術構成: React + TypeScript + Vite（GitHub Pages で公開）

## クイックスタート

前提: Node.js 20。

```bash
npm ci        # 依存インストール
npm run dev   # 開発サーバー http://localhost:5173/
npm run build # 型チェック＋ビルド
npm run lint  # ESLint
```

公開は自動です。PR が `main` にマージされると GitHub Actions が
ビルドして GitHub Pages へデプロイします（手動のデプロイ操作は不要です）。

## ドキュメント

| ドキュメント | 内容 |
|---|---|
| [AGENTS.md](AGENTS.md) | AIエージェント向け作業ガイド（構成・注意点の入口） |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 参加方法と運用ルール（ブランチ・コミット・バージョン） |
| [docs/architecture.md](docs/architecture.md) | サイトの構成・ルーティング・コンポーネント |
| [docs/data-schema.md](docs/data-schema.md) | `public/*.json` のデータ形式（正本） |
| [docs/content-guide.md](docs/content-guide.md) | コンテンツ（お知らせ・活動報告など）の更新手順 |
| [docs/development.md](docs/development.md) | 開発の進め方・ページ追加チュートリアル |
| [docs/operations.md](docs/operations.md) | デプロイ・バージョン・Issue/Project・権限の運用 |
| [CHANGELOG.md](CHANGELOG.md) | 公開履歴 |

## コンテンツの更新だけしたい方へ

お知らせや活動報告などの更新は、`public/` の JSON ファイルの編集だけで
行えます。手順は [docs/content-guide.md](docs/content-guide.md) をご覧ください。
作業の依頼は Issue の「コンテンツ追加・修正依頼」テンプレートからも可能です。
