import React from "react";
import Badge from '@mui/material/Badge';
import UserMenu from "./userMenu";
import SettingIcon from "../topbar/SettingIcon";
import NotificationIcon from "../topbar/NotificationIcon";
import HistoryIcon from "../topbar/HistoryIcon";

const IconGroup = () => {
  return (
    <div className="flex items-end gap-7 rounded-full">
      <nav className="block max-w-full bg-transparent text-white shadow-none transition-all px-0 py-1 ">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-end gap-6">
          <div className="flex items-center justify-end gap-7">
            <SettingIcon />
            <Badge badgeContent={4} color="error"
              sx={{
                '& .MuiBadge-standard': {
                  width: 17, 
                  height: 17, 
                  fontSize: '0.7rem', 
                },
              }}
              >
              <NotificationIcon />
            </Badge>
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
