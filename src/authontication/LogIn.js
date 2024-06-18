import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

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
        scope: "email profile",
        // redirect_uri: "http://localhost:3000/home", // Ensure this matches the authorized redirect URI
      });

      auth2
        .signIn()
        .then((googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          console.log("ID Token:", idToken);
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", error);
        });
    });
  };
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    e.preventDefault();
    console.log("Form submitted with", email, password);
    const signin_data = {
      email: email,
      password: password,
    };
    axios
      .post(`${apiUrl}/api/authentication/login/`, signin_data, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const accessToken = data.accessToken;
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
  };
  useEffect(() => {
    isAuthenticated() && navigate("/home");
  }, [token]);
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
          <div
            onClick={() => navigate("/home")}
            className="mb-12 cursor-pointer"
          >
            <img alt="Logo" src="images/logo.svg" className="h-12" />
          </div>
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
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  variant="standard"
                  placeholder="パスワード"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    "& .MuiInputBase-input": {
                      width: "100%",
                      paddingX: "16px",
                      paddingY: "12px",
                      
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "14px",
                      color: "#dc3545",
                    },
                  }}
                />
              </div>

              <div className="mb-6">
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="standard"
                  placeholder="パスワード"
                  value={password}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      width: "100%",
                      paddingX: "16px",
                      paddingY: "12px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "14px",
                      color: "#dc3545",
                    },
                  }}
                />
              </div>

              <div className="flex justify-between mt-4 mb-6 text-gray-700 font-semibold text-sm">
                <div
                  onClick={() => navigate("/forgot_password")}
                  className="text-blue-500 font-semibold cursor-pointer"
                >
                  パスワードを忘れた
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
                onClick={handleSubmit}
              >
                <span className="inline-block mr-2">ログインする</span>
                <span className="inline-block spinner-border spinner-border-sm align-middle"></span>
              </button>
              <div className="text-center mt-6 text-sm text-gray-600 uppercase font-semibold">
                または
              </div>
              <div
                className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-[3rem] mt-3 hover:bg-gray-100 focus:outline-none"
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
              <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                <a href="/register" className="text-blue-500 font-semibold ">
                  アカウントの作成はこちら
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-10">
          <div className="flex space-x-4 text-sm font-semibold text-gray-700">
            <a href="/register" className="hover:text-blue-500">
              Copyright © 2024{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
