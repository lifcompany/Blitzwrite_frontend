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
import api from "../../api";


const InitPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [mainKeyword, setMainKeyword] = useState();
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const versionName = useSelector((state) => state.version.versionName);

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
        console.log("selected keyword Data", keywordsToSend, mainKeyword);

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
        setError("選択されたキーワードがありません。");


      }
    }, 0);
  };

  const handleCreateHeading = () => {
    setError(""); // Clear the error initially to trigger a re-render
    setTimeout(() => {
      if (selectedKeywords.length > 0) {
        const keywordsToSend = selectedKeywords.map(keyword => ({
          keyword: keyword.keyword,
          volume: keyword.avg_monthly_searches // Assuming avg_monthly_searches is the volume
        }));
        console.log("selected keyword Data", keywordsToSend, mainKeyword, versionName);

        axios
          .post(`${apiUrl}/api/generate/create-heading/`, { keywords: keywordsToSend, main_keyword: mainKeyword, versionName: versionName }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // setNotification();
            console.log('Keywords saved successfully:', response.data);
          })
          .catch((error) => {
            setError(error.response.data.error);
          });
      } else {
        setError("Non selected the keyword");
      }
    }, 0); // Use setTimeout to d
  }
  return (
    <ContainerDiv>
      <div className="flex flex-col gap-5">
        <div>
          <Title label="キーワード生成" />
          <SubTitle order="1" label="キーワードを生成しましょう" sublabel="説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト" />
        </div>
        <KwInput setSuggestions={setSuggestions} setMainKeyword={setMainKeyword} />
        <SubTitle order="2" label="キーワードを選んでください" sublabel="説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト" />
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