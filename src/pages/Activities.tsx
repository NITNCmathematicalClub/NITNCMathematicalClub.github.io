import PageTitle from "../components/PageTitle";
import TableOfContents from "../components/TableOfContents";
import ActivitiesContents from "../contents/ActivitiesContents";

const Activities = () => {
  return (
    <div>
      <PageTitle title="活動報告" imageUrl="./img/Activities/2025-0511-1.jpg" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <ActivitiesContents />
        </main>
      </div>
    </div>
  );
};

export default Activities;
