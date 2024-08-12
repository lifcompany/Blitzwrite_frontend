import React, { useEffect, useState } from "react";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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

const TestCard = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [accountName, setAccountName] = useState(null);


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
                console.log(response.data.clientSecret);
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                navigate("/login");
            }
        };

        fetchClientSecret();
    }, [navigate]);


    const handleSubmit = () => {
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!clientSecret) {
            setIsLoading(false);
            return;
        }
        if (!cardNumberElement) {
            setIsLoading(false);
            toast.error("カード番号を入力してください。");
            return;
        }
        if (!accountName) {
            setIsLoading(false);
            toast.error("カード名義を入力してください。");
            return;
        }
        stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: {
                        name: accountName
                    },
                },
                setup_future_usage: "off_session"
            })
            .then(async (res) => {
                const error = res.error;
                if (error) {
                    toast.error("error.message!");
                    setIsLoading(false);
                } else {
                    toast.success("決済が成功しました。");
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setIsLoading(false);
            });

    };

    return (
        <>
            <div className="pt-14">
                <label className="block font-bold ml-3 mb-2 font-sans text-black" htmlFor="number">
                    カード番号
                </label>
                <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
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
                        className="outline-none	"
                    />
                </div>
            </div>
            <div className="pt-8">
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
            <div className="pt-8">
                <label className="block font-bold ml-12 mb-2 text-black" htmlFor="cvc">
                    セキュリティコード
                </label>
                <div className="bg-white p-[10px] border hover:border border-zinc-400 rounded credit-bottom-shadow hover:border-orange-500">
                    <CardCvcElement
                        id="cvc"
                        options={{ ...ELEMENT_OPTIONS, placeholder: '123' }}
                    />
                </div>
            </div>
            <div className="pt-4 pb-28">
                <p>カード裏面に記載されている番号の右３桁または</p>
                <p>４桁の数字を入力してください</p>
            </div>

            <Button
                onClick={handleSubmit}
                expand='block'
                size='large'
                disabled={isLoading || !stripe || !elements}
            >
                {isLoading ? (
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) :
                    "登録する"
                }
            </Button>
        </>
    );
}

export default TestCard;