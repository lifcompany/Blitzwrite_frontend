import React from "react";
import Header from "../../component/common/header";
import { Outlet } from "react-router-dom";

const CheckSiteConnection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col flex-1 items-start px-40">
        <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          記事の作成
        </h1>
        <div className="py-2 font text-[calc(2vmin)] text-[#014361] rounded-md mt-10 mb-8">
          メディア連携が出来ていません。先に
          <span className=" text-blue-600">
            <a href="/setting-site">連携</a>
          </span>
          をしてください
        </div>
        <Outlet/>
      </div>
    </div>
  );
};
export default CheckSiteConnection;
