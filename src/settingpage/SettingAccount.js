import Button from "@mui/material/Button";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Header from "../component/header";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useDispatch, useSelector } from "react-redux";
import {
  setVersionId,
  setVersionName,
  setDisplayName,
} from "../features/common/VersionSlice";
import Notification from "../component/notification";
import Error from "../component/error";
import SettingMenu from "./SettingMenu";
import ToastNotification from "../component/ToastNotification";
import AccountModal from "./AccountModal";

const SettingSite = () => {
  const versionId = useSelector((state) => state.version.versionId);
  const versionName = useSelector((state) => state.version.versionName);
  const displayName = useSelector((state) => state.version.displayName);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(versionId);
  const [selectedCategory, setSelectedCategory] = useState("all");

  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }
  const categories = [
    { slug: "gpt-3.5-turbo", title: "GPT-3.5" },
    { slug: "gpt-4", title: "GPT-4" },
  ];

  const apiUrl = process.env.REACT_APP_API_URL;

  const get_model_list = useCallback(() => {
    console.log(apiUrl);
    axios
      .get(`${apiUrl}/get_model_list`)
      .then((response) => {
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

  const handleStart = () => {
    setLoading(true);
    setError(null);
    console.log("Start button clicked");
    axios
      .post(`${apiUrl}/run_script`, { versionId })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setNotification("出力が成功しました");
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
      });
  };

  const handleStop = () => {
    console.log("Start button clicked");
    axios
      .post(`${apiUrl}/stop_script`)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setNotification("正常に停止しました");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data.error);
      });
  };

  function handleSelectedModel(event) {
    const model_id = event.target.value;
    const model_item = models.find((model) => model._id === model_id);
    const display_name = model_item ? model_item.display_name : null;
    const model_name = model_item ? model_item.model_name : null;
    setSelectedModelId(model_id);
    dispatch(setVersionId(model_id));
    dispatch(setVersionName(model_name));
    dispatch(setDisplayName(display_name));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          アカウント
          </h1>
          <div className=" bg-[#E5F6FD] px-4 py-2 font text-[calc(2vmin)] text-[#014361] p-3 rounded-md mt-10 mb-8">
            <InfoOutlinedIcon className="mr-2 text-[#0288D1]" />
            現在、WordPressで作られたサイトしか連携出来ません。
          </div>          
          <div className="mt-5">
            <FormControl
              className="flex flex-col gap-10 w-[320px] sm:w-136"
              variant="outlined"
            >
              <TextField
                label="メールアドレス"
                placeholder="test@example.jp"
                className="flex w-full sm:w-256 mx-8 my-10"
                // value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                // onChange={handleSearchText}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </div>

          <div className=" py-4">
            <Button
              variant="contained"
              onClick={handleStart}
              sx={{
                backgroundColor: "#ffffff",
                color: "#CD2424",
                fontWeight: "bold",
                paddingY: 2,
                paddingLeft: 4,
                paddingRight: 4,
                borderRadius: "lg",
                "&:hover": {
                  backgroundColor: "#efeeee",
                },
                "&:focus": {
                  outline: "none",
                  backgroundColor: "#cbc9c9",
                },
              }}
            >
              サービスの退会
            </Button>
            <AccountModal/>
          </div>
        </div>
      </div>
      <ToastNotification/>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingSite;