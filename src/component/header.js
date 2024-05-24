import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, MenuItem, Dialog, DialogTitle } from "@mui/material";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import UserMenu from "./userMenu";
const Header = () => {
  const navigate = useNavigate(); // Hook to get the navigate function
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const selectedSiteName = useSelector((state) => state.site.siteName);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutOpen = () => {
    setOpenDialog(true);
    handleMenuClose(); // Close the menu when dialog opens
  };

  const handelLogoutClose = () => {
    setOpenDialog(false);
  };
  return (
    <header>
      <nav className="flex items-center bg-gray-200 h-20 border-b-2 border-gray-200 px-20">
        <h1 className="text-2xl font-bold  flex-1">
          <Link to="/home" className="text-2xl mb-5 font-bold">
            <img alt="Logo" src="images/logo.svg" className="h-10" />
          </Link>
        </h1>
        <div className="flex items-center gap-7">
          <div className="navbar flex items-center">
            {selectedSiteName ? (
              <button
                onClick={() => navigate("/output")}
                className="flex justify-center items-center gap-1 mr-4 p-2 bg-white rounded-md hover:bg-gray-200 text-gray-700 hover:text-gray-700 "
              >
                <WebOutlinedIcon />
                {selectedSiteName}
              </button>
            ) : (
              ""
            )}

            <button
              onClick={() => navigate("/setting")}
              className=" flex justify-center items-center gap-1 mr-4 p-2 bg-white rounded-md hover:bg-gray-200 text-gray-700 hover:text-gray-700  "
            >
              <SaveAsIcon />
              作成
            </button>
            <a
              href="https://docs.google.com/spreadsheets/d/1KBuz0tSocys6kA0en05gIjLO9U_ZUMWhVIK8ySZ8nXU/edit#gid=1894772142"
              target="_blank"
              className=" flex justify-center items-center gap-1 mr-4 p-2 bg-white rounded-md hover:bg-gray-200 text-gray-700 hover:text-gray-700 "
              rel="noopener noreferrer"
            >
              <ArticleOutlinedIcon />
              一覧
            </a>
          </div>
          <div>
            <UserMenu />
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate("/setting-site")}>
                <SettingsIcon className=" text-gray-700" />
                設定
              </MenuItem>
              <MenuItem onClick={handleLogoutOpen}>ログアウト</MenuItem>
            </Menu>
            <Dialog open={openDialog} onClose={handelLogoutClose}>
              <DialogTitle>Logout</DialogTitle>
              <p>Really?</p>
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
