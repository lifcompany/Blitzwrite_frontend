import Button from "@mui/material/Button";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Header from "../component/header";
import { useDispatch, useSelector } from "react-redux";
import {
  setVersionId,
  setVersionName,
  setDisplayName,
} from "../features/common/VersionSlice";
import Notification from "../component/notification";
import Error from "../component/error";
import SettingMenu from "./SettingMenu";

const Setting = () => {
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
          <SettingMenu/>
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-28">
            記事の生成
          </h1>
          <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-20 mb-16">
            バージョンの選択
          </h2>
          <FormControl className="flex w-[320px] sm:w-136" variant="outlined">
            <InputLabel id="category-select-label" className=" text-[1.3rem]">
              バージョン
            </InputLabel>
            <Select
              className=" text-[1.3rem]"
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={selectedModelId}
              onChange={handleSelectedModel}
            >
              {models.map((model) => (
                <MenuItem value={model._id} key={model._id}>
                  {model.display_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-5">
            <FormControl
              className="flex  w-[320px] sm:w-136"
              variant="outlined"
            >
              <InputLabel id="category-select-label">バージョン</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                label="Category"
                value={selectedCategory}
                onChange={handleSelectedCategory}
              >
                <MenuItem value="all">GPT-4-Turbo</MenuItem>
                {categories.map((category, index) => (
                  <MenuItem value={category.slug} key={index}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
          <div className=" py-12">
            <Button
              // className="py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
              variant="contained"
              onClick={handleStart}
              sx={{
                backgroundColor: "#0F1740",
                color: "white",
                fontWeight: "bold",
                paddingY: 2,
                paddingLeft: 2,
                paddingRight: 2,
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
              作成を開始する
            </Button>
          </div>
          {/* <Button startIcon={<StarIcon />}>Favorite</Button> */}
        </div>
      </div>

      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default Setting;
