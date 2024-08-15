import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/common/header";
import Error from "../../component/common/error";
import api from "../../api";

import { useSelector } from "react-redux";

import axios from "axios";
import Button from "../../component/Button";
import ContainerDiv from "../../component/ContainerDiv";
import KwInput from "../../component/KwInput";
import KwTable from "../../component/KwTable";
import Title from "../../component/Title";
import SubTitle from "../../component/SubTitle";

import Notification from "../../component/common/notification";
import { addTitle, clearTitles } from '../../component/indexDB/title';
import CustomTextarea from "../../component/CustomTextarea";

const Progress = (props) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationBadget, setNotificationBadge] = useState("");
  const [configs, setConfigs] = useState([]);
  const [stringConfigs, setStringConfigs] = useState([]);

  const SetNotification = props.SetNotification;
  const versionName = useSelector((state) => state.version.versionName);
  const siteUrl = useSelector((state) => state.site.siteUrl);
  const siteAdmin = useSelector((state) => state.site.siteadmin);
  const sitePassword = useSelector((state) => state.site.sitepassword);

  const location = useLocation();
  const navigate = useNavigate();
  const { keywordsToSend } = location.state || { keywordsToSend: [] };
  const { mainkeyword } = location.state || { mainkeyword: '' };


  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log(keywordsToSend);
    axios
      .post(`${apiUrl}/api/generate/create-heading/`, { keywords: keywordsToSend, main_keyword: mainkeyword, versionName: versionName }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        await clearTitles();
        setNotification("タイトルが正常に作成されました。");
        const title = response.data.title;
        await addTitle({ title });

        setError("");
        setTimeout(() => {
          axios
            .post(`${apiUrl}/api/generate/create-config/`, { keywords: keywordsToSend, main_keyword: mainkeyword, versionName: versionName }, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              const configArray = response.data.config;
              console.log("HHHHHHHHHHHH", configArray);
              setNotification("構成が正常に作成されました。");
              const convertedArray = configArray.map((innerArray, arrayIndex) =>
                innerArray.map((item, index) => ({
                  id: `config${index + 1}`,
                  content: item
                }))
              );
              setConfigs(convertedArray)
              const convertedStrings = configArray.map(innerArray =>
                innerArray.map(item => item).join('\n')
              );
              console.log("GGGGGGGG", convertedStrings);
              setStringConfigs(convertedStrings)
            })
            .catch((error) => {
              console.log('Title Generations Error:', error.response);
              setError(error.response.data.error);
            });
        }, 0);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, [keywordsToSend]);


  useEffect(() => {
    if (stringConfigs.length > 0) {
      console.log("k1k1k1k1k1k1");
      const upload_info = {
        site_url: siteUrl,
        admin: siteAdmin,
        password: sitePassword,
        category: "category",
      }
      console.log(stringConfigs, upload_info);
      setError("");
      setTimeout(() => {

        axios
          .post(`${apiUrl}/api/generate/create-article/`, { keywordconfigs: stringConfigs, versionName: versionName, upload_info: upload_info }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Article Generation Successful", response.data);
            setNotification("記事作成を完了しました。");
            api
              .get(`${apiUrl}/api/generate/send-notification`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log("Notification email is sent successfull");
                setNotificationBadge()
              })
              .catch((error) => {
                console.log("Notification email send error");
              });

            navigate("/artgen/generated");
          })
          .catch((error) => {
            console.log('Article Generations Error:', error.response);
            setError(error.response.data.error);
          });
      }, 0);
    }

  }, [stringConfigs, mainkeyword]);


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (progress < 100) {
  //       setProgress((prevProgress) => prevProgress + 1);
  //     } else {
  //       clearInterval(interval);
  //       setIsDone(true);
  //       SetNotification("完了");
  //       api
  //         .get(`${apiUrl}/api/generate/send-notification`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           SetNotification(response.data["success"]);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setError(error.response.data.error);
  //         });

  //       setTimeout(() => {
  //         navigate("/artgen/generated");

  //       }, 2000);
  //     }
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, [navigate, progress]);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-40">
        <h1 className="heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          記事の作成
        </h1>
        <div className="px-4 w-full py-2 font text-[calc(2vmin)] text-[#014361] p-3 rounded-md mt-10 mb-8">
          <div className="w-full m-auto bg-gray-100 rounded-sm p-10">
            <div className="w-full m-auto bg-gray-200 rounded-sm">
              <div
                className="bg-blue-700 text-white rounded-sm h-5 "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-md mt-1">
              {isDone ? "完了" : `[${progress}/100] 記事生成中... `}
            </p>
          </div>
        </div>
      </div>
      <Error content={error} />
    </div>
  );
};

export default Progress;
