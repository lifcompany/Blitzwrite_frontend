import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  setVersionId,
  setVersionName,
  setDisplayName,
} from "../../features/VersionSlice";
import Header from "../../component/common/header";
import Notification from "../../component/common/notification";
import Error from "../../component/common/error";
import api from "../../api";

const HomePage = () => {
  const versionId = useSelector((state) => state.version.versionId);
  const versionName = useSelector((state) => state.version.versionName);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(versionId);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
  };

  const get_model_list = useCallback(() => {
    api
      .get(`${apiUrl}/api/setting/get_model_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setModels(response.data);

        // Set gpt-3.5-turbo as the default model if available
        if (!selectedModelId) {
          const defaultModel = response.data.find((model) => model.model_name === "gpt-3.5-turbo");
          if (defaultModel) {
            setSelectedModelId(defaultModel.id);
            dispatch(setVersionId(defaultModel.id));
            dispatch(setVersionName(defaultModel.model_name));
            dispatch(setDisplayName(defaultModel.display_name));
          }
        }

      })
      .catch((error) => {
        console.log(error);

        setError(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    isAuthenticated() ? get_model_list() : navigate("/login");
  }, []);

  const handleStart = () => {
    navigate("/artgen/setkeyword");
    setLoading(true);
    setError(null);
  };

  function handleSelectedModel(event) {
    const model_id = event.target.value;
    console.log(model_id);
    const model_item = models.find((model) => model.id === model_id);
    const model_name = model_item ? model_item.model_name : null;
    setSelectedModelId(model_id);
    dispatch(setVersionId(model_id));
    dispatch(setVersionName(model_name));
  }

  return (
    <div className="text-center pb-12">
      <Header />
      <div className="relative flex flex-col justify-between items-start text-gray-900 px-40">
        <h1 className="  heading font text-[calc(8px+2vmin)] text-gray-900 font-semibold mt-16">
          記事の生成
        </h1>
        <h2 className=" text-xl heading font text-[calc(2vmin)] font-semibold mt-14 mb-14">
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
              <MenuItem value={model.id} key={model.id}>
                {model.model_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
        <div className=" py-6">
          <Button
            variant="contained"
            onClick={handleStart}
            sx={{
              backgroundColor: "#0F1740",
              color: "white",
              fontWeight: "bold",
              paddingY: 2,
              paddingLeft: 3,
              paddingRight: 3,
              borderRadius: "lg",
              fontSize: "18px",
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
      </div>
      <h5 className=" font-semibold mb-5 text-left fixed bottom-5 right-8 text-gray-400">
        View_model : {versionName} <br />
      </h5>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default HomePage;