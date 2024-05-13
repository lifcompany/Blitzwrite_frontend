import React from "react";

const ResetPassword = () => {
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
              action="#"
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
              <div className="mb-6">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="新しいパスワード"
                  autoComplete="off"
                />
              </div>
              <div className="mb-6">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="新しいパスワード(確認)"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
              >
                <span className="inline-block mr-2">パスワードを変更する</span>
                <span className="inline-block spinner-border spinner-border-sm align-middle"></span>
              </button>
              <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                <a href="#" className="text-blue-500 font-semibold ">
                  ログインはこちら
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center py-10">
          <div className="flex space-x-4 text-sm font-semibold text-gray-700">
            <a href="#" className="hover:text-blue-500">
              Copyright © 2024{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
