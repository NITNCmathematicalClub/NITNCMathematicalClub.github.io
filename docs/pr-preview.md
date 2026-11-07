# PR プレビュー

記事を公開する前に、実際のデザインと KaTeX のレンダリングで見た目を確認するための仕組みです（Issue #53 で決定した回避策 A）。

## なぜ必要か

記事エディタ（Sveltia CMS）の中では数式のプレビューが効かず、サイトのデザインも再現されません。そこで、CMS の保存で作られる PR の段階で「ビルド済みの本物」を確認できるようにします。承認する人も同じプレビューを見てレビューできます。

## 土台（ワークフロー案を用意）

ワークフロー案を `docs/pr-preview-workflow.yml` に同梱しています（GitHub App のトークンに workflow スコープがなく、このファイルは Web UI からでないと `.github/workflows/` へ置けないため）。Web UI で `.github/workflows/pr-preview.yml` として配置すると、main / feat/astro-migration 向けの PR でサイトがビルドされ、成果物（`dist`）が Artifacts にアップロードされるようになります。Actions の実行結果からダウンロードして手元で開けば、公開時と同じ表示を確認できます。

## ブラウザで開けるプレビュー（推奨: Cloudflare Pages）

Artifacts のダウンロードなしに PR ごとの URL で見られるようにするには、Cloudflare Pages の接続が一番軽いです。GitHub リポジトリを接続すると、PR ごとにプレビュー URL が自動で発行され、PR にコメントされます。設定は初回のみで、費用はかかりません。

### 接続手順（リポジトリ管理者が1回だけ実施）

1. Cloudflare にログインし、Workers & Pages → Create → Pages → Connect to Git で、このリポジトリ（`NITNCmathematicalClub/NITNCMathematicalClub.github.io`）を選ぶ
2. ビルド設定:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: 当面は `feat/astro-migration`（v2.0.0 公開後は `main` に変更する）
   - 環境変数: `NODE_VERSION` = `24`
3. デプロイが終わると、本番用とは別に、PR ごとに `https://<プロジェクト名>.pages.dev` 系のプレビュー URL が発行されるようになる

注意: Cloudflare Pages 側の公開はあくまで確認用です。公式の公開先は従来どおり GitHub Pages（`https://math.nitnc.club/`）です。プレビュー用のドメインが検索エンジンに載らないよう、Cloudflare 側は必要に応じてアクセス制限（Cloudflare Access）や `noindex` を検討してください。

## 代替案（GitHub だけで完結させる場合）

プレビュー専用リポジトリ（例: `NITNCmathematicalClub/site-previews`）を1つ作り、その GitHub Pages へ PR ごとに `pr-<番号>/` フォルダへデプロイする方式も可能です（`peaceiris/actions-gh-pages` 等）。外部サービスは増えませんが、ワークフローの保守とプレビューの後片付け（マージ後のフォルダ削除）は自分たちで持つことになります。
