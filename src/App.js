import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LogIn from "./page/authontication/LogIn";
import SignUp from "./page/authontication/SignUp";
import ForgotPassword from "./page/authontication/ForgotPassword";
import ResetPassword from "./page/authontication/ResetPassword";
import EmailVerification from "./page/authontication/EmailVerification";
import SignOutPage from "./page/authontication/SignOutPage";

import HomePage from "./page/home/HomePage";
import GenRouter from "./page/article/GenRouter";

import SettingSite from "./settingpage/SettingSite";
import CustomSelect from "./component/setting/chatgpt/CustomSelect";
import SettingAPI from "./settingpage/SettingAPI";
import ConfirmPayment from "./component/setting/payment/ConfirmPayment";
import SettingPayment from "./settingpage/SettingPayment";
import CreditCardModal from "./settingpage/SettingAccount";
import PaymentBox from "./component/setting/payment/PaymentBox";
import ClientErrorPage from "./page/error/ClientErrorPage";
import KeywordRouter from "./page/keyword/KeywordRouter";
import './App.scss';



function App() {
  const [notification, SetNotification] = useState("");
  useEffect(() => {
    console.log("App component mounted");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn content={notification} />} />
        <Route path="/register" element={<SignUp SetNotification={SetNotification} />} />
        <Route path="/mail-verify" element={<EmailVerification />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sign-out" element={<SignOutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/setting-site" element={<SettingSite />} />
        <Route path="/setting-payment" element={<SettingPayment />} />
        <Route path="/confirm-payment" element={<ConfirmPayment />} />
        <Route path="/setting-test" element={<PaymentBox />} />
        <Route path="/setting-api" element={<SettingAPI />} />
        <Route path="/setting-account" element={<CreditCardModal />} />
        <Route path="/setting/customselect" element={<CustomSelect />} />
        <Route path="/artgen/*" element={<GenRouter />} />
        <Route path="/keyword/*" element={<KeywordRouter />} />
        <Route path="/*" element={<ClientErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
