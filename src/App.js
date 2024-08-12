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

import SettingSite from "./page/setting/SettingSite";
import SettingAPI from "./page/setting/SettingAPI";
import ConfirmPayment from "./component/setting/payment/ConfirmPayment";
import SettingPayment from "./page/setting/SettingPayment";
import SettingAccount from "./page/setting/SettingAccount";
import PaymentBox from "./component/setting/payment/PaymentBox";
import ClientErrorPage from "./page/error/ClientErrorPage";
import KeywordRouter from "./page/keyword/KeywordRouter";
import './App.scss';
import TestCard from "./component/setting/payment/TestCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PJzVRFkGHQ8A45rGz0RQ4kWXXo9Ddq82YWhZohEWAvcmLLQvaMykZLGJaHxKgfLOmY6n3X8a2f6mU3dzW7HoAUx00NRu1DK1V", {
  locale: "ja",
});

function App() {
  const [notification, SetNotification] = useState("");
  useEffect(() => {
    console.log("App component mounted");
  }, []);
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
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
          <Route path="/setting-test2" element={<TestCard />} />
          <Route path="/setting-api" element={<SettingAPI />} />
          <Route path="/setting-account" element={<SettingAccount SetNotification={SetNotification} />} />
          <Route path="/artgen/*" element={<GenRouter />} />
          <Route path="/keyword/*" element={<KeywordRouter />} />
          <Route path="/*" element={<ClientErrorPage />} />
        </Routes>
      </Elements>
    </BrowserRouter>
  );
}

export default App;
