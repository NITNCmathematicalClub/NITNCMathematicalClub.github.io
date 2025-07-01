import ActivityCard from "../components/ActivityCard";
import React, { type JSX } from "react";

const activities = [
  {
    title: "ミニミニ体験授業",
    date: new Date("2025-05-11").getTime(),
    place: "沼津高専 総合メディアセンター 大教室",
    description:
      "今年度初の沼津高専の公開イベントに, 数理同好会としてお手伝いをさせていただきました. " +
      "主に高専に興味を持ってくれた小中学生の方々に, 学校生活についての質問の受付ました. ",
    // "過去の入試問題にチャレンジしました.",
    images: [
      "/img/Activities/2025-0511-1.jpg",
      "/img/Activities/2025-0511-2.jpg",
      "/img/Activities/2025-0511-3.jpg",
    ],
  },
  {
    title: "第58回 高専祭",
    date: new Date("2023-11-11").getTime(),
    place: "沼津高専 共通棟2階 多目的教室",
    description:
      "中の人が初めて体験した高専祭でした. 尚、このとき私は数理同好会に所属していません. " +
      "数理同好会については特筆することはありませんが, かっつーが来たりじゃがいもが燃えたりしました. ",
    // "過去の入試問題にチャレンジしました.",
    images: [
      "/img/Activities/2023-1111-1.jpg",
      "/img/Activities/2023-1111-2.jpg",
      "/img/Activities/2023-1111-3.jpg",
    ],
  },
  {
    title: "過去問解説",
    date: new Date("2023-08-05").getTime(),
    place: "沼津高専 講義棟2階 S1教室(2023年度)",
    description:
      "中の人が初めて体験した高専祭でした. 尚、このとき私は数理同好会に所属していません. " +
      "数理同好会については特筆することはありませんが, かっつーが来たりじゃがいもが燃えたりしました. ",
    // "過去の入試問題にチャレンジしました.",
    images: [
      "/img/Activities/2023-0805-1.jpg",
      "/img/Activities/2023-0805-2.jpg",
      "/img/Activities/2023-0805-3.jpg",
    ],
  },
];

// 活動データと年度を計算するヘルパー関数
// 日本の会計年度は4月に始まり、翌年3月に終わるため、そのロジックを実装
const getFiscalYear = (timestamp: number): number => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11 (0=1月, 3=4月)

  // 4月以降であれば現在の年が年度の開始年
  // 1月、2月、3月であれば前年が年度の開始年
  return month >= 3 ? year : year - 1;
};

const ActivitiesContents: React.FC = () => {
  let currentFiscalYear: number | null = null;
  const contentToRender: JSX.Element[] = [];

  // activitiesが新しい日付順に並んでいることを前提とする
  activities.forEach((activity, index) => {
    const fiscalYear = getFiscalYear(activity.date);

    // 新しい年度になったらh2タグを追加
    if (fiscalYear !== currentFiscalYear) {
      currentFiscalYear = fiscalYear;
      contentToRender.push(
        <h2 key={`year-${fiscalYear}`} className="h2-style">
          {fiscalYear}年度
        </h2>
      );
    }
    // ActivityCardを追加
    contentToRender.push(<ActivityCard key={index} activity={activity} />);
  });

  return (
    <div
      className="text-text-base font-serif border-t border-gray-white"
      id="activities-content"
    >
      {contentToRender}
    </div>
  );
};

export default ActivitiesContents;
