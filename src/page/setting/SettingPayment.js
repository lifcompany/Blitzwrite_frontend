import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "../../component/common/header";
import Notification from "../../component/common/notification";
import Error from "../../component/common/error";
import SettingMenu from "../../component/common/SettingMenu";
import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import PaymentBox from "../../component/setting/payment/PaymentBox";
import PaymentMethodCard from "../../component/setting/payment/PaymentMethodCard";
import { Button } from "@mui/material";
// import PaymentCard from "../payment-card";

const fetchPaymentMethod = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/setting/payment-method/`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  } else {
    throw new Error("Failed to fetch payment method");
  }
};

const SettingPayment = () => {
  const [paymentBoxOpen, setPaymentBoxOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentCard, setShowPaymentCard] = useState(false);

  const refetchPaymentMethod = useCallback(async () => {
    setIsLoading(true);
    fetchPaymentMethod()
      .then((paymentMethod) => {
        setPaymentMethod(paymentMethod);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setPaymentMethod]);

  const deletePaymentMethod = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/setting/payment-method/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      await refetchPaymentMethod();
      setSuccessMessage("支払い情報を削除しました");
    } catch (err) {
      console.error(err);
      setErrorMessage("支払い情報の削除に失敗しました");
    }
    setIsLoading(false);
  }, []);

  // const registerPayment = () => {
  //   setShowPaymentCard((prevShowPaymentCard) => !prevShowPaymentCard); // Toggle PaymentCard visibility
  // };

  useEffect(() => {
    refetchPaymentMethod();
  }, [refetchPaymentMethod]);

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
          <h2 className="heading font text-[calc(2vmin)] font-semibold mt-8 mb-4">
            クレジットカード情報
          </h2>
          {paymentMethod ? (
            <PaymentMethodCard
              paymentMethod={paymentMethod}
              deletePaymentMethod={deletePaymentMethod}
            />
          ) : (
            <>
              <p className="mx-2 mt-4 mb-8">支払い情報がありません</p>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#0F1740" }}
            className="py-2"
            onClick={() => setPaymentBoxOpen(true)}
          >
            {paymentMethod ? "支払い情報を更新" : "支払い情報を登録"}
          </Button>
          <Modal
            keepMounted
            open={paymentBoxOpen}
            onClose={() => setPaymentBoxOpen(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                boxShadow: 24,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "30%",
                borderRadius: "5px",
              }}
            >
              <PaymentBox
                isEdit={!!paymentMethod}
                onSuccess={(successMessage) => {
                  refetchPaymentMethod();
                  setSuccessMessage(successMessage);
                }}
                onError={(errorMessage) => {
                  setErrorMessage(errorMessage);
                }}
                setOpen={setPaymentBoxOpen}
              />
            </Box>
          </Modal>
        </div>
      </div>

      {/* <div className=" py-4">
        <button
          onClick={() => registerPayment()}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none"
        >
          支払い情報を登録
        </button>
      </div>
      {showPaymentCard && <PaymentCard />} */}

      <Notification content={successMessage} />
      <Error content={errorMessage} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SettingPayment;
