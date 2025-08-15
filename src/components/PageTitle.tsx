import React from "react";

// Propsの型定義
interface HeroSectionProps {
  title: string; // タイトルを変更できるようにする引数
  imageUrl?: string; // 背景画像のURL (オプション, デフォルト値設定のため)
}

const PageTitle: React.FC<HeroSectionProps> = ({
  title,
  imageUrl = "./img/Introduce/books.jpg", // デフォルトの画像URLを設定
}) => {
  return (
    // ヘッダーの高さ分、コンテンツ全体を下にずらすdivは、
    // このHeroSectionコンポーネントを呼び出す親コンポーネント（例: Introduce.tsx）に持たせるのが適切です。
    // そのため、ここでは含めません。

    // ヒーローセクション全体をラップするdiv
    // md:aspect-[4/1] を outer div に移動
    <div className="relative w-full aspect-[3/1.5] md:aspect-[4/1] overflow-hidden">
      {/* 画像とテキストを重ねるためのコンテナ */}
      {/* Z-indexの階層を明確にするため、img, overlay, text の順番を調整 */}
      <div className="absolute inset-0">
        {/* 背景画像用のimgタグ */}
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={imageUrl} // 引数から渡された画像URLを使用
          alt={title + "の背景"} // alt属性も動的に
        />

        {/* 背景画像の上に薄いオーバーレイを重ねることでテキストの視認性を上げる */}
        {/* opacityを調整したものを採用 (0.25) */}
        {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}

        {/* タイトルを左上に配置するコンテナ */}
        {/* ここは max-w-screen-xl mx-auto でコンテンツ幅と揃えつつ、
            flex items-start justify-start で左上配置、px-4 pt-16 で余白 */}
        <div className="absolute inset-0 flex items-end justify-start max-w-screen-xl mx-auto px-4 pb-8">
          <h1 className="z-10 text-6xl font-extrabold text-white text-left drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] border-white border-b-8">
            {title} {/* 引数から渡されたタイトルを使用 */}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
