import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PJzVRFkGHQ8A45rGz0RQ4kWXXo9Ddq82YWhZohEWAvcmLLQvaMykZLGJaHxKgfLOmY6n3X8a2f6mU3dzW7HoAUx00NRu1DK1V",
  {
    locale: "ja",
  }
);
const PaymentPage = ({setOpen} ) => {
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();

  const Wrapper = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://133.242.160.145:3000/confirm-payment",
        },
      });
  
      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        navigate("/success");
      }
    };
  
    useEffect(() => {
      if (errorMessage) {
        alert(errorMessage);
      }
    }, [errorMessage]);
  
    return (
      <Container maxWidth="sm" style={{ marginTop: "10px"}}>
        <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
          クレジットカードの登録
        </h2>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <div className="flex justify-end items-center gap-5">
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                className="w-full py-2"
                // onClick={upadte_model}
              >
                編集
              </Button>
            </div>
            <button
              className=" text-blue-500 roundedtransition mt-[10px]"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </button>
          </div>
        </form>
      </Container>
    );
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") == null){
      navigate("/login");
    }
    const fetchClientSecret = async () => {
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      };
      console.log(localStorage.getItem("accessToken"));
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/setting/create-payment-intent/`,
          { email: "santabaner1223@gmail.com" },
          { headers },
        );
        console.log(response);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchClientSecret();
  }, [navigate]);

  const options = {
    clientSecret,
    appearance: {},
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Wrapper />
        </Elements>
      )}
    </>
  );
};

export default PaymentPage;
