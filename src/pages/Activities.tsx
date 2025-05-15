import TableOfContents from "../components/TableOfContenst";
import ActivitiesContents from "../contents/ActivitiesContents";

const Activities = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse px-4 py-24 gap-6 max-w-screen-xl mx-auto bg-color-gray">
      <TableOfContents />
      <main className="w-full lg:w-4/5">
        <ActivitiesContents />
      </main>
    </div>
  );
};

export default Activities;
