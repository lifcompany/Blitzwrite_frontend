import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/common/header";
import Error from "../../component/common/error";
import api from "../../api";

import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux';
// import { addNotification } from "../../features/notificationSlice";

import axios from "axios";
import Notification from "../../component/common/notification";
import { addTitle, clearTitles } from '../../component/indexDB/title';

const Progress = (props) => {
  const [progress, setProgress] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [configs, setConfigs] = useState([]);
  const [stringConfigs, setStringConfigs] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [successOutput, setSuccessOutput] = useState(0);
  const [faildOutput, setFaildOutput] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0)


  const SetNotification = props.SetNotification;
  const dispatch = useDispatch();

  const { versionName, siteUrl, siteAdmin, sitePassword } = useSelector((state) => ({
    versionName: state.version.versionName,
    siteUrl: state.site.siteUrl,
    siteAdmin: state.site.siteadmin,
    sitePassword: state.site.sitepassword
  }));

  const location = useLocation();
  const { keywordsToSend, mainkeyword } = location.state || { keywordsToSend: [], mainkeyword: '' };

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");


  const handleApiError = (error) => {
    console.error(error);
    setError(error?.response?.data?.error || "エラーが発生しました。");
  };

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
        setProgress(2);
        await clearTitles();
        const title = response.data.title;
        await addTitle({ title });
        setNotification("タイトルが正常に作成されました。");

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
              setProgress(3);
              const configArray = response.data.config;
              const convertedArray = configArray.map((innerArray, arrayIndex) =>
                innerArray.map((item, index) => ({
                  id: `config${index + 1}`,
                  content: item
                }))
              );
              setConfigs(convertedArray)
              const convertedStrings = configArray.map(innerArray => innerArray.map(item => item).join('\n'));
              console.log(convertedStrings);
              setStringConfigs(convertedStrings)
              setNotification("構成が正常に作成されました。");
            })
            .catch((error) => {
              handleApiError(error);

            });
        }, 0);
      })
      .catch((error) => {
        handleApiError(error);
      });
  }, [keywordsToSend]);

  useEffect(() => {
    if (stringConfigs.length > 0) {
      const upload_info = { site_url: siteUrl, admin: siteAdmin, password: sitePassword, category: "category" };
      setError("");
      setNotification("");
      setCurrentRequest(0);

      const baseInterval = 1000; // Base interval in milliseconds
      const dynamicInterval = baseInterval / stringConfigs.length; // Dynamic interval

      const incrementProgress = () => {
        setProgress((prev) => Math.min(prev + 1, 100)); // Increment by 1% per interval
      };

      const generateArticles = async () => {
        let localSuccessOutput = 0;
        for (let i = 0; i < stringConfigs.length; i++) {
          setCurrentRequest(i + 1); // Track current request

          const intervalId = setInterval(incrementProgress, dynamicInterval);
          setTimerId(intervalId);

          try {
            const config = stringConfigs[i];
            const response = await axios.post(`${apiUrl}/api/generate/create-article/`,
              { keywordconfigs: config, mainkeyword :mainkeyword, versionName: versionName, upload_info: upload_info },
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log(`Article Generation Successful for config ${i + 1}`, response.data);
            setNotification(`記事作成を完了しました: ${i + 1} / ${stringConfigs.length}`);
            localSuccessOutput += 1;
            clearInterval(intervalId);
            setProgress(((i + 1) / stringConfigs.length) * 100);

          } catch (error) {
            // console.log(`Article Generation Error for config ${i + 1}:`, error.response);
            handleApiError(error);
            setFaildOutput((prevCount) => prevCount + 1);
            clearInterval(intervalId);
            break; // Optionally stop the loop on error
          }
        }

        setSuccessOutput(localSuccessOutput);
        const newNotification = {
          content: `記事作成: ${localSuccessOutput}/${stringConfigs.length}`,
          read: false,
          timestamp: new Date().toISOString()
        };
        // dispatch(addNotification(newNotification));


        try {
          await axios.post(`${apiUrl}/api/notifications/`, newNotification, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Notification successfully stored in backend');
        } catch (error) {
          console.error('Failed to store notification in backend', error);
        }
        // Update notifications and unread count
        setNotifications((prevNoti) => [...prevNoti, newNotification]);
        setUnreadCount((prevCount) => prevCount + 1);

        clearInterval(timerId);
        SendNotificationEmail();
        navigate("/artgen/generated");
      };

      generateArticles();

      return () => clearInterval(timerId);

    }
  }, [stringConfigs, mainkeyword]);


  const SendNotificationEmail = () => {
    api
      .get(`${apiUrl}/api/generate/send-notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Notification email is sent successfull");
      })
      .catch((error) => {
        console.log("Notification email send error");
      });
  }

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
              {isDone ? "完了" : `${progress}%  [${keywordsToSend.length} 記事生成中...] `}
            </p>
          </div>
        </div>
      </div>
      <Error content={error} />
    </div>
  );
};

export default Progress;
