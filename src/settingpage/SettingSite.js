import Button from "@mui/material/Button";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Header from "../component/header";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useDispatch, useSelector } from "react-redux";
import {
  setSiteNameSlice
} from "../features/common/VersionSlice";
import Notification from "../component/notification";
import Error from "../component/error";
import SettingMenu from "./SettingMenu";
import ToastNotification from "../component/ToastNotification";

const SettingSite = () => {
  const versionId = useSelector((state) => state.version.versionId);
  const versionName = useSelector((state) => state.version.versionName);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [siteName, setSiteName] = useState([]);
  const [siteUrl, setSiteUrl] = useState([]);
  const [adminName, setAdminName] = useState([]);
  const [adminPass, setAdminPass] = useState([]);

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

  
  const site_data = {
    site_name: siteName,
    site_url: siteUrl,
    admin_name: adminName,
    admin_pass: adminPass,
  };

  const registerSite = () => {
    setLoading(true);
    setError(null);
    axios
      .post(`${apiUrl}/run_script`, site_data)
      .then((response) => {
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
    dispatch(setSiteNameSlice(siteName));
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
            サイト
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
                label="サイト名"
                placeholder="サイト名"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={siteName}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setSiteName(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <TextField
                  label="サイトのURL"
                  placeholder="URL"
                  className="flex w-full sm:w-256 mx-8 my-10"
                  value={siteUrl}
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <p>https://から入力してください</p>
              </div>
              <TextField
                label="サイトのログインID"
                placeholder="ログインID"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={adminName}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setAdminName(e.target.value)}

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="サイトのログインパスワード"
                placeholder="ログインパスワード"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={adminPass}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setAdminPass(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </div>

          <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
          <div className=" py-4">
            <Button
              // className="py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
              variant="contained"
              onClick={registerSite}
              sx={{
                backgroundColor: "#0F1740",
                color: "white",
                fontWeight: "bold",
                paddingY: 2,
                paddingLeft: 4,
                paddingRight: 4,
                borderRadius: "lg",
                "&:hover": {
                  backgroundColor: "#22294e",
                },
                "&:focus": {
                  outline: "none",
                  backgroundColor: "#0e1225",
                },
              }}
            >
              連携する
            </Button>
          </div>
          {/* <Button startIcon={<StarIcon />}>Favorite</Button> */}
        </div>
      </div>
      <ToastNotification />
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingSite;
