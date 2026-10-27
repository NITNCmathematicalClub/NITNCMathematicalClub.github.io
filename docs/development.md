# 開発ガイド（v2.0.0 / Astro）

## 前提

- **Node.js 22.23.4 以上**（CI は Node 24 を使用します。版数を揃えてください）
- npm（Node に同梱のものを使います）

### Node の入れ方（nvm 推奨）

Ubuntu の `sudo apt install nodejs npm` で入る Node は版が古く、Astro の要件を満たしません。
nvm（Node Version Manager）で入れる方法を推奨します。

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# ターミナルを開き直す（zsh の場合は source ~/.zshrc）
nvm install 24
nvm alias default 24
node -v   # v24.x.x と出ればOK
```

- スクリプトは `zsh` ではなく `bash` に渡してください（インストーラの仕様です）
- すでに古い Node が入っていても、nvm 側が優先されます（`which node` が `~/.nvm/...` を指すことを確認）

## セットアップと基本コマンド

```bash
npm ci          # 依存インストール（lockfile 厳密）
npm run dev     # 開発サーバー http://localhost:4321/
npm run build   # 本番ビルド（出力は dist/）
npm run lint    # ESLint
npm run preview # ビルド結果の確認
```

作業の完了条件は **`npm run build` と `npm run lint` の両方が通ること**です。

## プロジェクトの作り直し方（参考）

Astro プロジェクトは `create astro` で生成します。既存フォルダがある場所では直接生成できないため、
サブフォルダに生成して中身だけを移します。

```bash
npm create astro@latest -- ./astro-new --template minimal --typescript strict --no-git --skip-houston --yes
cd astro-new
npm install
npx astro add react tailwind mdx --yes   # Islands 用 React / Tailwind v4 / MDX
cd ..
rsync -a --exclude node_modules --exclude dist --exclude .astro --exclude .vscode astro-new/ ./
rm -rf astro-new
```

## ページ・コンポーネントの追加

- ページ: `src/pages/` に `.astro`（または `.md`）を追加すると、そのパスで公開されます
- 共通レイアウト: `src/layouts/`、共通部品: `src/components/`
- React コンポーネントは Islands として `.astro` から読み込めます（`client:load` 等のディレクティブを指定）
- 静的ファイル（画像・PDF）は `public/` に置き、`"/img/..."` のように絶対パスで参照します

## 作業の進め方

- ブランチ・PR・コミットのルールは [CONTRIBUTING.md](../CONTRIBUTING.md) を参照してください
  （要点: コミットは「Issue を解決できる段階」で「まとめて1コミット」）
- 変更したら `CHANGELOG.md` の [Unreleased] への追記を忘れずに
