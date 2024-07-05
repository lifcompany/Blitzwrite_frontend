import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, MenuItem, Dialog, DialogTitle, Tooltip } from "@mui/material";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import { MdEditDocument } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import SettingsIcon from "@mui/icons-material/Settings";
import UserMenu from "./userMenu";
const Header = () => {
  const navigate = useNavigate(); // Hook to get the navigate function
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [variant, setVariant] = useState('solid');
  const selectedSiteName = useSelector((state) => state.site.siteName);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutOpen = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handelLogoutClose = () => {
    setOpenDialog(false);
  };
  const displaySiteName = selectedSiteName.length > 10 ? `${selectedSiteName.slice(0, 15)}...` : selectedSiteName;
  return (
    <header>
      <nav className="flex justify-between items-center bg-gray-100 h-20 px-20 text-xl">
        <div className="flex items-center gap-7">
          <h1 className="text-2xl font-bold  flex-1">
            <Link to="/home" className="text-2xl mb-5 font-bold">
              <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} className="h-12" alt="Logo" />
            </Link>
          </h1>
          <div className="navbar flex items-center ml-5">
            {selectedSiteName ? (
              <Tooltip title={selectedSiteName} color="primary" placement="top" variant={variant}>
              <button
                onClick={() => navigate("/artgen/generated")}
                className="flex justify-center items-center gap-1 mr-4 py-2 px-4 border-2 border-gray-300 rounded-full hover:bg-gray-200 text-[#232E2F] hover:text-[#232E2F] font-bold"
              >
                <WebOutlinedIcon style={{ fontSize: '30px' }} />
                {displaySiteName}
              </button>
              </Tooltip>
            ) : (
              ""
            )}

            <button
              onClick={() => navigate("/artgen/setkeyword")}
              className=" flex justify-center items-center gap-1 mr-4 p-2 rounded-md hover:bg-gray-200 text-[#232E2F] hover:text-[#232E2F] font-bold "
            >
              <MdEditDocument style={{ fontSize: '30px' }}/>
              作成
            </button>
            <a
              href="https://docs.google.com/spreadsheets/d/1KBuz0tSocys6kA0en05gIjLO9U_ZUMWhVIK8ySZ8nXU/edit#gid=1894772142"
              target="_blank"
              className=" flex justify-center items-center gap-1 mr-4 p-2 rounded-md hover:bg-gray-200 text-[#232E2F] hover:text-[#232E2F] font-bold"
              rel="noopener noreferrer"
            >
              <MdOutlineArticle style={{ fontSize: '30px' }}/>
              一覧
            </a>
          </div>
        </div>
        <div className="flex items-center gap-7 rounded-full">
          <div>
            <UserMenu/>
            {/* <Menu
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
            </Menu> */}
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
