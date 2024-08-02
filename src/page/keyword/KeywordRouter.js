import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ArticleConfiguration from "./ArticleConfiguration";
import RootLayout from "./RootLayout";
import InitPage from "./InitPage";
import Preview from "./Preview";
import SavedKeywords from "./SavedKeywords";
import ClientErrorPage from "./ClientErrorPage";

const KeywordRouter = () => {
  const selectedSiteName = useSelector((state) => state.site.siteName);
  console.log(selectedSiteName);
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



