import Button from "@mui/material/Button";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Header from "../component/header";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useDispatch, useSelector } from "react-redux";

import Notification from "../component/notification";
import Error from "../component/error";
import SettingMenu from "./SettingMenu";
import ToastNotification from "../component/ToastNotification";

import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import PaymentModal from "./PaymentModal";

const SettingPayment = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {

  },);




  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-40">
          <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
            支払い
          </h1>
          <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
            クレジットカード情報
          </h2>
          <div className="mt-5">
            <form noValidate autoComplete="off">
              <FormControl sx={{ width: "25ch" }}>
                <OutlinedInput placeholder="支払い情報がありません" />
              </FormControl>
            </form>
          </div>
          <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
          <div className=" py-4">
            <PaymentModal/>
          </div>
        </div>
      </div>
      <ToastNotification />
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingPayment;
