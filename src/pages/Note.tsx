// import React from "react";
import PageTitle from "../components/PageTitle.tsx";
import NoteCalendar from "../components/NoteCalendar.tsx"; // NoteCalendarコンポーネントをインポート
import TableOfContents from "../components/TableOfContents.tsx";

const Note = () => {
  return (
    <div>
      <PageTitle title="雑記帳" imageUrl="/img/Note/cover.jpg" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        <TableOfContents />
        <main className="w-full lg:w-4/5">
          <div className="text">
            <h2 className="h2-style">概要</h2>
            <p>
              その日にあったことを気軽に呟いているものです.
              日々更新されていくので, 暇なときに見てみると面白いかもしれません.
            </p>
            <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
              <NoteCalendar /> {/* NoteCalendarコンポーネントを配置 */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Note;
