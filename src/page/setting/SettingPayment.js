import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../component/common/header";
import Notification from "../../component/common/notification";
import Error from "../../component/common/error";
import SettingMenu from "../../component/common/SettingMenu";
import PaymentCard from "../payment-card";
import { FormControl, OutlinedInput } from "@mui/material";
import PaymentModal from "../../component/setting/payment/PaymentModal";
import { Button } from '@mui/material';
import CreditCardForm from "../../component/setting/payment/CreditCardForm";

const SettingPayment = () => {

  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [cardInfo, setCardInfo] = useState(null);
  const [showPaymentCard, setShowPaymentCard] = useState(false);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
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

  const registerPayment = () => {
    setShowPaymentCard((prevShowPaymentCard) => !prevShowPaymentCard); // Toggle PaymentCard visibility
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  h-full">
        <div className=" w-auto lg:w-72 border-r-2 border-gray-300 ">
          <SettingMenu />
        </div>
        <div className="relative flex flex-col flex-1 items-start pl-8 md:pl-14 lg:pl-28 xl:pl-40">
          <h1 className="heading font text-[calc(8px+2vmin)] text-gray-900 font-semibold mt-16">
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
          <div className=" py-4">
            <PaymentModal />
          </div>
          <div className=" py-4">
            <button
              onClick={() => registerPayment()}
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none"
            >
              支払い情報を登録
            </button>
          </div>
          {showPaymentCard && <PaymentCard />}
        </div>

        <div className="App">
          <Button variant="outlined" onClick={handleClickOpen}>
            クレジットカードの登録
          </Button>
          <CreditCardForm open={open} handleClose={handleClose} />
        </div>
      </div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default SettingPayment;
