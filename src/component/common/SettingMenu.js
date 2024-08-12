import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import LanguageIcon from '@mui/icons-material/Language';

function SettingMenu(props) {
  const user = { displayName: "Santa", role: "User", photoURL: "" };
  const [settingMenu, setSettingMenu] = useState(null);
  const [activeButton, setActiveButton] = useState('');

  const settingMenuClick = (event) => {
    setSettingMenu(event.currentTarget);
  };

  const settingMenuClose = () => {
    setSettingMenu(null);
  };

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/setting-site') { 
      setActiveButton('setting-site');
    } else if (location.pathname === '/setting-api') {
      setActiveButton('setting-api');
    } else if (location.pathname === '/artgen/generated') {
      setActiveButton('generated');
    } else {
      setActiveButton('');
    }
  }, [location.pathname]);

  const handleClickMenu = (path, buttonId) => {
    navigate(path);
    setActiveButton(buttonId);

  };

  return (
    <>
      <div
        open={true}
        onClose={settingMenuClose}
        className="pt-6 pb-3"
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
              className={`flex items-center`}
              sx={{
                padding: "16px",
                paddingLeft: '20px',
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
