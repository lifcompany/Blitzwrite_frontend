import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import Notification from "../component/notification";
import Error from "../component/error";
const Progress = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
        setIsDone(true);
        setNotification("Completed");
        setTimeout(() => {
          navigate("/artgen/generated");
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  const navigate = useNavigate();

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
                className="bg-[#222222] text-white rounded-sm h-5 "
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
