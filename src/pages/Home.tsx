// import React from "react";
import HeroSlider from "../components/HeroSlider";
// import { Link } from "react-router-dom";
import Card from "../components/HomeCard"; // Cardコンポーネントのインポート名は正しいですか？以前はCardとHomeCardが混在していました

const Home = () => {
  // 表示したいカードのデータを定義します
  const homeCards = [
    {
      title: "数理同好会って何？",
      text: "実はあまり実態知られていない数理同好会.いつも何の活動をしているのか, 何をしているのか. その実態に迫ります.",
      img: "/img/Activities/2025-0511-1.jpg", // 活動報告のイメージ画像
      link: "/introduce", // 活動報告ページへのリンク
    },
    {
      title: "部誌",
      text: "数理同好会が発行する部誌では, 部員それぞれの研究や数学に関する雑記を掲載しています.",
      img: "/img/ClubMagazine/cover.jpg", // 部誌のイメージ画像
      link: "/clubmagazine", // 部誌ページへのリンク
    },
    {
      title: "雑記帳",
      text: "国立高専の入試問題（数学）の過去問を独自に解説しています. 受験生や数学好きの方はぜひご活用ください.",
      img: "/img/Note/cover.jpg", // 過去問解説のイメージ画像
      link: "/note", // 過去問解説ページへのリンク
    },
  ];

  return (
    <div className="bg-white text-text-base font-serif">
      <HeroSlider />

      <div className="relative py-8 px-4 bg-blue text-white text-center font-serif font-bold text-3xl">
        数理科学が大好きな, 学生たちの同好会.
      </div>

      {/* ここにCardコンポーネントを挿入 */}
      <div className="font-serif max-w-screen-xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* homeCards配列をmapでループして、それぞれのデータでCardコンポーネントをレンダリング */}
        {homeCards.map((cardData, index) => (
          <Card key={index} card={cardData} />
        ))}
      </div>
    </div>
  );
};

export default Home;
