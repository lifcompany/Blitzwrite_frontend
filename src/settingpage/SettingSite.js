import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { setSiteNameSlice } from "../features/common/SiteSlice";
import Notification from "../component/notification";
import Error from "../component/error";
import SettingMenu from "./SettingMenu";
import Header from "../component/header";

const SettingSite = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${apiUrl}/api/setting/get_site/`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSiteName(response.data.site_data[1]["site_name"]);
        setSiteUrl(response.data.site_data[1]["site_url"]);
        setAdminName(response.data.site_data[1]["admin_pass"]);
        setAdminPass(response.data.site_data[1]["admin_name"]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
        setLoading(false);
      });
  }, []);

  const registerSite = () => {
    dispatch(setSiteNameSlice(siteName));
    setLoading(true);
    setError(null);

    const site_data = {
      site_name: siteName,
      site_url: siteUrl,
      admin_name: adminName,
      admin_pass: adminPass,
    };

    const token = localStorage.getItem("accessToken");

    console.log(site_data);
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
            サイト
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
              />
              <TextField
                label="サイトのログインパスワード"
                type="password"
                placeholder="ログインパスワード"
                className="flex w-full sm:w-256 mx-8 my-10"
                value={adminPass}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(e) => setAdminPass(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
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
