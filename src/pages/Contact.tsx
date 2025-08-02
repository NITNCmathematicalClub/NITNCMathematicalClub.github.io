// import React from "react";
import PageTitle from "../components/PageTitle";
import { FaTwitter, FaEnvelope } from "react-icons/fa"; // アイコンを直接インポート

// ContactContents コンポーネントは不要になるため、削除します。

const Contact = () => {
  return (
    <div>
      <PageTitle title="お問い合わせ" />
      <div className="text flex flex-col md:flex-row-reverse px-4 py-12 gap-6 max-w-screen-xl mx-auto bg-color-gray">
        {/* TableOfContentsは不要なので削除 */}
        <main className="w-full">
          {" "}
          {/* 目次がないため、w-fullに変更 */}
          <div>
            <h2 className="h2-style">お問い合わせ先一覧</h2>
            <p className="mb-4 mt-4">
              数理同好会へのお問い合わせは、以下のいずれかの方法でご連絡ください。
              ご質問など、お気軽にお問い合わせください。
            </p>

            {/* お問い合わせ先一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Twitter (X) */}
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="flex items-center text-xl font-bold mb-4 text-text-accent">
                  <FaTwitter className="w-6 h-6 mr-3 text-blue" />
                  X(旧Twitter)
                </h3>
                <p className="text-text-base mb-4">ごくたまーに呟いています.</p>
                <a
                  href="https://twitter.com/NIT_clubmath" // ここに実際のアカウントURLを入力
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-blue rounded-lg text-lg font-sans font-semibold text-white border-white border-1"
                >
                  <FaTwitter className="w-4 h-4 mr-2" />
                  @NIT_clubmath
                </a>
              </div>

              {/* Twitter (X) */}
              {/* <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="flex items-center text-xl font-bold mb-4 text-text-accent">
                  <FaEnvelope className="w-6 h-6 mr-3 text-blue" />
                  メール
                </h3>
                <p className="text-text-base mb-4">顧問に届きます.</p>
                <a
                  href="m-suzuki@numazu.kosen-ac.jp" // ここに実際のアカウントURLを入力
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-blue rounded-lg text-lg font-sans font-semibold text-white border-white border-1"
                >
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  @NIT_clubmath
                </a>
              </div> */}

              {/* メールアドレス */}
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="flex items-center text-xl font-bold mb-4 text-text-accent">
                  <FaEnvelope className="w-6 h-6 mr-3 text-gray-blue" />
                  メールアドレス
                </h3>
                <p className="text-text-base mb-4">顧問に届きます.</p>
                <a
                  href="mailto:m-suzuki@numazu.konsen-ac.jp" // ここに実際のメールアドレスを入力
                  className="flex items-center justify-center p-4 bg-blue rounded-lg text-lg font-sans font-semibold text-white border-white border-1"
                >
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  m-suzuki@numazu.kosen-ac.jp
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
