import React from "react";

// 新しいCardインターフェースの定義
interface CardProps {
  title: string;
  text: string;
  img: string; // 画像は1枚のみと仮定
  link: string; // リンクのURL
}

// コンポーネント名をHomeCardからCardに変更
const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  return (
    // max-w-full bg-white border-t border-gray-white mb-8 はそのまま利用
    <div className="text-serif max-w-full bg-white border-t border-gray-white mb-8">
      {/* card.title を表示 */}
      <h3 className="mt-4 mb-4 text-xl font-bold text-text-accent">
        {card.title}
      </h3>

      {/* 画像の表示 (1枚のみ) */}
      <div className="relative pb-[75%] overflow-hidden rounded-md shadow-sm mb-4">
        {" "}
        {/* 4:3のアスペクト比を維持し、下マージンを追加 */}
        <img
          src={card.img}
          alt={card.title} // alt属性もcard.titleから取得
          className="absolute inset-0 w-full h-full object-cover object-center" // 中央トリミング
        />
      </div>

      {/* card.text を表示 */}
      <p className="text-text-base font-sans mb-4">{card.text}</p>

      {/* リンクボタンの表示 */}
      <div className="flex justify-end">
        {" "}
        {/* ボタンを右寄せにするため */}
        <a
          href={card.link}
          className="inline-block px-6 py-2 bg-blue text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          詳しくはこちら
        </a>
      </div>
    </div>
  );
};

export default Card;
