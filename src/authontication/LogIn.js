import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Handle login with Google
    if (!window.gapi) {
      alert("Google API not loaded. Please try again.");
      return;
    }

    // Load Google Auth2 library and initialize
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id:
          "412305795434-v38u701gekbk82o0i5eg7bsnjtuqhc1o.apps.googleusercontent.com",
        scope: "email profile", // Adjust scopes as needed
        // redirect_uri: "http://localhost:3000/home", // Ensure this matches the authorized redirect URI
      });

      auth2
        .signIn()
        .then((googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          console.log("ID Token:", idToken);
          // Send the ID token to your backend for further processing
          // (e.g., authentication and user creation)
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", error);
        });
    });
  };
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
          <a href="https://monovm.com/" className="mb-12">
            <img alt="Logo" src="images/logo.svg" className="h-10" />
          </a>
          <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-10 px-20">
            <div className="w-full" noValidate id="sign_in_form">
              <input
                type="hidden"
                name="_token"
                value="yor8hTMkxkJkfuqJpfYHYokR9mM7qIbwmb5WXzE8"
              />
              <div className="mb-10 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                  ログイン
                </h1>
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
              <div className="mb-6">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="パスワード"
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-between mt-4 mb-6 text-gray-700 font-semibold text-sm">
                <a href="#" className="text-blue-500 font-semibold ">
                  パスワードを忘れた
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                <span className="inline-block mr-2">ログインする</span>
                <span className="inline-block spinner-border spinner-border-sm align-middle"></span>
              </button>
              <div className="text-center mt-6 text-sm text-gray-600 uppercase font-semibold">
                または
              </div>
              <div className="w-full py-3 flex items-center justify-center bg-gray-100 rounded-lg mt-3 hover:bg-gray-200 focus:outline-none"
              >
                <img
                  alt="Google Icon"
                  src="images/google-icon.svg"
                  className="h-6 mr-3"
                />
                <span className="font-normal text-[#7e8299]">
                  Googleでログイン
                </span>
              </div>
              <div
                className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-2xl mt-3 hover:bg-gray-100 focus:outline-none"
                onClick={handleLogin}
              >
                <img
                  alt="Google Icon"
                  src="images/google-icon.svg"
                  className="h-6 mr-3"
                />
                <span className="text-gray-700 font-bold">
                  Googleでログイン
                </span>
              </div>
              <div className="flex justify-center mt-6 space-x-4 text-sm font-semibold text-gray-700">
                <a href="#" className="hover:text-blue-500 m-auto">
                  アカウントの作成はこちら
                </a>
              </div>
              <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                <a href="#" className="text-blue-500 font-semibold ">
                  アカウントの作成はこちら
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-10">
          <div className="flex space-x-4 text-sm font-semibold text-gray-700">
            <a
              href="https://monovm.com/vps-server/"
              className="hover:text-blue-500"
            >
              Copyright © 2024{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
