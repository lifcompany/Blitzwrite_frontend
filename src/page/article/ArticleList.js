import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../component/common/header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Notification from "../../component/common/notification";
import Error from "../../component/common/error";
const ArticleList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const get_file_list = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${apiUrl}/api/setting/get_file_list`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data.error);
        setLoading(false);
      });
  }, []);

  const downloadFile = (filename) => {
    const url = `${apiUrl}/download/${filename}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const deleteFile = (filename) => {
    setNotification("")
    axios
      .post(`${apiUrl}/api/setting/delete_files`, { filename }) // Adjust the URL to your server
      .then((response) => {
        get_file_list();
        setNotification("正常に削除されました。")
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const get_file_content = (filename) => {
    const url = `${apiUrl}/get_file_content?file_name=${encodeURIComponent(
      filename
    )}`;

    axios
      .get(url)
      .then((response) => {
        setFileContent(response.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  useEffect(() => {
    get_file_list();
  }, []);

  return (
    <div className="App pb-12 h-screen flex flex-col">
      <Header />
      <div className="flex justify-between items-center px-10 flex-grow mt-5">
        <div className="bg-white p-14 rounded shadow-md text-center h-full w-[40%] min-h-[550px]">
          <h1 className=" text-2xl mb-8 text-blue-500 font-bold">
            出力した記事
          </h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="max-h-[500px] min-h-[500px] px-5 overflow-auto ">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b px-3 cursor-pointer hover:bg-gray-100"
                >
                  <div
                    className="flex items-center"
                    onClick={() => get_file_content(item)}
                  >
                    <CheckCircleOutlineIcon className="text-green-500 mr-2" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                  <div className="flex items-center">
                    <BrowserUpdatedIcon
                      className="text-gray-600 hover:text-gray-900 cursor-pointer mr-5 ml-5"
                      onClick={() => downloadFile(item)}
                    />
                    <DeleteOutlineOutlinedIcon
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      onClick={() => deleteFile(item)}
                    />
                  </div>
                </div>
              ))}
            </ul>
          )}
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/")}
          >
            戻る
          </button>
        </div>
        <div className="w-[60%] flex flex-col gap-2 justify-center text-[calc(10px+2vmin)] text-[#282c34] max-h-[70vh] overflow-auto">
          {fileContent ? (
            <div className=" p-28 text-lg">
              <div dangerouslySetInnerHTML={{ __html: fileContent }} />
            </div>
          ) : (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src="images/lif_logo_another2.png"
              className=" w-60 m-auto"
            ></img>
          )}
        </div>
      </div>
      <Notification content={notification}/>
      <Error content={error}/>
    </div>
  );
};

export default ArticleList;
