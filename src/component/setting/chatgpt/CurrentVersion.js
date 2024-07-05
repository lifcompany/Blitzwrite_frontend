import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Notification from "../../common/notification";
import Error from "../../common/error";
import AddModel from "./AddModel";
import EditModel from "./EditModel";

const CurrentVersion = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  const setEditVersionID = props.seteditversionID;
  const token = localStorage.getItem("accessToken");

  const editModel = (modelId) => {
    console.log("Editing model with ID:", modelId);
    setEditVersionID(modelId);
  };
  const deleteModel = (model_name) => {
    setNotification("");
    axios
      .post(`${apiUrl}/api/setting/delete_model/`, { model_name: model_name })
      .then((response) => {
        get_model_list();
        setNotification("正常に削除されました。");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const [model, setModel] = useState([]);

  const get_model_list = useCallback(() => {
    axios
      .get(`${apiUrl}/api/setting/get_model_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setModel(response.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    console.log(props?.isTriggered);
    get_model_list();
  }, [props.isTriggered]);

  const set_new_model = () => {
    setEditVersionID("");
  };

  return (
    <div className="items-center justify-center md:w-full shadow-lg border-2 rounded-md">
      <AddModel/>
      <div className="bg-white w-full min-h-96">
        <h1 className="text-xl mb-4 px-8">モデル名</h1>
        <div className="overflow-y-auto min-h-72 my-8 max-h-80">
          {model.map((model) => (
            <div
              key={model._id}
              className="flex justify-between items-center py-5 border-b px-8 "
            >
              <div className="flex items-center">
                <span className="text-gray-700 text-[calc(2vmin)]">{model.model_name}</span>
              </div>
              <div className="flex items-center">
                <EditModel model_name={model.model_name}/>
                <DeleteOutlineOutlinedIcon
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => deleteModel(model.model_name)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default CurrentVersion;
