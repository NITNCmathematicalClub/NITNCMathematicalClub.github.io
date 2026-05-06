# 沼津高専 数理同好会 公式サイト

このリポジトリは、沼津高専数理同好会の公式サイトのソースコードです。
React + TypeScript + Vite で構築されています。

## 実行方法 (ローカルでの開発)

このプロジェクトを手元で動かすには、Node.js がインストールされている必要があります。

1. パッケージのインストール:

   ```bash
   npm install
   ```

2. 開発サーバーの起動:
   ```bash
   npm run dev
   ```
   起動後、ブラウザで `http://localhost:5173/` 等にアクセスすると確認できます。

## 公開手順 (GitHub Pages へのデプロイ)

ローカルでの変更（ページの追加、JSONの編集、画像の追加など）を終え、GitHub Pages 上の公開サイトへ反映させるには、以下のコマンドを実行します。

```bash
npm run deploy
```

このコマンドを実行すると、自動的に最新の状態がビルドされ、公開用データが GitHub にプッシュされます。
（※ソースコードの変更自体を保存するには、このコマンドとは別に `git commit` と `git push` を行って `main` ブランチに変更内容を反映してください）

## 各種データ (JSON) の更新方法

サイト内のニュースや活動履歴などのデータは `public/` ディレクトリ内の JSON ファイルを編集することで更新できます。

### 1. `news.json` (ニュース・お知らせ)

トップページ等に表示されるお知らせです。

```json
[
  {
    "date": "2026-04-22",
    "text": "公式サイトをGitHub Pagesへ移動しました."
  }
]
```

- `date`: 日付 (`YYYY-MM-DD`)
- `text`: お知らせの内容

### 2. `notes.json` (雑記帳)

```json
[
  {
    "date": "2025-08-16",
    "content": "やっとできたー！！！",
    "author": "小野"
  }
]
```

- `date`: 日付 (`YYYY-MM-DD`)
- `content`: 投稿内容
- `author`: 投稿者名

### 3. `exams.json` (過去問解説)

```json
[
  {
    "name": "令和7(2025)年度 本試",
    "pdfUrl": "./docs/exams/20251.pdf"
  }
]
```

- `name`: 試験の名称
- `pdfUrl`: PDFファイルへのパス (`public/docs/exams/` 以下に配置)

### 4. `activities.json` (活動風景)

```json
[
  {
    "title": "ミニミニ体験授業",
    "date": "2025-05-11",
    "place": "沼津高専 総合メディアセンター 大教室",
    "description": "活動の説明...",
    "images": ["./img/Activities/2025-05-11-1.jpg"]
  }
]
```

- `title`: 活動名
- `date`: 日付 (`YYYY-MM-DD-N`)
- `place`: 場所
- `description`: 活動の様子
- `images`: 画像ファイルへのパスの配列

#### 【重要】活動風景画像の命名規則

`activities.json` で追加する画像は `public/img/Activities/` に配置し、以下の命名規則に従ってください。

- **形式**: `YYYY-MM-DD-連番.拡張子`
- **例**: `2025-05-11-1.jpg`, `2023-11-11-2.jpg`

---

## チュートリアル: 新しいページの追加方法

サイトに新しいページ（例：`About` ページ）を追加する手順です。

### ステップ1: ページコンポーネント (`.tsx`) の作成

`src/pages/` ディレクトリ内に新しいファイル（例: `About.tsx`）を作成します。

```tsx
// src/pages/About.tsx
// ページの見た目と振る舞いを定義します
const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>ここは新しいページです。</p>
    </div>
  );
};

export default About;
```

- コンポーネント名（関数名）とファイル名は大文字から始めます（PascalCase）。
- クラス名（`className`）には Tailwind CSS を使用してスタイルを適用します。

### ステップ2: ルーティング (`App.tsx`) への追加

作成したページにURLを割り当てるため、`src/App.tsx` を編集します。

1. 作成したコンポーネントをインポートします。
2. `<Routes>` の中に新しい `<Route>` を追加します。

```tsx
// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
// 1. インポートを追加
import About from "./pages/About";
// ...他のインポート

const App = () => {
  return (
    <BrowserRouter>
      {/* ... */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 2. ルートを追加 (例: /about にアクセスされたら About を表示) */}
        <Route path="/about" element={<About />} />
        {/* ...他のルート */}
      </Routes>
      {/* ... */}
    </BrowserRouter>
  );
};

export default App;
```

### ステップ3: ナビゲーションへのリンク追加 (任意)

新しく作成したページへアクセスしやすくするため、必要に応じて `src/components/Navbar.tsx` 等にリンクを追加します。

```tsx
import { Link } from "react-router-dom";

// ...
<Link to="/about">Aboutページへ</Link>;
```

---

<details>
<summary>Vite 公式テンプレートの情報</summary>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

</details>
