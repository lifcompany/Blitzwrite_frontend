import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveIcon from "@mui/icons-material/Save";

function EditVersion(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const editversionID = props.editversionID;

  const [displayName, setDisplayName] = useState("");
  const [modelName, setModelName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [parameters, setParameters] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ modelName, endpoint, parameters });
  };

  const version_data = {
    display_name: displayName,
    model_name: modelName,
    endpoint: endpoint,
    params: parameters,
    editversionID: editversionID,
  };
  const add_new_version = () => {
    if (version_data.display_name === "" || version_data.model_name === "") {
      console.log("Display name and model name must be provided.");
      return;
    } else {
      axios
        .post(`${apiUrl}/add_new_version`, version_data)
        .then((response) => {
          props.setIsTriggered();
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    console.log("ddd:", editversionID);
    axios
      .post(`${apiUrl}/get_edit_version`, {
        editversionID: editversionID,
      })
      .then((response) => {
        setDisplayName(response.data["display_name"]);
        setModelName(response.data["model_name"]);
        setEndpoint(response.data["endpoint"]);
        setParameters(response.data["params"]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setDisplayName("");
        setModelName("");
        setEndpoint("");
        setParameters("");
      });
  }, [editversionID]);

  return (
    <div className="flex flex-col items-center justify-center md:w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-16 pt-10 pb-10 mb-4 w-full"
      >
        <div className="mb-4">
          {editversionID ? (
            <h1 className="block text-gray-700 text-2xl text-center font-bold mb-16">
              モデルを編集する
            </h1>
          ) : (
            <h1 className="block text-gray-700 text-2xl text-center font-bold mb-16">
              新しいモデル
            </h1>
          )}
          <TextField
            required
            id="display-name"
            label="Display Name"
            variant="outlined"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <TextField
            required
            id="model-name"
            label="Model Name "
            variant="outlined"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <TextField
            id="endpoint"
            label="input endpoint"
            placeholder="https://api.openai.com/v1/chat/completions"
            variant="outlined"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full"
            InputProps={{
              endAdornment: (
                <Button color="primary" onClick={() => setEndpoint("")}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              ),
            }}
          />
        </div>
        <div className="mb-6">
          <TextField
            id="parameters"
            label="input parameters"
            variant="outlined"
            placeholder=" temperature=0.2,

                        max_tokens=500,
                        frequency_penalty=0.0,
                        timeout=1200"
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            multiline
            rows={6}
            className="w-full"
            InputProps={{
              endAdornment: (
                <Button color="primary" onClick={() => setParameters("")}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              ),
            }}
          />
        </div>
        {editversionID ? (
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2"
              onClick={add_new_version}
              startIcon={<SaveIcon />}
            >
              更新
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2"
              onClick={add_new_version}
              startIcon={<SaveIcon />}
            >
              保存
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default EditVersion;
