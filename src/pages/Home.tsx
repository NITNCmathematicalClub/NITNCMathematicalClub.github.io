import React from "react";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray text-text-base">
      <HeroSlider />

      <div className="relative py-8 px-4 bg-blue text-text-hfbase text-center font-serif font-bold text-3xl">
        数理科学が大好きな, 学生たちの同好会.
      </div>

      <section className="flex pt-4 px-4 bg-background text-text-base">
        <div className="relative bg-background rounded-2xl shadow-xl p-10 font-serif">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-base mb-4">
            数理同好会って何？
          </h2>
          <p className="text-lg md:text-xl text-text-muted font-semibold mb-6">
            数理同好会は沼津高専で3番目に新しい同好会です.<br></br>
            部員同士で議論をしたり, 学校行事の手伝いをしたり,
            活動は多岐に渡ります.
          </p>
          {/* <p className="text-lg md:text-xl text-text-muted mb-6">
            
          </p> */}
          <Link to="/introduce">
            <button className="bg-blue text-text-hfbase px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
              詳しく見る
            </button>
          </Link>
        </div>
      </section>
      <section className="flex pt-4 px-4 bg-background text-text-base">
        <div className="relative bg-background rounded-2xl shadow-xl p-10 font-serif">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-base mb-4">
            活動報告
          </h2>
          <p className="text-lg md:text-xl text-text-muted font-semibold mb-6">
            実態がよくわからないので, 直近での活動を載せました.
          </p>
          {/* <p className="text-lg md:text-xl text-text-muted mb-6">
            
          </p> */}
          <Link to="/activities">
            <button className="bg-blue text-text-hfbase px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
              詳しく見る
            </button>
          </Link>
        </div>
      </section>
      <section className="flex pt-4 px-4 bg-background text-text-base">
        <div className="relative bg-background rounded-2xl shadow-xl p-10 font-serif">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-base mb-4">
            部誌
          </h2>
          <p className="text-lg md:text-xl text-text-muted font-semibold mb-6">
            1年に1度の高専祭,
            私達は自分が興味を持ったことをまとめた部誌を発行しています.<br></br>
            著作権的に危ないですねスギィなので目次だけ載せています.
          </p>
          {/* <p className="text-lg md:text-xl text-text-muted mb-6">
            
          </p> */}
          <Link to="/clubmagazine">
            <button className="bg-blue text-text-hfbase px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
              詳しく見る
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
