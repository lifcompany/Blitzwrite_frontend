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
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
// import { selectUser } from 'app/store/userSlice';

function UserMenu(props) {
  //   const user = useSelector(selectUser);
  const user = { displayName: "白石昌之", role: "User", photoURL: "" };
  const navigate = useNavigate();
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };
  const handleLogout = () => {
    navigate("/sign-out");
  };
  return (
    <>
      <Button
        className=" min-h-14 min-w-14 px-0 md:px-4 py-0 md:py-2"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-2 items-end">
          <h2 className="font-bold flex">{user.displayName}</h2>
          <Typography
            className=" text-[0.5rem] font-medium capitalize"
            color="text.secondary"
          >
            {user.role.toString()}
            {(!user.role ||
              (Array.isArray(user.role) && user.role.length === 0)) &&
              "Guest"}
          </Typography>
        </div>

        {user.photoURL ? (
          <Avatar className="md:mx-2" alt="user photo" src={user.photoURL} />
        ) : (
          <Avatar className="md:mx-2">{user.displayName[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
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
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="設定" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/setting"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="アカウント管理" />
            </MenuItem>
            <div className=" border-b-2 border-b-gray-300 w-[90%] my-3 m-auto"></div>
            <MenuItem
              component={Link}
              to="/apps/profile"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <NoAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="アカウントの削除" />
            </MenuItem>
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
              <ListItemText primary="ログアウト" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
