import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function EditVersion(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const editversionID = props.editversionID;

  const [displayName, setDisplayName] = useState("");
  const [modelName, setModelName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [parameters, setParameters] = useState("");
  const navigate = useNavigate();

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
        .post(`${apiUrl}/api/setting/add_new_version`, version_data)
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
      .post(`${apiUrl}/api/setting/get_edit_version`, {
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
          <TextField
            id="display-name"
            label="モデル名"
            placeholder="モデル名"
            value={displayName}
            className="flex w-full sm:w-256 mx-8 my-10"
            // value={searchText}
            inputProps={{
              "aria-label": "Search",
            }}
            // onChange={handleSearchText}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDisplayName(e.target.value)}
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
              追加
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
              編集
            </Button>
          </div>
        )}
        <button
            className="mt-4 text-blue-500 py-2 px-6 roundedtransition"
            onClick={() => navigate("/")}
          >
            キャンセル
          </button>
      </form>
    </div>
  );
}

export default EditVersion;
