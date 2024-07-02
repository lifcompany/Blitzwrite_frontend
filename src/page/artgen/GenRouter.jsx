import React from "react";
import { Route, Routes } from "react-router-dom";
import SetKwd from "./SetKwd";
import Progress from "./Progress";
import Generated from "./Generated";
import CheckKwd from "./CheckKwd";


const GenRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckKwd />} />
      <Route path="/setkeyword" element={<SetKwd />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/generated" element={<Generated />} />
    </Routes>
  );
};

export default GenRouter;
