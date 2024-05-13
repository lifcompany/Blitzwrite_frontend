import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Menu, MenuItem, Dialog, DialogTitle } from "@mui/material";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
const Header = () => {
  const navigate = useNavigate(); // Hook to get the navigate function
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
    <header className="pt-12">
      <nav className="flex items-center border-b-2 border-gray-200 pb-2 px-20">
        <h1 className="text-2xl mb-5 font-bold">
          <Link to="/home" className="text-2xl mb-5 font-bold">
            <img alt="Logo" src="images/logo.svg" className="h-10" />
          </Link>
        </h1>
        <div className="navbar flex items-center">
          <button
            onClick={() => navigate("/output")}
            className="  text-blue-500 hover:text-blue-700 hover:underline decoration-blue-700"
          >
            <WebOutlinedIcon />
            車買取サービス
          </button>
          <button
            onClick={() => navigate("/setting")}
            className="mr-4 text-blue-500 hover:text-blue-700 hover:underline decoration-blue-700"
          >
            <SaveAsIcon />
            作成
          </button>
          <a
            href="https://docs.google.com/spreadsheets/d/1KBuz0tSocys6kA0en05gIjLO9U_ZUMWhVIK8ySZ8nXU/edit#gid=1894772142"
            target="_blank"
            className=" flex items-center text-blue-500 hover:text-blue-700 hover:underline decoration-blue-700"
            rel="noopener noreferrer"
          >
            <ArticleOutlinedIcon />
            一覧
          </a>
        </div>
        <div>
          <IconButton
            onClick={handleMenuOpen}
            aria-label="account menu"
            aria-controls="account-menu"
            aria-haspopup="true"
            color="inherit"
          >
          <AccountCircleOutlinedIcon
            sx={{ fontSize: 40 }}
            className=" text-gray-900"
          />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/setting")}>
              <SettingsIcon className=" text-gray-700" />
              設定
            </MenuItem>
            {/* <MenuItem>ログアウト</MenuItem> */}
            <MenuItem onClick={handleLogoutOpen}>ログアウト</MenuItem>
          </Menu>
          <Dialog open={openDialog} onClose={handelLogoutClose}>
            <DialogTitle>Logout</DialogTitle>
            <p>Really?</p>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Header;
