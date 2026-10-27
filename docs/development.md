# 開発ガイド

## セットアップ

前提: Node.js 20。

```bash
git clone https://github.com/NITNCmathematicalClub/NITNCMathematicalClub.github.io.git
cd NITNCMathematicalClub.github.io
npm ci
npm run dev   # http://localhost:5173/
```

## 作業の進め方

1. Issue を確認し、着手するものは Project ボードで `In Progress` に動かす
2. `main` からブランチを切る（`feat/…` / `fix/…` / `content/…` / `docs/…` / `chore/…`）
3. 変更し、`npm run build` と `npm run lint` が通ることを確認する
4. 表示が変わる変更は、ブラウザで対象ページを確認する（PC幅とスマホ幅）
5. PR を作る（テンプレートに沿って記入）。CI が通ったらマージ

詳しい運用ルールは [../CONTRIBUTING.md](../CONTRIBUTING.md) を参照してください。

## チュートリアル: 新しいページの追加方法

例として `About` ページ（`/about`）を追加する手順です。

### ステップ1: 本文コンポーネントを作る

`src/contents/AboutContents.tsx` を作成します。

```tsx
const AboutContents = () => {
  return (
    <div className="text">
      <h2 className="h2-style">概要</h2>
      <p>ここは新しいページです。</p>
    </div>
  );
};

export default AboutContents;
```

- コンポーネント名とファイル名は PascalCase（大文字始まり）
- 見出しには `h2-style` クラスを使うと、目次（TableOfContents）に自動で載ります
- スタイルは Tailwind CSS のクラスで書きます

### ステップ2: ページの枠を作る

`src/pages/About.tsx` を作成し、他のページと同じ形にします。

```tsx
import PageTitle from "../components/PageTitle";
import TableOfContents from "../components/TableOfContents";
import AboutContents from "../contents/AboutContents";

const About = () => {
  return (
    <div>
      <PageTitle title="About" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <AboutContents />
        </main>
      </div>
    </div>
  );
};

export default About;
```

### ステップ3: ルーティングを追加する

`src/App.tsx` の `<Routes>` に追加します。

```tsx
import About from "./pages/About";
// ...
<Route path={"/about"} element={<About />} />
```

### ステップ4: ナビゲーションにリンクを足す（任意）

`src/components/Navbar.tsx` のリンク一覧（PC用とモバイル用の2箇所）に追加します。

### 確認事項

- `npm run build` / `npm run lint` が通ること
- 追加したページが表示されること
- **注意**: 本番環境では、トップ以外のURLを直接開くと404になる既知の問題（Issue #4）
  があります。ローカルでは再現しないので、公開後の確認項目として覚えておいてください
