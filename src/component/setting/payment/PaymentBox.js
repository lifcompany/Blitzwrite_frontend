import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TestCard from "./TestCard";


const stripePromise = loadStripe(
  "pk_test_51PJzVRFkGHQ8A45rGz0RQ4kWXXo9Ddq82YWhZohEWAvcmLLQvaMykZLGJaHxKgfLOmY6n3X8a2f6mU3dzW7HoAUx00NRu1DK1V",
  {
    locale: "ja",
  }
);

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#000',
      backgroundColor: '#fff',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#ddd',
      },
    },
    invalid: {
      color: '#f00',
    },
  },
};

const PaymentBox = ({ setOpen }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();

  const Wrapper = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [accountName, setAccountName] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.PUBLIC_URL}/confirm-payment`,
        },
      });
      if (result.error) {
        console.log(result);
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
      <Container maxWidth="sm" style={{ marginTop: "10px" }}>
        <h2 className="heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
          クレジットカードの登録
        </h2>
        <form onSubmit={handleSubmit}>
          {/* <PaymentElement /> */}
          <div className="pt-14">
            <label className="block font-bold ml-3 mb-2 font-sans text-black" htmlFor="number">
              カード番号
            </label>
            <div className="input-wrapper bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
              <CreditCardIcon />
              <CardNumberElement
                id="number"
                options={ELEMENT_OPTIONS}
              />
            </div>
          </div>

          <div className="pt-8">
            <label className="block font-bold ml-3 mb-2 text-black" htmlFor="name">
              カード名義
            </label>
            <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
              <input
                type="text"
                value={accountName ?? ''}
                onChange={(event) => {
                  setAccountName(event.target.value ?? '');
                }}
                id='name'
                placeholder='山田 太郎'
                className="outline-none"
              />
            </div>
          </div>
          <div className=" flex items-center justify-between gap-10">
            <div className="pt-8 w-1/2">
              <label className="block font-bold mb-2 text-black" htmlFor="expiry">
                有効期限
              </label>
              <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
                <CardExpiryElement
                  id="expiry"
                  options={ELEMENT_OPTIONS}
                />
              </div>
            </div>
            <div className="pt-8 w-1/2">
              <label className="block font-bold mb-2 text-black" htmlFor="cvc">
                セキュリティコード
              </label>
              <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
                <CardCvcElement
                  id="cvc"
                  options={{ ...ELEMENT_OPTIONS, placeholder: '1234' }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 pb-28">
            <p>カード裏面に記載されている番号の右３桁または</p>
            <p>４桁の数字を入力してください</p>
          </div>

          <div className="flex justify-end items-center gap-5">
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                className="w-full py-2"
              >
                編集
              </Button>
            </div>
            <button
              className="text-blue-500 roundedtransition mt-[10px]"
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
    if (localStorage.getItem("accessToken") == null) {
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

export default PaymentBox;
