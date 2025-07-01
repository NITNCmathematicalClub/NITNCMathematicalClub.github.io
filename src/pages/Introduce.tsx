import React from "react";
import TableOfContents from "../components/TableOfContenst";
import IntroduceContents from "../contents/IntroduceContents.js";
import PageTitle from "../components/PageTitle.js";

const Introduce = () => {
  return (
    <div>
      <PageTitle title="数理同好会って何？" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <IntroduceContents />
        </main>
      </div>
    </div>
  );
};

export default Introduce;
