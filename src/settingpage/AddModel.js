// src/EditModal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import Notification from "../component/notification";

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

const AddModel = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const editversionID = props.editversionID;
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [parameters, setParameters] = useState("");
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const model_data = {
    model_name: modelName,
    endpoint: endpoint,
    params: parameters,
    editversionID: editversionID,
  };
  const add_new_version = () => {
    if (model_data.model_name === "") {
      console.log("Model name must be provided.");
      return;
    } else {
      axios
        .post(`${apiUrl}/api/setting/add_new_version/`, model_data)
        .then((response) => {
          // props.setIsTriggered();
          console.log(response.data.message);
          setNotification("モデルを追加しました");
          setTimeout(() => {
            handleClose();
          }, 500);

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    console.log("ddd:", editversionID);
    axios
      .post(`${apiUrl}/api/setting/get_edit_version`, {
        editversionID: editversionID,
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
  }, [editversionID]);

  return (
    <div className=" p-6">
      <Button
        variant="contained"
        onClick={() => handleOpen()}
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
        モデルを追加
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
            モデルの追加
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
                  onClick={add_new_version}
                >
                  追加
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

export default AddModel;
