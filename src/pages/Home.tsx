// import React from "react";
import { useEffect, useState, type FC } from "react";
import HeroSlider from "../components/HeroSlider";
// import { Link } from "react-router-dom";
// import Card from "../components/HomeCard"; // Cardコンポーネントのインポート名は正しいですか？以前はCardとHomeCardが混在していました

// 新しいレイアウトのCardコンポーネント
interface CardData {
  title: string;
  text: string;
  img: string;
  link: string;
}

// お知らせデータの型定義
interface NewsItem {
  date: number; // 日付を数値（タイムスタンプ）で管理
  text: string;
}

// ニュースリストコンポーネント
const NewsList: FC = () => {
  // 状態管理: 読み込んだニュースデータとローディング状態
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // publicディレクトリにあるnews.jsonを非同期で取得
        const response = await fetch("/news.json");

        // HTTPエラーハンドリング
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // ニュースデータの型チェック
        if (!Array.isArray(data)) {
          throw new Error("Data is not an array.");
        }

        // データをstateにセットし、ローディング状態を解除
        setNewsData(data);
      } catch (e: unknown) {
        // エラーが発生した場合
        console.error("Failed to fetch news data:", e);
        setError("ニュースの読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []); // 依存配列が空なので、一度だけ実行

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center text-gray-500">
        読み込み中...
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  // 日付の降順にソートして、最新3件のニュースを取得
  const sortedNews = [...newsData].sort((a, b) => b.date - a.date);
  const latestNews = sortedNews.slice(0, 3);

  return (
    <div className="bg-white p-6 mb-8 text">
      <h2 className="h2-style">お知らせ</h2>
      <ul className="list-none p-0 m-0">
        {latestNews.map((news, index) => (
          <li
            key={index}
            className="py-3 border-b border-gray-200 last:border-b-0"
          >
            <span className="text-sm text-gray-500 font-semibold mr-4">
              {/* 年、月、日をそれぞれ取得して表示する */}
              {new Date(news.date).getFullYear()}年
              {/* 月と日を2桁にフォーマット */}
              {String(new Date(news.date).getMonth() + 1).padStart(2, "0")}月
              {String(new Date(news.date).getDate()).padStart(2, "0")}日
            </span>
            <span className="text-base text-gray-700">{news.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 各ページの紹介用カード
interface CardProps {
  card: CardData;
  reverse?: boolean;
}

const Card: React.FC<CardProps> = ({ card, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row overflow-hidden mb-8 font-sans ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2">
        {/*
          画像のパスが正しくない可能性があるため、
          仮のプレースホルダー画像を使用するか、
          正しいパスを指定してください。
        */}
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-auto aspect-video object-cover"
        />
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-3xl font-bold text-text-base mb-4">{card.title}</h3>
        <p className="text-lg text-gray mb-6">{card.text}</p>
        <a
          href={card.link}
          className="inline-block px-6 py-3 bg-blue text-white font-semibold rounded-lg transition duration-300 ease-in-out self-start"
        >
          詳細を見る
        </a>
      </div>
    </div>
  );
};

const Home = () => {
  // 表示したいカードのデータを定義します
  const homeCards = [
    {
      title: "数理同好会って何？",
      text: "実はあまり実態知られていない数理同好会.いつも何の活動をしているのか, 何をしているのか. その実態に迫ります.",
      img: "./img/Introduce/books.jpg", // 活動報告のイメージ画像
      link: "/introduce", // 活動報告ページへのリンク
    },
    {
      title: "部誌",
      text: "数理同好会が発行する部誌では, 部員それぞれの研究や数学に関する雑記を掲載しています.",
      img: "./img/ClubMagazine/cover.jpg", // 部誌のイメージ画像
      link: "/clubmagazine", // 部誌ページへのリンク
    },
    {
      title: "過去問解説",
      text: "国立高専の入試問題（数学）の過去問を独自に解説しています. 受験生や数学好きの方はぜひご活用ください.",
      img: "./img/Activities/2025-05-11-1.jpg", // 過去問解説のイメージ画像
      link: "/exams", // 過去問解説ページへのリンク
    },
  ];

  return (
    <div className="bg-white text-text-base font-sans">
      <HeroSlider />

      <div className="relative py-8 px-4 bg-header text-white text-center font-serif font-bold text-3xl">
        数理科学をこよなく愛そう
      </div>

      {/* ニュースリストのみを表示 */}
      <div className="max-w-7xl mx-auto">
        <NewsList />
      </div>

      <div className="max-w-screen-xl mx-auto py-12 px-4">
        {/* homeCards配列をmapでループして、それぞれのデータでCardコンポーネントをレンダリング */}
        {homeCards.map((cardData, index) => (
          <Card key={index} card={cardData} reverse={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default Home;
