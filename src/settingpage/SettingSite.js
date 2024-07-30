import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { setSiteNameSlice } from "../features/SiteSlice";
import Notification from "../component/common/notification";
import Error from "../component/common/error";
import SettingMenu from "../component/common/SettingMenu";
import Header from "../component/common/header";
import api from "../api";

const SettingSite = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    console.log(token);
    api
      .get("/api/setting/get_site/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSiteName(response.data.site_data[0]["site_name"]);
        setSiteUrl(response.data.site_data[0]["site_url"]);
        setAdminName(response.data.site_data[0]["admin_name"]);
        setAdminPass(response.data.site_data[0]["admin_pass"]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSiteName("");
        setSiteUrl("");
        setAdminName("");
        setAdminPass("");
        setLoading(false);
      });
  }, []);

  const registerSite = async () => {
    setError(null);
    const params = { siteUrl: siteUrl };
    axios
      .get(`${apiUrl}/api/setting/get-title/`, {
        params: params,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSiteTitle(response?.data.title);
        dispatch(setSiteNameSlice(response?.data.title));
      })
      .catch((error) => {
        console.error("Error fetching site title:", error);
        setError("Failed to fetch site title. Please check the URL.");
      });
    setLoading(true);
    setError(null);

    const site_data = {
      site_name: siteName,
      site_url: siteUrl,
      admin_name: adminName,
      admin_pass: adminPass,
    };

    axios
      .post(`${apiUrl}/api/setting/set_site/`, site_data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setNotification("サイト連携が完了しました");
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-auto lg:w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-8 md:pl-14 lg:pl-28 xl:pl-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
          サイト連携
          </h1>
          <div className=" bg-[#E5F6FD] px-4 py-2 font text-[calc(2vmin)] text-[#014361] rounded-md mt-10 mb-8">
            <InfoOutlinedIcon className="mr-2 text-[#0288D1]" />
            現在、WordPressで作られたサイトしか連携出来ません。
          </div>
          <div className="mt-5">
            <FormControl
              className="flex flex-col gap-10 w-[320px] sm:w-136"
              variant="outlined"
            >
              <TextField
                label="サイト名"
                placeholder="サイト名"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={siteName}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setSiteName(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <TextField
                  label="サイトのURL"
                  placeholder="URL"
                  className="flex w-full sm:w-256 mx-8 my-10"
                  value={siteUrl}
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <p>https://から入力してください</p>
              </div>
              <TextField
                label="サイトのログインID"
                placeholder="ログインID"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={adminName}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setAdminName(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
                name="disable-autofill-username"
              />
              <TextField
                label="サイトのログインパスワード"
                type={showPassword ? "text" : "password"}
                placeholder="ログインパスワード"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={adminPass}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setAdminPass(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="disable-autofill-password"
              />
            </FormControl>
          </div>

          <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
          <div className=" py-4">
            <Button
              variant="contained"
              onClick={registerSite}
              sx={{
                backgroundColor: "#0F1740",
                color: "white",
                fontWeight: "bold",
                paddingY: 2,
                paddingLeft: 4,
                paddingRight: 4,
                borderRadius: "lg",
                "&:hover": {
                  backgroundColor: "#22294e",
                },
                "&:focus": {
                  outline: "none",
                  backgroundColor: "#0e1225",
                },
              }}
            >
              連携する
            </Button>
          </div>
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingSite;
