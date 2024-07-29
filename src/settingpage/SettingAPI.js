import React, { useEffect, useState, useCallback } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Header from "../component/common/header";
import { useSelector } from "react-redux";
import Notification from "../component/common/notification";
import Error from "../component/common/error";
import SettingMenu from "../component/common/SettingMenu";
import CurrentVersion from "../component/setting/chatgpt/CurrentVersion";
import api from "../api";

const SettingAPI = () => {
  const versionId = useSelector((state) => state.version.versionId);
  const versionName = useSelector((state) => state.version.versionName);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [models, setModels] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const get_model_list = useCallback(() => {
    console.log(apiUrl);
    const token = localStorage.getItem("accessToken");

    api
      .get(`${apiUrl}/api/setting/get_model_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setModels(response.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    console.log(versionId, versionName);
    get_model_list();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-auto lg:w-72 border-r-2 border-gray-300">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start px-8 md:px-14 lg:px-28 xl:px-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
            API連携
          </h1>
          <div className=" bg-[#E5F6FD] py-2 font text-[calc(2vmin)] text-[#014361] rounded-md mt-10 mb-8">
            <InfoOutlinedIcon className="mr-2 text-[#0288D1]" />
            現在、chatGPTのみ連携可能です。
          </div>
          <CurrentVersion />
          <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingAPI;
