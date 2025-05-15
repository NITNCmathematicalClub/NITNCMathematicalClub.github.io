import React from 'react';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  return (
    <div className="bg-background text-text-base">
      <HeroSlider />

      {/* 以下に続くセクション */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-4">活動内容</h2>
        <p className="text-lg">
          数理同好会は数学と情報科学を楽しく学び、研究・制作を行っています。
        </p>
      </section>
    </div>
    // <div className="bg-background text-text-base">
    //   {/* Hero Section */}
    //   <section className="text-center py-24 px-4">
    //     <h1 className="text-5xl md:text-6xl font-bold mb-6">
    //       数理の力を、もっと自由に。
    //     </h1>
    //     <span className="tex-xl md:text-2xl max-w-2xl mx-auto mb-8">
    //       数学・情報・プログラミングで、世界の見え方が変わる。
    //     </span>
    //     <button className="bg-blue text-text-hfbase px-6 py-3 rounded-full fond-medium hover:opacity-90 transition">
    //       詳しく見る
    //     </button>
    //   </section>  
    // </div>
  );
};

export default Home;