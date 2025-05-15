import TableOfContents from "../components/TableOfContenst";
import ExamsContents from "../contents/ExamsContents";

const Exams = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse px-4 py-24 gap-6 max-w-screen-xl mx-auto bg-color-gray">
      <TableOfContents />
      <main className="w-full lg:w-4/5">
        <ExamsContents />
      </main>
    </div>
  );
};

export default Exams;
