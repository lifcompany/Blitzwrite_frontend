import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import LanguageIcon from '@mui/icons-material/Language';

function SettingMenu(props) {
  const user = { displayName: "Santa", role: "User", photoURL: "" };
  const [settingMenu, setSettingMenu] = useState(null);

  const settingMenuClick = (event) => {
    setSettingMenu(event.currentTarget);
  };

  const settingMenuClose = () => {
    setSettingMenu(null);
  };

  return (
    <>
      <div className="flex justify-center my-5">
        <Button
          className="min-h-14 min-w-14 px-0 md:px-4 py-0 md:py-2 rounded-xl"
          onClick={settingMenuClick}
          color="inherit"
        >
          <Avatar className="md:mx-1">{user.displayName[0]}</Avatar>
        </Button>
      </div>
      <div
        open={true}
        onClose={settingMenuClose}
        className="py-3"
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-14">
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-14">
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/setting-site"
              onClick={settingMenuClose}
              role="button"
              className="flex items-center"
              sx={{
                padding: "16px",
                paddingLeft: '20px'
              }}
            >
              <ListItemIcon className="min-w-40">
                <LanguageIcon />
              </ListItemIcon>
              <span className="hidden lg:inline">メディア</span>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting-api"
              onClick={settingMenuClose}
              role="button"
              className="flex items-center"
              sx={{
                padding: "16px",
                paddingLeft: '20px'
              }}
            >
              <ListItemIcon className="min-w-40">
                <ApiOutlinedIcon />
              </ListItemIcon>
              <span className="hidden lg:inline">API連携</span>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting-payment"
              onClick={settingMenuClose}
              role="button"
              className="flex items-center"
              sx={{
                padding: "16px",
                paddingLeft: '20px'
              }}
            >
              <ListItemIcon className="min-w-40">
                <CreditScoreOutlinedIcon />
              </ListItemIcon>
              <span className="hidden lg:inline">支払い</span>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting-account"
              onClick={settingMenuClose}
              role="button"
              className="flex items-center"
              sx={{
                padding: "16px",
                paddingLeft: '20px'
              }}
            >
              <ListItemIcon className="min-w-40">
                <ManageAccountsIcon />
              </ListItemIcon>
              <span className="hidden lg:inline">アカウント</span>
            </MenuItem>
            <div className="border-b-2 border-b-gray-300 w-[90%] my-3 m-auto"></div>
          </>
        )}
      </div>
    </>
  );
}

export default SettingMenu;
