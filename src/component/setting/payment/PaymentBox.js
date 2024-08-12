import React, { useCallback, useState } from "react";
import { Backdrop, Button, CircularProgress, Container } from "@mui/material";
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
  locale: "ja",
});

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#000",
      backgroundColor: "#fff",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#ddd",
      },
    },
    invalid: {
      color: "#f00",
    },
  },
};

const PaymentBox = ({ isEdit, onError, onSuccess, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{
          appearance: {
            labels: "floating",
          },
          mode: "setup",
          currency: "jpy",
        }}
      >
        <Wrapper
          isEdit={isEdit}
          onError={onError}
          onLoadingChange={setIsLoading}
          onSuccess={onSuccess}
          setOpen={(isOpen) => {
            if (!isOpen) {
              // set loading to false when the modal is closed
              setIsLoading(false);
            }
            setOpen(isOpen);
          }}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Elements>
    </>
  );
};

const Wrapper = ({
  email,
  isEdit,
  onError,
  onLoadingChange,
  onSuccess,
  setOpen,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [accountName, setAccountName] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/setting/setup-intent/`,
        {},
        { headers }
      );
      return response.data.clientSecret;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [email]);

  const updatePaymentMethod = useCallback(async (paymentMethodId) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/setting/payment-method/?id=${paymentMethodId}`,
        {},
        { headers }
      );
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  if (!stripe || !elements) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    onLoadingChange(true);
    try {
      await elements.submit();

      const clientSecret = await fetchClientSecret();

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: { card: elements.getElement("cardNumber") },
      });

      if (result.error) {
        console.log(result);
        if (result.error.message) {
          onError(result.error.message);
        }
        setOpen(false);
        return;
      }

      if (!result.setupIntent.payment_method) {
        onError("支払い情報の登録に失敗しました");
        setOpen(false);
        return;
      }

      const paymentMethodUpdated = await updatePaymentMethod(
        typeof result.setupIntent.payment_method === "string"
          ? result.setupIntent.payment_method
          : result.setupIntent.payment_method.id
      );
      if (paymentMethodUpdated) {
        onSuccess("支払い情報を登録しました");
        setOpen(false);
      } else {
        onError("支払い情報の登録に失敗しました");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      onError("支払い情報の登録に失敗しました");
      setOpen(false);
    }
    onLoadingChange(false);
  };

  return (
    <Container maxWidth="sm" className="my-4">
      <h2 className="heading font text-[calc(2vmin)] font-semibold mt-6 mb-6">
        クレジットカードの登録
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label
            className="block font-bold ml-3 mb-2 font-sans text-black"
            htmlFor="number"
          >
            カード番号
          </label>
          <div className="flex items-center gap-2 bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
            <CreditCardIcon />
            <CardNumberElement
              className="flex-1 text-center"
              id="number"
              options={ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="pt-8">
          <label
            className="block font-bold ml-3 mb-2 text-black"
            htmlFor="name"
          >
            カード名義
          </label>
          <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
            <input
              type="text"
              value={accountName}
              onChange={(event) => {
                setAccountName(event.target.value ?? "");
              }}
              id="name"
              placeholder="山田 太郎"
              className="outline-none autofill"
            />
          </div>
        </div>
        <div className=" flex items-center justify-between gap-10">
          <div className="pt-8 w-1/2">
            <label className="block font-bold mb-2 text-black" htmlFor="expiry">
              有効期限
            </label>
            <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
              <CardExpiryElement id="expiry" options={ELEMENT_OPTIONS} />
            </div>
          </div>
          <div className="pt-8 w-1/2">
            <label className="block font-bold mb-2 text-black" htmlFor="cvc">
              セキュリティコード
            </label>
            <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
              <CardCvcElement
                id="cvc"
                options={{ ...ELEMENT_OPTIONS, placeholder: "123" }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-5">
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", backgroundColor: "#0F1740" }}
              className="w-full py-2"
            >
              {isEdit ? "編集" : "追加"}
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

export default PaymentBox;
