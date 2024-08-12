import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import { MdEditDocument } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import api from "../../api";
import axios from "axios";
import { setSiteNameSlice, setSiteUrlSlice, setSiteAdminSlice, setSitePasswordSlice } from "../../features/SiteSlice";

const MenuGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [variant, setVariant] = useState('solid');
  const [error, setError] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [activeButton, setActiveButton] = useState('');

  const location = useLocation();
  const selectedSiteName = useSelector((state) => state.site.siteName);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
  if (location.pathname.startsWith('/keyword')) {
    setActiveButton('keyword');
  } else if (location.pathname === '/artgen/setkeyword') {
    setActiveButton('setkeyword');
  } else if (location.pathname === '/artgen/generated') {
    setActiveButton('generated');
  } else {
    setActiveButton('');
  }
}, [location.pathname]);

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
            setError("サイトタイトルの取得に失敗しました。URLを確認してください。.");
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

  const handleClickMenu = (path, buttonId ) => {
    navigate(path);
    setActiveButton(buttonId);

};

  const displaySiteName = selectedSiteName.length > 10 ? `${selectedSiteName.slice(0, 15)}...` : selectedSiteName;
  return (
    <div className="navbar flex items-center ml-5">
      {selectedSiteName ? (
        <Tooltip title={selectedSiteName} color="primary" placement="top" variant={variant}>
          <button
            className="flex justify-center items-center min-w-[319px] gap-1 mr-4 py-2 px-4 border-2 border-gray-300 rounded-full text-gray-900  font-bold"
          >
            <WebOutlinedIcon style={{ fontSize: '30px' }} />
            {displaySiteName}
          </button>
        </Tooltip>
      ) : (
        ""
      )}
      <button
        onClick={() => handleClickMenu("/artgen/setkeyword", "setkeyword" )}
        className={`hidden xl:flex justify-center items-center gap-1 mr-4 p-2 rounded-lg hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-bold ${activeButton === 'setkeyword' ? 'bg-white text-gray-900' : ''}`}
      >
        <MdEditDocument style={{ fontSize: '30px' }} />
        作成
      </button>

      <button
        onClick={() => handleClickMenu("/keyword", "keyword")}
        className={`hidden xl:flex justify-center items-center gap-1 mr-4 p-2 rounded-lg hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-bold ${activeButton === 'keyword' ? 'bg-white text-gray-900' : ''}`}
      >
        <MdEditDocument style={{ fontSize: '30px' }} />
        Keyword
      </button>
      <button
        onClick={() => handleClickMenu("/artgen/generated", "generated")}
        className={`hidden xl:flex justify-center items-center gap-1 mr-4 p-2 rounded-lg hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-bold ${activeButton === 'generated' ? 'bg-white text-gray-900' : ''}`}
      >
        <MdOutlineArticle style={{ fontSize: '30px' }} />
        一覧
      </button>
    </div>
  );
};

export default MenuGroup;
