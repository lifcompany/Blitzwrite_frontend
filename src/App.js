import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import Output from "./output/output";
import CustomSelect from "./settingpage/CustomSelect";
import LogIn from "./authontication/LogIn";
import SignUp from "./authontication/SignUp";
import ForgotPassword from "./authontication/ForgotPassword";
import ResetPassword from "./authontication/ResetPassword";
import EmailVerification from "./authontication/EmailVerification";
import SignOutPage from "./authontication/SignOutPage";
import SettingSite from "./settingpage/SettingSite";
import SettingAPI from "./settingpage/SettingAPI";
import SettingPayment from "./settingpage/SettingPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from '/' to '/login' */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/mail-verify" element={<EmailVerification />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/sign-out" element={<SignOutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/output" element={<Output />} />
        <Route path="/setting-site" element={<SettingSite />} />
        <Route path="/setting-payment" element={<SettingPayment />} />
        <Route path="/setting-api" element={<SettingAPI />} />
        <Route path="/setting/customselect" element={<CustomSelect />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
