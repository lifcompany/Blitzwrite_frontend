import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Output from "./output/output";
import CustomSelect from "./settingpage/SettingPage";

import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/output" element={<Output />} />
        <Route path="/setting" element={<CustomSelect />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
