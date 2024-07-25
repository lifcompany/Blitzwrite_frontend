// src/EditModel.js
import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Notification from "../../common/notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const EditModel = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const editModalName = props.model_name;
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [parameters, setParameters] = useState("");
  const [notification, setNotification] = useState("");

  const handleClose = () => setOpen(false);
  const model_data = {
    model_name: modelName,
    endpoint: endpoint,
    params: parameters,
  };
  const upadte_model = () => {
    if (model_data.model_name === "") {
      console.log("Model name must be provided.");
      return;
    } else {
      axios
        .post(`${apiUrl}/api/setting/update_model/`, model_data)
        .then((response) => {
          console.log(response.data.message);
          setNotification("モデルを更新しました");
          setTimeout(() => {
            handleClose();
          }, 500);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleOpen = () => {
    setOpen(true);
    axios
      .post(`${apiUrl}/api/setting/get_edit_version/`, {
        editModalName: editModalName,
      })
      .then((response) => {
        setModelName(response.data["model_name"]);
        setEndpoint(response.data["endpoint"]);
        setParameters(response.data["params"]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setModelName("");
        setEndpoint("");
        setParameters("");
      });
  };

  useEffect(() => {}, [editModalName]);

  return (
    <div className=" p-1">
      <EditIcon
        className="text-gray-600 hover:text-gray-900 cursor-pointer mr-8 ml-5"
        onClick={() => handleOpen()}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
            モデルの編集
          </h2>
          <div className="mb-4">
            <TextField
              id="model-name"
              label="モデル名"
              placeholder="モデル名"
              value={modelName}
              className="flex w-full sm:w-256 mx-8 my-10"
              inputProps={{
                "aria-label": "Search",
              }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <TextField
              id="endpoint"
              label="エンドポイント"
              placeholder="エンドポイント"
              variant="outlined"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex w-full sm:w-256 mx-8 my-10"
              inputProps={{
                "aria-label": "Search",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="mb-6">
            <TextField
              id="parameters"
              label="パラメータ"
              placeholder="パラメータ"
              className="flex w-full sm:w-256 mx-8 my-10"
              variant="outlined"
              value={parameters}
              onChange={(e) => setParameters(e.target.value)}
              multiline
              rows={6}
              inputProps={{
                "aria-label": "Search",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="flex justify-end items-center gap-5">
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full py-2"
                onClick={upadte_model}
              >
                編集
              </Button>
            </div>
            <button
              className=" text-blue-500 roundedtransition"
              onClick={() => handleClose()}
            >
              キャンセル
            </button>
          </div>
        </Box>
      </Modal>
      <Notification content={notification} />
    </div>
  );
};

export default EditModel;
