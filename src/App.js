import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Output from "./output/output";
import CustomSelect from "./settingpage/SettingPage";

import "./App.css";
import LogIn from "./authontication/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/output" element={<Output />} />
        <Route path="/setting" element={<CustomSelect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
