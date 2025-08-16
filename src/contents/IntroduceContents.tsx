// import React from "react";
import { InlineMath } from "react-katex";
import PieChartByGakka from "../components/PieChartByGakka";
import getBase from "../components/getBaseURL";

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
      <h2 className="h2-style">構成員</h2>
      <p>
        数理同好会には以前まで, 幅広い学科の学生が所属していました.
        2025年度現在の分布は以下のようになっています.
      </p>
      <PieChartByGakka />
      {/* 更新ポイント */}
      <p>
        今年は大量の1年生が入荷され, なぜか制御情報工学科が多く入会したため
        割合が大きく変化しました.
      </p>
      <h2 className="h2-style">活動場所</h2>
      <p>
        数理同好会に部室はありません.
        そのため固定された活動場所というのは存在しませんが,
        もはや部室となりかけている部屋とサブの部屋があります.
        メインの方の部屋が下の写真に載っている「多目的教室(共通棟2階)」です.
        前後に黒板のような立ち位置のホワイトボードがあり,
        みんなで計算といったものを共有するのに便利です.
      </p>
      <p>サブの方の部屋は諸事情により写真がありません.</p>
      <div className="m-8">
        <img
          src={getBase("img/Introduce/room.jpg")}
          // alt={`${activity.title} 画像 3`}
          className="block mx-auto md:w-1/2 w-full" // 中央に配置するための修正
        />
      </div>
    </div>
  );
};

export default IntroduceContents;
