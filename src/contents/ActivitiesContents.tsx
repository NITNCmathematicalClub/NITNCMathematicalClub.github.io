import ActivityCard from "../components/ActivityCard";

const activities = [
  {
    title: "ミニミニ体験授業",
    date: new Date("2025-05-11").getTime(),
    place: "沼津高専 大教室",
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
];

const ActivitiesContents = () => {
  return (
    <div
      className="text-text-base font-serif border-t border-gray-white"
      id="activities-content"
    >
      {/* <h1 className="page-title">活動報告</h1> */}
      <h2 className="h2-style">2025年度</h2>
      <ActivityCard activity={activities[0]} />
    </div>
  );
};

export default ActivitiesContents;
