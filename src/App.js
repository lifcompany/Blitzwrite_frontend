import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LogIn from "./authontication/LogIn";
import SignUp from "./authontication/SignUp";
import ForgotPassword from "./authontication/ForgotPassword";
import ResetPassword from "./authontication/ResetPassword";
import EmailVerification from "./authontication/EmailVerification";
import SignOutPage from "./authontication/SignOutPage";

import HomePage from "./page/home/HomePage";
import Output from "./page/output/output";
import GenRouter from "./page/artgen/GenRouter";
import SearchKeyword from "./page/kwdsuggestion/SearchKeyword";

import SettingSite from "./settingpage/SettingSite";
import CustomSelect from "./settingpage/CustomSelect";
import SettingAPI from "./settingpage/SettingAPI";
import ConfirmPayment from "./settingpage/ConfirmPayment";
import SettingPayment from "./settingpage/SettingPayment";
import CreditCardModal from "./settingpage/SettingAccount";
import PaymentPage from "./settingpage/PaymentPage";


function App() {
  const [notification, SetNotification] =  useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn content={notification}/>} />
        <Route path="/register" element={<SignUp SetNotification={SetNotification} />} />
        <Route path="/mail-verify" element={<EmailVerification />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sign-out" element={<SignOutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/output" element={<Output />} />
        <Route path="/setting-site" element={<SettingSite />} />
        <Route path="/setting-payment" element={<SettingPayment />} />
        <Route path="/confirm-payment" element={<ConfirmPayment />} />
        <Route path="/setting-test" element={<PaymentPage />} />
        <Route path="/setting-api" element={<SettingAPI />} />
        <Route path="/setting-account" element={<CreditCardModal />} />
        <Route path="/setting/customselect" element={<CustomSelect />} />
        <Route path="/get-keyword" element={<SearchKeyword />} />
        <Route path="/artgen/*" element={<GenRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
