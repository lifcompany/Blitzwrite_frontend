import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../component/Button";
import ContainerDiv from "../../component/ContainerDiv";
import KwInput from "../../component/KwInput";
import KwTable from "../../component/KwTable";
import Title from "../../component/Title";
import SubTitle from "../../component/SubTitle";
import Error from "../../component/common/error";
import Notification from "../../component/common/notification";
import { addTitle, clearTitles } from '../../component/indexDB/title';
import CustomTextarea from "../../component/CustomTextarea";

const InitPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [mainKeyword, setMainKeyword] = useState();
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const versionName = useSelector((state) => state.version.versionName);

  const navigate = useNavigate("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  const handleSaveKeyword = () => {
    setNotification("");
    setError("");
    console.log(selectedKeywords.length);
    setTimeout(() => {
      if (selectedKeywords.length > 0) {
        const keywordsToSend = selectedKeywords.map(keyword => ({
          keyword: keyword.keyword,
          volume: keyword.avg_monthly_searches
        }));
        axios
          .post(`${apiUrl}/api/generate/save_keywords/`, { keywords: keywordsToSend, main_keyword: mainKeyword }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('キーワードの保存に成功:', response.data);
            setNotification("キーワードの保存に成功");
          })
          .catch((error) => {
            console.error('キーワード保存エラー:', error);
          });
      } else {
        setError("選択されたキーワードがありません。")
      }
    }, 0);
  };

  const handleCreateHeading = () => {
    console.log(selectedKeywords);
    setError("");
    setTimeout(() => {
      if (selectedKeywords.length > 0) {
        const keywordsToSend = selectedKeywords.map(keyword => ({
          keyword: keyword.keyword,
          volume: keyword.avg_monthly_searches
        }));

        axios
        .post(`${apiUrl}/api/generate/save_keywords/`, { keywords: keywordsToSend, main_keyword: mainKeyword }, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('キーワードの保存に成功:', response.data);
        })
        .catch((error) => {
          console.error('キーワード保存エラー:', error);
        });

        axios
          .post(`${apiUrl}/api/generate/create-heading/`, { keywords: keywordsToSend, main_keyword: mainKeyword, versionName: versionName }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async (response) => {
            await clearTitles();
            console.log('Title Generations successfully:', response.data.title);
            setNotification("タイトルが正常に作成されました。");
            const title = response.data.title;
            await addTitle({title});
            navigate('/keyword/article-configuration')
          })
          .catch((error) => {
            setError(error.response.data.error);
          });
      } else {
        setError("選択されたキーワードがありません。");
      }
    }, 0);
  }

  
  const handleKeywordsGenerated = (newKeywords) => {
    setSuggestions(newKeywords);
  }
  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div>
          <Title label="キーワード生成" />
          <SubTitle order="1" label="キーワードを生成しましょう" sublabel="メインキーワードを入力すると、それに関連するサブキーワードを取得することができます。" />
        </div>
        <KwInput setSuggestions={setSuggestions} setMainKeyword={setMainKeyword} />
        {/* <CustomTextarea onKeywordsGenerated={handleKeywordsGenerated} /> */}
        <SubTitle order="2" label="キーワードを選んでください" sublabel="提案されたキーワードのボリュームを確認し、適切なキーワードを選択することができます。" />
        <KwTable suggestions={suggestions} setSelectedKeywords={setSelectedKeywords} />
        <div className="flex justify-end gap-5">
          <Button common label="キーワード保存" onClick={handleSaveKeyword} />
          <Button common label="タイトル生成" onClick={handleCreateHeading} />
        </div>
      </div>
      <Error content={error} />
      <Notification content={notification} />
    </ContainerDiv>
  );
}

export default InitPage;