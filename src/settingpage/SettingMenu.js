import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";

function SettingMenu(props) {
  const user = { displayName: "Santa", role: "User", photoURL: "" };
  const navigate = useNavigate();
  const [settingMenu, setSettingMenu] = useState(null);

  const settingMenuClick = (event) => {
    setSettingMenu(event.currentTarget);
  };

  const settingMenuClose = () => {
    setSettingMenu(null);
  };
  const handleLogout = () => {
    navigate("/sign-out");
  };
  return (
    <>
      <div className="flex justify-center  my-5">
        <Button
          className=" min-h-14 min-w-14 px-0 md:px-4 py-0 md:py-2 rounded-xl"
          onClick={settingMenuClick}
          color="inherit"
        >
          <Avatar className="md:mx-1">{user.displayName[0]}</Avatar>
        </Button>
      </div>

      <div
        open={true}
        onClose={settingMenuClose}
        classes={{
          paper: "py-3",
        }}
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
              sx={{
                padding: "16px",
              }}
            >
              <ListItemIcon className="min-w-40">
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="サイト" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting-api"
              onClick={settingMenuClose}
              role="button"
              sx={{
                padding: "16px",
              }}
            >
              <ListItemIcon className="min-w-40">
                <ApiOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="API連携" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting-payment"
              onClick={settingMenuClose}
              role="button"
              sx={{
                padding: "16px",
              }}
            >
              <ListItemIcon className="min-w-40">
                <CreditScoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="支払い" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting-account"
              onClick={settingMenuClose}
              role="button"
              sx={{
                padding: "16px",
              }}
            >
              <ListItemIcon className="min-w-40">
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="アカウント" />
            </MenuItem>
            <div className=" border-b-2 border-b-gray-300 w-[90%] my-3 m-auto"></div>
          </>
        )}
      </div>
    </>
  );
}

export default SettingMenu;
