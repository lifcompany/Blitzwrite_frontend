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
} from "../features/common/VersionSlice";
import Header from "../component/header";
import Notification from "../component/notification";
import Error from "../component/error";

const HomePage = () => {
  const versionId = useSelector((state) => state.version.versionId);
  const versionName = useSelector((state) => state.version.versionName);
  const displayName = useSelector((state) => state.version.displayName);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(versionId);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
  };

  const get_model_list = useCallback(() => {
    console.log(apiUrl);
    axios
      .get(`${apiUrl}/api/setting/get_model_list`)
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    isAuthenticated() ? (navigate('/home')):(navigate('/login'));
    get_model_list();
    console.log(localStorage.getItem("accessToken"))
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
    console.log("model_id:", model_id);
    dispatch(setVersionId(model_id));
    dispatch(setVersionName(model_name));
    dispatch(setDisplayName(display_name));
  }

  return (
    <div className="text-center pb-12">
      <Header />
      <div className="relative flex flex-col justify-between items-start pl-80">
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
                {model.model_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
        <div className=" py-12">
          <Button
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
      </div>
      <h5 className=" font-semibold mb-5 text-left fixed bottom-5 right-8 text-gray-400">
        Display Name : {displayName}
        <br />
        View_model : {versionName} <br />
        Id : {versionId}
      </h5>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default HomePage;
