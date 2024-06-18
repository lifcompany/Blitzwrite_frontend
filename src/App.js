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
import CreditCardModal from "./settingpage/SettingAccount";
import PaymentPage from "./settingpage/PaymentPage";
// import CheckMedia from "./generation/CheckMedia";
import SetMedia from "./generation/SetMedia";
import SearchComponent from "./generation/SearchComponent";
import SeoGen from './artgen/SeoGen';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
  };
 console.log(localStorage.getItem("accessToken") !== null)
  return (
    <BrowserRouter>
      <Routes>
        {/* {isAuthenticated() 
          ? <Route path="/login" element={<Navigate to="/home" />} />
          : <Route path="/login" element={<LogIn />} />
        } */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/mail-verify" element={<EmailVerification />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/sign-out" element={<SignOutPage />} />
        
        {isAuthenticated() ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/output" element={<Output />} />
            <Route path="/setting-site" element={<SettingSite />} />
            <Route path="/setting-payment" element={<SettingPayment />} />
            <Route path="/setting-test" element={<PaymentPage />} />
            <Route path="/setting-api" element={<SettingAPI />} />
            <Route path="/setting-account" element={<CreditCardModal />} />
            {/* <Route path="/setting-account-delete" element={<Account />} /> */}
            <Route path="/setting/customselect" element={<CustomSelect />} />
            {/* Generate Article */}
            {/* <Route path="/check-media" element={<CheckMedia />} /> */}
            <Route path="/set-media" element={<SetMedia />} />
            <Route path="/get-questions" element={<SearchComponent />} />
            <Route path='/artgen/*' element={<SeoGen />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
