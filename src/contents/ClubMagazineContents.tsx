import { InlineMath } from "react-katex";

const ClubMagazineContents = () => {
  return (
    <div className="text">
      {/* <h1 className="page-title">数理同好会って何？</h1> */}
      <h2 className="h2-style">概要</h2>
      <p>
        数理同好会では毎年, 高専祭に向けて部誌『
        <InlineMath math="\sum"></InlineMath>』を発行しています.
        これは同好会のメンバーたちがそれぞれ気になっている話題や自分自信の考えを
        持ち寄り, それを一冊の冊子としてまとめたものです.{" "}
      </p>
      <p>
        また, 部誌のタイトルには初代部長(会長?)の思い,
        「和を以て数学を為す」から名付けられました.
      </p>
    </div>
  );
};

export default ClubMagazineContents;
