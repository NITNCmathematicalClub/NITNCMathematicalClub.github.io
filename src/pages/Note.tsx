import React from "react";
import PageTitle from "../components/PageTitle.tsx";
import NoteCalendar from "../components/NoteCalendar.tsx"; // NoteCalendarコンポーネントをインポート

const Note = () => {
  return (
    <div>
      <PageTitle title="雑記帳" imageUrl="/img/Note/cover.jpg" />
      <div className="flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        {/* <div
          className="text-text-base font-sans border-t border-gray-white"
          id="introduce-content"
        > */}
        <NoteCalendar /> {/* NoteCalendarコンポーネントを配置 */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Note;
