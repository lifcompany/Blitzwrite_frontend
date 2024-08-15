import React, { useEffect, useState } from "react";
import UserMenu from "./userMenu";
import SettingIcon from "../topbar/SettingIcon";
import NotificationIcon from "../topbar/NotificationIcon";
import HistoryIcon from "../topbar/HistoryIcon";
const IconGroup = () => {
  const [arrayNoti, setArrayNoti] = useState([]);

  useEffect(() => {
    setArrayNoti(["記事作成完了 13:00", "記事作成完了 15:05"]);
  }, []); 

  return (
    <div className="flex items-end gap-7 rounded-full">
      <nav className="block max-w-full bg-transparent text-white shadow-none transition-all px-0 py-1 ">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-end gap-6">
          <div className="flex items-center justify-end gap-7">
            <SettingIcon />
            <NotificationIcon count_noti={2} array_noti={arrayNoti} />
            <HistoryIcon />
          </div>
        </div>
      </nav>
      <div>
        <UserMenu />
      </div>
    </div>
  );
};

export default IconGroup;
