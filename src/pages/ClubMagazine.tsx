import PageTitle from "../components/PageTitle";
import TableOfContents from "../components/TableOfContents";
import ClubMagazineContents from "../contents/ClubMagazineContents";

const ClubMagazine = () => {
  return (
    <div>
      <PageTitle title="部誌" imageUrl="./img/ClubMagazine/cover.jpg" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <ClubMagazineContents />
        </main>
      </div>
    </div>
  );
};

export default ClubMagazine;
