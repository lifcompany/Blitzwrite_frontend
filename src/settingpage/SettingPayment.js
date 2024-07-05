import React, { useEffect, useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Header from "../component/common/header";
import Notification from "../component/common/notification";
import Error from "../component/common/error";
import SettingMenu from "../component/common/SettingMenu";
import OutlinedInput from "@mui/material/OutlinedInput";
import PaymentModal from "../component/setting/payment/PaymentModal";
import PaymentCard from "../page/payment-card";

const SettingPayment = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    // Fetch user's card information from backend API
    const fetchCardInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/setting/get-user-card-info/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setCardInfo(response.data);
      } catch (error) {
        console.error("Error fetching card info:", error);
        setError("カード情報を取得できませんでした。");
      }
    };

    fetchCardInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start justify-center">
          {/* <h1 className=" heading font text-[calc(10px+2vmin)] font-semibold mt-16">
            支払い
          </h1>
          <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
            クレジットカード情報
          </h2>
          <div className="mt-5">
            <form noValidate autoComplete="off">
              <FormControl sx={{ width: "25ch" }}>
              <OutlinedInput
                value={
                  cardInfo
                    ? `${cardInfo.card_brand} ending in ${cardInfo.card_last4} (Exp: ${cardInfo.card_exp_month}/${cardInfo.card_exp_year})`
                    : "支払い情報がありません"
                }
                disabled
              />
              </FormControl>
            </form>
          </div>
          <div className=" h-10">{loading ? <p>Loading...</p> : ""}</div>
          <div className=" py-4">
            <PaymentModal/>
          </div> */}
          <PaymentCard/>
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingPayment;
