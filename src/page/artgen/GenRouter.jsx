import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SetKwd from "./SetKwd";
import Progress from "./Progress";
import Generated from "./Generated";
import CheckKwd from "./CheckKwd";
import ClientErrorPage from "../error/ClientErrorPage";

const GenRouter = () => {
  const selectedSiteName = useSelector((state) => state.site.siteName);
  const navigate = useNavigate("");

  useEffect(() => {
    if (!selectedSiteName) {
      console.log("None Selected Name");
      navigate("/artgen");
    }
  }, [selectedSiteName, navigate]);
  return (
    <Routes>
      <Route path="/" element={<CheckKwd />} />
      <Route path="/setkeyword" element={<SetKwd />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/generated" element={<Generated />} />
      <Route path="*" element={<ClientErrorPage />} />
    </Routes>
  );
};

export default GenRouter;
