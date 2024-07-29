import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Header from "../component/common/header";

import Notification from "../component/common/notification";
import Error from "../component/common/error";
import SettingMenu from "../component/common/SettingMenu";
import AccountModal from "../component/setting/account/AccountModal";

const SettingSite = () => {
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(value && !validateEmail(value));
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className="w-auto lg:w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-8 md:pl-14 lg:pl-28 xl:pl-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
            アカウント
          </h1>
          <div className=" mt-16">
            <FormControl
              className="flex flex-col gap-10 w-[320px] sm:w-136"
              variant="outlined"
            >
              <TextField
                label="メールアドレス"
                placeholder="test@example.jp"
                className="flex w-full sm:w-256 mx-8 my-10"
                inputProps={{
                  "aria-label": "Search",
                }}
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? "無効なメールアドレス" : ""}

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </div>

          <div className=" py-4">
            <AccountModal email={email} error={emailError} />
          </div>
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingSite;
