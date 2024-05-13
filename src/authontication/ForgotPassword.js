import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex flex-col flex-grow bg-bottom bg-no-repeat bg-contain"
        style={{
          backgroundImage:
            "url(https://monovm.com/dashboard/vendors/metronic/media/illustrations/dozzy-1/4.png)",
        }}
      >
        <div className="flex flex-col items-center justify-center flex-grow p-10 pb-20">
          <a href="#" className="mb-12">
            <img alt="Logo" src="images/logo.svg" className="h-10" />
          </a>
          <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-10 px-20">
            <form
              className="w-full"
              noValidate
              id="sign_in_form"
              method="post"
              action="/dashboard/login"
            >
              <input
                type="hidden"
                name="_token"
                value="yor8hTMkxkJkfuqJpfYHYokR9mM7qIbwmb5WXzE8"
              />
              <div className="mb-10 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                  パスワードの再設定
                </h1>
              </div>
              <div className="flex justify-between items-center mb-6">
                <label
                  htmlFor="remember_me"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <span>
                    登録しているメールアドレスにパスワードの再設定ができるリンクを送りします
                  </span>
                </label>
              </div>
              <div className="mb-6">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="w-full px-4 py-3  border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="メールアドレス"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
              >
                <span className="inline-block mr-2">送信する</span>
                <span className="inline-block spinner-border spinner-border-sm align-middle"></span>
              </button>

              {/* <a href="/dashboard/social/redirect/google"
                                className="w-full py-3 flex items-center justify-center bg-gray-100 rounded-lg mt-3 hover:bg-gray-200 focus:outline-none">
                                <img alt="Google Icon" src="images/google-icon.svg" className="h-6 mr-3" />
                                <span className="font-normal text-[#7e8299]">Google アカウントで作成</span>
                            </a>
                            <a href="/dashboard/social/redirect/google"
                                className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-2xl mt-3 hover:bg-gray-100 focus:outline-none">
                                <img alt="Google Icon" src="images/google-icon.svg" className="h-6 mr-3" />
                                <span className="text-gray-700 font-bold">Google アカウントで作成</span>
                            </a> */}

              <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                <div
                  onClick={() => navigate("/login")}
                  className="text-blue-500 font-semibold cursor-pointer"
                >
                  ログインはこちら
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center py-10">
          <div className="flex space-x-4 text-sm font-semibold text-gray-700">
            <a href="/vps-server/" className="hover:text-blue-500">
              Copyright © 2024{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
