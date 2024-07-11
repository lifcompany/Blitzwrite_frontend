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
import { useNavigate } from 'react-router-dom';
import SubTitle from '../../component/SubTitle';
import TitleContainer from '../../component/subkwset/TitleContainer';
import ConfigList from '../../component/subkwset/ConfigList';


export default function ArticleConfiguration() {
  const subKeywords = [
    "Name", "keywrd", "family", "friends",
    "React", "Angular", "TypeScript", "Wordpress",
    "PHP", "Django", "Restfull API",
    "keywrd", "keywasdfdsrd", "ksadfdsd", "keywrd", "keywrdsfdsd",
  ]

  const navigate = useNavigate('');
  const handlearticleend = () => {
    navigate('/setting/article-end')
  }

  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 sm:gap-20 flex-col sm:flex-row">
          <Title label="記事生成" />
          <Step />
        </div>
        <SubTitle order="1" label="サブキーワードを設定してください" sublabel="" />
        <KeyWordShow />
        <form action="" className="mt-4 ">
          <div className="text-[#252936]">
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
            <Button onClick={() => { }} common label="タイトルを生成する（3/3）" />
            <p className="text-[14px]">※生成は３回までです。</p>
          </div>
        </form>

        <SubTitle order="2" label="タイトルを設定してください" sublabel="" />
        <form action="" className="text-[#3C4257]">
          <p className="text-[14px] mb-3 font-medium">タイトル案</p>
          <TitleContainer />
          <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
            <Button onClick={() => { }} common label="タイトルを生成する（3/3）" />
            <p className="text-[14px]">※生成は３回までです。</p>
          </div>
        </form>

        <SubTitle order="3" label="記事構成を作成してください" sublabel="" />
        <div className="flex sm:flex-row flex-col">
          <FinalSet
            keyword="シミが消える化粧品ランキング"
            subkeyword="アットコスメ"
            title="シミが消える？〜〜〜〜〜"
          />
          <div className="w-full sm:pl-4 mt-4 sm:mt-0">
            <p className="text-[14px] mb-4">記事構成</p>
            <div className="overflow-x-auto">
              <table className="divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className=" bg-gray-200 text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2  font-bold text-gray-900 text-xs text-left">導入文</th>
                    <th className="whitespace-nowrap px-4 py-2  h-fit font-bold text-gray-900 text-xs text-left">リード文</th>
                    <th className="whitespace-nowrap px-4 py-2 w-full font-bold text-gray-900 text-xs text-left"></th>
                  </tr>
                </thead>
              </table>
              <ConfigList />
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
          <Button onClick={handlearticleend} common label="記事を生成する" />
        </div>
      </div>
    </ContainerDiv>
  );
}
