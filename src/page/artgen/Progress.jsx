import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/common/header";
import Notification from "../../component/common/notification";
import Error from "../../component/common/error";
const Progress = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedResults } = location.state || { selectedResults: [] };

  useEffect(() => {
    console.log(selectedResults);
    
  }, [selectedResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
        setIsDone(true);
        setNotification("完了");
        setTimeout(() => {
          navigate("/artgen/generated");
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigate, progress]);

 

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-40">
        <h1 className="heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          記事の作成
        </h1>
        <div className="px-4 w-full py-2 font text-[calc(2vmin)] text-[#014361] p-3 rounded-md mt-10 mb-8">
          <div className="w-full m-auto bg-gray-100 rounded-sm p-10">
            <div className="w-full m-auto bg-gray-200 rounded-sm">
              <div
                className="bg-blue-700 text-white rounded-sm h-5 "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-md mt-1">
              {isDone ? "完了" : `[${progress}/100] 記事生成中... `}
            </p>
          </div>
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default Progress;
