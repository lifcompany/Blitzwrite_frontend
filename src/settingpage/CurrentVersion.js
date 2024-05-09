import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";
import Notification from "../component/notification";
import Error from "../component/error";

const CurrentVersion = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  const setEditVersionID = props.seteditversionID;
  const editModel = (modelId) => {
    console.log("Editing model with ID:", modelId);
    setEditVersionID(modelId);
  };
  const deleteModel = (delete_Id) => {
    setNotification("")
    axios
      .post(`${apiUrl}/delete_model`, { id: delete_Id }) 
      .then((response) => {
        get_model_list();
        setNotification("正常に削除されました。")
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const [model, setModel] = useState([]);

  const get_model_list = useCallback(() => {
    axios
      .get(`${apiUrl}/get_model_list`) 
      .then((response) => {
        setModel(response.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    console.log(props?.isTriggered)
    get_model_list();
  }, [props.isTriggered]);


  const set_new_model = () => {
    setEditVersionID("");
  };

  return (
    <div className=" flex items-center justify-center md:w-full">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-[27rem] min-h-96 ">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-8">
          バージョン一覧
        </h1>
        <div className="overflow-y-auto min-h-72 my-16 max-h-80">
          {model.map((model) => (
            <div
              key={model._id}
              className="flex justify-between items-center py-2 border-b px-3"
            >
              <div className="flex items-center">
                <CheckCircleOutlineIcon className="text-blue-500 mr-2" />
                <span className="text-gray-700">{model.display_name}</span>
              </div>
              <div className="flex items-center">
                <EditIcon
                  className="text-gray-600 hover:text-gray-900 cursor-pointer mr-2 ml-5"
                  onClick={() => editModel(model._id)}
                />
                <DeleteOutlineOutlinedIcon
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => deleteModel(model._id)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* <button
          className="mt-4 bg-blue-500 text-white rounded-full py-2 px-8 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
          onClick={() => set_new_model(model._id)}
        >
          新規モデル追加
        </button> */}
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full py-2"
            onClick={() => set_new_model(model._id)}
          >
            新規モデル追加
          </Button>
        </div>
      </div>
      <Notification content={notification}/>
      <Error content={error}/>
    </div>
  );
};

export default CurrentVersion;
