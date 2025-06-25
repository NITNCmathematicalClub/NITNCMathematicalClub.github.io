import React from "react";
import TableOfContents from "../components/TableOfContenst";
import IntroduceContents from "../contents/IntroduceContents.js";

const Introduce = () => {
  return (
    <div>
      <div className="relative w-full aspect-[3/1.5] md:aspect-[4/1] overflow-hidden">
        {/* ヒーローセクション */}
        <div>
          {/* 背景画像の上に薄いオーバーレイを重ねることでテキストの視認性を上げる */}
          {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
          <img
            className="absolute w-full mx-auto object-cover object-center"
            src="/img/Introduce/books.jpg"
          ></img>
          <div className="absolute inset-0 bg-black opacity-25"></div>
          {/* タイトル */}
          {/* <h1 className="absolute bottom-16 left-16 text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg font-sans">
            数理同好会って何？
          </h1> */}
          <div className="absolute inset-0 flex items-end justify-start max-w-screen-xl mx-auto px-4 pb-8">
            <h1 className="z-10 text-6xl md:text-6xl font-extrabold text-white text-left drop-shadow-lg border-white border-b-8">
              数理同好会って何？
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <IntroduceContents />
        </main>
      </div>
    </div>
  );
};

export default Introduce;
