// import React from "react";
import { InlineMath } from "react-katex";
import PieChartByGakka from "../components/PieChartByGakka";

const IntroduceContents = () => {
  return (
    <div className="text">
      {/* <h1 className="page-title">数理同好会って何？</h1> */}
      <h2 className="h2-style">概要</h2>
      <p>
        ここ数理同好会は2016年度に設立された, 沼津高専で3番目に新しい同好会です.
      </p>
      <p>
        週2回の定期的な活動では, 各自が持ち寄った話題(
        <InlineMath math="\approx" />
        課題)をみんなで考えたり, 難問を協力して解いたりしています. それに加え,
        1日体験入学での過去問解説や中学生のための体験授業の補助,
        高専祭での部誌配布と数学クイズなど学校行事のサポートもしています.
      </p>
      {/* <img
        className="w-full max-w-2xl mx-auto my-6"
        src="/img/Introduce/books.jpg"
      ></img> */}
      <h2 className="h2-style">構成員</h2>
      <p>
        数理同好会には以前まで, 幅広い学科の学生が所属していました.
        2025年度現在の分布は以下のようになっています.
      </p>
      <PieChartByGakka />
      <h2 className="h2-style">活動場所</h2>
      <p>
        数理同好会に部室はありません.
        そのため固定された活動場所というのは存在しませんが,
        もはや部室となりかけている部屋とサブの部屋があります.
      </p>
      <div className="">
        <img
          src={"/img/Introduce/room.jpg"}
          // alt={`${activity.title} 画像 3`}
          className="block mx-auto md:w-1/2 w-full" // 中央に配置するための修正
        />
      </div>
    </div>
  );
};

export default IntroduceContents;
