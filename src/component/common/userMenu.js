import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const user = { displayName: "Santa", role: "User", photoURL: "" };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleLogout = () => {
    navigate("/sign-out");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <Button
            onClick={userMenuClick}
            className="min-h-14 min-w-14 px-0 py-0 md:px-4 md:py-2 bg-white"
            sx={{
              borderRadius: "90px",
              backgroundColor: "white",
              border: "2px solid #E9EAEA",
              padding: "2px",
              minHeight: "3.5rem",
              minWidth: "3.5rem",
            }}
            color="inherit"
          >

            {user.photoURL ? (
              <Avatar
                className="md:mx-1"
                alt="user photo"
                src={user.photoURL}
              />
            ) : (
              <Avatar className="md:mx-1" sx={{ backgroundColor: "white" }}><FaRegCircleUser className=" text-gray-800 w-9 h-9" /></Avatar>
            )}
            <div className="hidden md:flex flex-col mx-1 min-w-7 px-2 items-end">
              <IoMdArrowDropdown className="w-7 h-7 text-gray-700" />
            </div>
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* {user.role &&
          user.role.length > 0 && [
            <MenuItem
              key="profile"
              onClick={handleClose}
              component={Link}
              to="/profile"
              role="button"
            >
              <div
                className=" min-w-[36px] "
              >
                <span className=" text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5 text-blue-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              プロフィール
            </MenuItem>,
            <Divider key="divider" />,
          ]} */}
        <MenuItem
          component={Link}
          to="/setting-site"
          onClick={userMenuClose}
          role="button"
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          設定
        </MenuItem>
        <Divider key="divider" />
        <MenuItem
          component={NavLink}
          to="/sign-out"
          onClick={() => {
            handleLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
