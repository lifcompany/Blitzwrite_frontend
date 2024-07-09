import React from 'react';
import ContainerDiv from '../../component/ContainerDiv';
import Title from '../../component/Title';
import Step from '../../component/Step';
import Button from '../../component/Button';
import SubSetting from '../../component/SubSetting';
import Config from '../../component/subkwset/Config';
import GptTitle from '../../component/subkwset/GptTitle';
import SubKwSetting from '../../component/subkwset/subkwset';
import KeyWordShow from '../../component/subkwset/keywordis';
import FinalSet from '../../component/subkwset/FinalSet';


export default function ArticleConfiguration() {
  const subKeywords = [
    "keywrd", "keywrd", "keydsaawrd", "keywrd",
    "kedsafsdafdsywrd", "keywrd", "keywrd", "kesadfdsafywrd",
    "keywrd", "keywrd", "kesadfdsafywrd",
    "keywrd", "keywasdfdsrd", "ksadfdsd", "keywrd", "keywrdsfdsd",
  ]
  const chatGptTitle = [
    "1．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
    "2．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
    "3．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
    "4．タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案",
  ]

  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 sm:gap-20 flex-col sm:flex-row">
          <Title label="記事生成" />
          <Step />
        </div>
        <SubSetting label="1" title="サブキーワードを設定してください">
          <KeyWordShow />
          <form action="" className="mt-4 ">
            <div className="text-[#3C4257]">
              <p className="text-[14px] mb-2 font-medium">サブキーワード</p>
              <div className="bg-[#F5F8F8] w-full p-6 rounded-lg">
                <div className="flex flex-wrap gap-4">
                  {subKeywords.map((keyword, index) => (
                    <SubKwSetting
                      key={index}
                      label={keyword}
                    />
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <input type="text" className="w-full sm:w-[350px] h-[50px] p-[12px] text-base border-2 rounded-lg" />
                  <button className="text-[14px] text-[#5469D4] min-w-max">追加する</button>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
              <Button common label="タイトルを生成する（3/3）" />
              <p className="text-[14px]">※生成は３回までです。</p>
            </div>
          </form>
        </SubSetting>
        <SubSetting label="2" title="タイトルを設定してください">
          <form action="" className="text-[#3C4257]">
            <p className="text-[14px] mb-3 font-medium">タイトル案</p>
            <div className="bg-[#F5F8F8] w-full p-6 rounded-lg">
              <div className="flex flex-wrap gap-4">
                {chatGptTitle.map((keyword, index) => (
                  <GptTitle
                    key={index}
                    label={keyword}
                  />
                ))}
              </div>
            </div>
            <p className="text-[14px] mt-4 mb-2 font-medium">今回作成する記事タイトルを入力してください</p>
            <input type="text" className="w-full sm:w-[650px] h-[50px] p-[12px] text-base border-2 rounded-lg" />
            <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
              <Button common label="タイトルを生成する（3/3）" />
              <p className="text-[14px]">※生成は３回までです。</p>
            </div>
          </form>
        </SubSetting>
        <SubSetting label="3" title="記事構成を作成してください">
          <div className="flex sm:flex-row flex-col">
            <FinalSet
              keyword="シミが消える化粧品ランキング"
              subkeyword="アットコスメ"
              title="シミが消える？〜〜〜〜〜"
            />
            <div className="w-full sm:pl-4 mt-4 sm:mt-0">
              <p className="text-[14px] mb-4">記事構成</p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 w-[1%] font-bold text-gray-900 text-xs text-left">導入文</th>
                      <th className="whitespace-nowrap px-4 py-2 w-[80%] h-fit font-bold text-gray-900 text-xs text-left">リード文</th>
                      <th className="whitespace-nowrap px-4 py-2  font-bold text-gray-900 text-xs text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <Config />
                    <Config />
                    <Config />
                    <Config />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
            <Button common label="記事を生成する" />
          </div>
        </SubSetting>
      </div>
    </ContainerDiv>
  );
}
