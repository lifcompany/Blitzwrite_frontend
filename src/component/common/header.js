import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Tooltip } from "@mui/material";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import { MdEditDocument } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import UserMenu from "./userMenu";
import Error from "./error";
import api from "../../api";
import { setSiteNameSlice, setSiteUrlSlice, setSiteAdminSlice, setSitePasswordSlice } from "../../features/common/SiteSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [variant, setVariant] = useState('solid');
  const [error, setError] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [siteTitle, setSiteTitle] = useState("");

  const selectedSiteName = useSelector((state) => state.site.siteName);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
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

        const siteData = response.data.site_data[0];
        setSiteName(siteData.site_name);
        setSiteUrl(siteData.site_url);
        setAdminName(siteData.admin_name);
        setAdminPass(siteData.admin_pass);

        dispatch(setSiteNameSlice(siteData.site_name));
        dispatch(setSiteUrlSlice(siteData.site_url));
        dispatch(setSiteAdminSlice(siteData.admin_name));
        dispatch(setSitePasswordSlice(siteData.admin_pass));

        const params = { siteUrl: siteData.site_url };
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
        setError(null);

      })
      .catch((error) => {
        console.log(error);
        setSiteName("");
        setSiteUrl("");
        setAdminName("");
        setAdminPass("");

      });
  }, []);

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
              <MdEditDocument style={{ fontSize: '30px' }} />
              作成
            </button>

            <button
              onClick={() => navigate("/keyword")}
              className=" flex justify-center items-center gap-1 mr-4 p-2 rounded-md hover:bg-gray-200 text-[#232E2F] hover:text-[#232E2F] font-bold "
            >
              <MdEditDocument style={{ fontSize: '30px' }} />
              Keyword
            </button>
            <a
              href="https://docs.google.com/spreadsheets/d/1KBuz0tSocys6kA0en05gIjLO9U_ZUMWhVIK8ySZ8nXU/edit#gid=1894772142"
              target="_blank"
              className=" flex justify-center items-center gap-1 mr-4 p-2 rounded-md hover:bg-gray-200 text-[#232E2F] hover:text-[#232E2F] font-bold"
              rel="noopener noreferrer"
            >
              <MdOutlineArticle style={{ fontSize: '30px' }} />
              一覧
            </a>
          </div>
        </div>
        <div className="flex items-center gap-7 rounded-full">
          <div>
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
