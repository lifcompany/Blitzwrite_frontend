// src/pages/ConfirmPayment.js

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../component/notification";
import Error from "../component/error";
const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("redirect_status");

    if (paymentStatus === "succeeded") {
        setNotification("Payment successful!");
        setTimeout(() => {
            navigate("/setting-payment");
          }, 2000);
    } else {
        setError("Payment failed or status unknown.");
        setTimeout(() => {
            navigate("/setting-payment");
          }, 2000);
       
    }
  }, [location, navigate]);

  return (
    <div>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default ConfirmPayment;
