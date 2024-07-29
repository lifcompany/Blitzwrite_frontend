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
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

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
            }}
            color="inherit"
          >
            <div className="hidden md:flex flex-col mx-1 items-end">
              <h2 className="font-bold flex">{user.displayName}</h2>
            </div>
            {user.photoURL ? (
              <Avatar
                className="md:mx-1"
                alt="user photo"
                src={user.photoURL}
              />
            ) : (
              <Avatar className="md:mx-1">{user.displayName[0]}</Avatar>
            )}
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
        {user.role &&
          user.role.length > 0 && [
            <MenuItem
              key="profile"
              onClick={handleClose}
              component={Link}
              to="/profile"
              role="button"
            >
              <Avatar /> プロフィール
            </MenuItem>,
            <MenuItem
              key="my-account"
              onClick={handleClose}
              component={Link}
              to="/my-account"
              role="button"
            >
              <Avatar /> マイアカウント
            </MenuItem>,
            <Divider key="divider" />,
          ]}
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
