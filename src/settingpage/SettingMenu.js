import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
// import { selectUser } from 'app/store/userSlice';

function SettingMenu(props) {
  //   const user = useSelector(selectUser);
  const user = { displayName: "白石昌之", role: "User", photoURL: "" };
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
      <Button
        className=" min-h-14 min-w-14 px-0 md:px-4 py-0 md:py-2"
        onClick={settingMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-1 items-end">
          <h2 className="font-bold flex">{user.displayName}</h2>
        </div>


          <Avatar className="md:mx-1">{user.displayName[0]}</Avatar>

      </Button>

      <div
        open={true}
        onClose={settingMenuClose}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "center",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "center",
        // }}
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
              to="/setting"
              onClick={settingMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="サイト" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting"
              onClick={settingMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="API連携" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting"
              onClick={settingMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <CreditScoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="支払い" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting"
              onClick={settingMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="アカウント" />
            </MenuItem>
            <div className=" border-b-2 border-b-gray-300 w-[90%] my-3 m-auto"></div>
            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                handleLogout();
              }}
            >
              <ListItemIcon className="min-w-40">
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Account" />
            </MenuItem>
          </>
        )}
      </div>
    </>
  );
}

export default SettingMenu;
