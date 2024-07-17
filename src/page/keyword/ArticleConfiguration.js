import React, { useEffect, useState } from 'react';
import axios from "axios";
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
import { useSelector } from 'react-redux';
import Error from "../../component/common/error";
import Notification from "../../component/common/notification";
import { addTitle, getAllTitles, clearTitles } from '../../component/indexDB/title';



export default function ArticleConfiguration() {
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [addedkeyword, setAddedkeyword] = useState("");
  const [mainkeyword, setMainkeyword] = useState("");
  const [suggestkeyword, setSuggestKeyword] = useState([]);
  const [titles, setTitles] = useState([]);
  const [configs, setCofigs] = useState([]);
  const [title, setTitle] = useState("");

  const versionName = useSelector((state) => state.version.versionName);
  const navigate = useNavigate('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchArticles = async () => {
      const allTitles = await getAllTitles();
      if (allTitles.length > 0) {
        setTitles(allTitles[0].title)
        setTitle(allTitles[0].title[0])
      } else {
        setTitles("")
        setTitle("")
      }
    };
    fetchArticles();

    axios
      .get(`${apiUrl}/api/generate/get-keyword-data/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response data", response.data);
        setMainkeyword(response.data.mainkeyword)
        setSuggestKeyword(response.data.suggest_keyword)
      })
      .catch((error) => {
        console.error('キーワード保存エラー:', error);
      });

    const handleUnload = async () => {
      await clearTitles();
    };
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  const handleChangeKeyword = (e) => {
    setAddedkeyword(e.target.value);
  }
  const handleAddKeyword = () => {
    if (addedkeyword.trim() !== "") {
      setSuggestKeyword(prevKeywords => [...prevKeywords, addedkeyword]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleCreateTitle = () => {
    console.log(suggestkeyword);
    setError("");
    setTimeout(() => {
      if (suggestkeyword.length > 0) {
        const keywordsToSend = suggestkeyword.map(keyword => ({
          keyword: keyword
        }));
        axios
          .post(`${apiUrl}/api/generate/create-heading/`, { keywords: keywordsToSend, main_keyword: mainkeyword, versionName: versionName }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data.title);
            setNotification("タイトルが正常に作成されました。");
            setTitles(response.data.title)
            setTitle(response.data.title[0])
          })
          .catch((error) => {
            console.log('Title Generations Error:', error.response);
            setError(error.response.data.error);
          });
      } else {
        setError("選択されたキーワードがありません。");
      }
    }, 0);
  }

  const handleCreateConfig = () => {
    console.log(suggestkeyword);
    setError("");
    setTimeout(() => {
      if (suggestkeyword.length > 0) {
        const keywordsToSend = suggestkeyword.map(keyword => ({
          keyword: keyword
        }));
        axios
          .post(`${apiUrl}/api/generate/create-config/`, { keywords: keywordsToSend, main_keyword: mainkeyword, versionName: versionName }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data.config);
            const configArray = response.data.config[0];
            setNotification("構成が正常に作成されました。");
            const convertedArray = configArray.map((item, index) => ({
              id: `config${index + 1}`,
              content: item["title"]
              // content: item.title.replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags if needed
            }));
            console.log(convertedArray);
            setCofigs(convertedArray)
          })
          .catch((error) => {
            console.log('Title Generations Error:', error.response);
            setError(error.response.data.error);
          });
      } else {
        setError("選択されたキーワードがありません。");
      }
    }, 0);
  }
  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 sm:gap-20 flex-col sm:flex-row">
          <Title label="記事生成" />
          <Step />
        </div>
        <SubTitle order="1" label="サブキーワードを設定してください" sublabel="" />
        <KeyWordShow mainkeyword={mainkeyword} />
        <form action="" className="mt-4 " onSubmit={handleSubmit}>
          <div className="text-[#252936]">
            <p className="text-[14px] mb-2 font-medium">サブキーワード</p>
            <div className="bg-[#F5F8F8] w-full p-6 rounded-lg">
              <div className="flex flex-wrap gap-4">
                {suggestkeyword.map((keyword, index) => (
                  <SubKwSetting
                    key={index}
                    label={keyword}
                  />
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <input type="text" value={addedkeyword} onChange={handleChangeKeyword} className="w-full sm:w-[350px] h-[50px] p-[12px] text-base border-2 rounded-lg" />
                <button onClick={handleAddKeyword} className="text-[14px] text-[#5469D4] min-w-max">追加する</button>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
            <Button onClick={handleCreateTitle} common label="タイトルを生成する（3/3）" />
            <p className="text-[14px]">※生成は３回までです。</p>
          </div>
        </form>

        <SubTitle order="2" label="タイトルを設定してください" sublabel="" />
        <form action="" className="text-[#3C4257]">
          <p className="text-[14px] mb-3 font-medium">タイトル案</p>
          <TitleContainer suggestkeyword={suggestkeyword} titles={titles} setTitle={setTitle} />
          <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
            <Button onClick={() => { }} common label="記事構成を生成する（3/3）" />
            <p className="text-[14px]">※生成は３回までです。</p>
          </div>
        </form>

        <SubTitle order="3" label="記事構成を作成してください" sublabel="" />
        <div className="flex sm:flex-row flex-col">
          <FinalSet
            keyword={mainkeyword}
            subkeyword="アットコスメ"
            title={title}
          />
          <div className="w-full sm:pl-4 mt-4 sm:mt-0">
            <p className="text-[14px] mb-4">記事構成</p>
            <div className="overflow-x-auto">
              <table className="divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className=" bg-gray-200 text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-xs text-left">導入文</th>
                    <th className="whitespace-nowrap px-4 py-2 h-fit font-bold text-gray-900 text-xs text-left">リード文</th>
                    <th className="whitespace-nowrap px-4 py-2 w-full font-bold text-gray-900 text-xs text-left"></th>
                  </tr>
                </thead>
              </table>
              <ConfigList configs_data={configs} />
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row items-center sm:justify-start gap-4 flex-col justify-center my-4">
          <Button onClick={handleCreateConfig} common label="記事を生成する" />
        </div>
      </div>
      <Error content={error} />
      <Notification content={notification} />
    </ContainerDiv>
  );
}
