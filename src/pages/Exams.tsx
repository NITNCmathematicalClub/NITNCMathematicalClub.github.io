import PageTitle from "../components/PageTitle";
import TableOfContents from "../components/TableOfContents";
import ExamsContents from "../contents/ExamsContents";

const Exams = () => {
  return (
    <div>
      <PageTitle title="過去問解説" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <ExamsContents />
        </main>
      </div>
    </div>
  );
};

export default Exams;
