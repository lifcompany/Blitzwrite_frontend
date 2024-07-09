import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ArticleConfiguration from "./ArticleConfiguration";
import RootLayout from "./RootLayout";
import InitPage from "./InitPage";
import Preview from "./Preview";
import SavedKeywords from "./SavedKeywords";
import ClientErrorPage from "./ClientErrorPage";

const KeywordRouter = () => {
  const selectedSiteName = useSelector((state) => state.site.siteName);
  const navigate = useNavigate("");
  console.log(selectedSiteName);

  // useEffect(() => {
  //   if (!selectedSiteName) {
  //     console.log("None Selected Name");
  //     navigate("/keyword");
  //   }
  // }, [selectedSiteName, navigate]);
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<InitPage/>} />
        <Route path="/savedkeywords" element={<SavedKeywords />} />
        <Route path="/article-configuration" element={<ArticleConfiguration />} />
        <Route path="/article-preview" element={<Preview />} />
        <Route path="*" element={<ClientErrorPage />} />
      </Routes>
    </RootLayout>

  );
};

export default KeywordRouter;



