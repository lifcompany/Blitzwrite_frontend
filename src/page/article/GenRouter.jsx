import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SetKwd from "./SetKwd";
import Progress from "./Progress";
import Generated from "./Generated";
import CheckSiteConnection from "./CheckSiteConnection";
import ClientErrorPage from "../error/ClientErrorPage";

const GenRouter = () => {
  const selectedSiteName = useSelector((state) => state.site.siteName);
  const navigate = useNavigate("");
  const [notification, SetNotification] =  useState("");

  useEffect(() => {
    if (!selectedSiteName) {
      console.log("None Selected Name");
      navigate("/artgen");
    }
  }, [selectedSiteName, navigate]);
  return (
    <Routes>
      <Route path="/" element={<CheckSiteConnection />} />
      <Route path="/setkeyword" element={<SetKwd />} />
      <Route path="/progress" element={<Progress SetNotification={SetNotification} />} />
      <Route path="/generated" element={<Generated content={notification}/>} />
      <Route path="*" element={<ClientErrorPage />} />
    </Routes>
  );
};

export default GenRouter;
