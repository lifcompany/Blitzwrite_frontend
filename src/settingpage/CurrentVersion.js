import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Notification from "../component/notification";
import Error from "../component/error";
import EditModel from "./EditModel";

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
    setNotification("");
    axios
      .post(`${apiUrl}/api/setting/delete_model/`, { id: "delete_Id" })
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
      .get(`${apiUrl}/api/setting/get_model_list`)
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
      <EditModel/>
      <div className="bg-white w-full min-h-96">
        <h1 className="text-xl mb-4 px-8">モデル名</h1>
        <div className="overflow-y-auto min-h-72 my-8 max-h-80">
          {model.map((model) => (
            <div
              key={model._id}
              className="flex justify-between items-center py-5 border-b px-8 "
            >
              <div className="flex items-center">
                <span className="text-gray-700 text-[calc(2vmin)]">{model.display_name}</span>
              </div>
              <div className="flex items-center">
                <EditIcon
                  className="text-gray-600 hover:text-gray-900 cursor-pointer mr-8 ml-5"
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
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default CurrentVersion;
