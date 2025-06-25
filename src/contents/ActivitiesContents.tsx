import ActivityCard from "../components/ActivityCard";

const activities = [
  {
    id: 1,
    title: "ミニミニ体験授業",
    date: "2025年6月7日",
    description:
      "中学生向けの体験授業を行いました。内容は数学の基礎から応用まで幅広く扱いました。",
  },
];

const ActivitiesContents = () => {
  return (
    <div className="text-text-base font-serif" id="activities-content">
      <h1 className="page-title">活動報告</h1>
      <h2 className="h2-style">2025年度</h2>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
      {/* <h3 className="h3-style">ミニミニ体験授業</h3> */}
    </div>
  );
};

export default ActivitiesContents;
