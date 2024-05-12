import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Output from "./output/output";
import CustomSelect from "./settingpage/SettingPage";
import LogIn from "./authontication/LogIn";
import SignUp from "./authontication/SignUp";
import ForgotPassword from "./authontication/ForgotPassword";
import ResetPassword from "./authontication/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from '/' to '/login' */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/output" element={<Output />} />
        <Route path="/setting" element={<CustomSelect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
