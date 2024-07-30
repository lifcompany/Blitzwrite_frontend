import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/api/authentication/forget-password/`, { email });

      if (response.status === 201) {
        setMessage("認証リンクが送信されました。");
      } else {
        setMessage("Resend verification link.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "An unexpected error occurred.");
      } else {
        setError("An error occurred while making the request.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex flex-col flex-grow bg-bottom bg-no-repeat bg-contain"
      >
        <div className="flex flex-col items-center justify-center flex-grow p-10 pb-20">
          <div onClick={() => navigate("/home")} className="mb-12 cursor-pointer">
            <img alt="Logo" src="/images/logo.svg" className="h-12" />
          </div>
          <div className="w-full max-w-[500px] bg-white p-10 px-20">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-10 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  パスワードの再設定
                </h1>
              </div>
              <div className="flex justify-between items-center mb-6">
                <label
                  htmlFor="remember_me"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <span>
                    登録しているメールアドレスにパスワードの再設定ができるリンクを送ります
                  </span>
                </label>
              </div>
              <div className="mb-6">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="メールアドレス"
                  autoComplete="off"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
              >
                <span className="inline-block mr-2">送信する</span>
                <span className="inline-block spinner-border spinner-border-sm align-middle"></span>
              </button>
              <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                <div
                  onClick={() => navigate("/login")}
                  className="text-blue-500 font-semibold cursor-pointer"
                >
                  ログインはこちら
                </div>
              </div>
            </form>
            {message && (
              <p className="text-green-500 text-center mt-4">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
