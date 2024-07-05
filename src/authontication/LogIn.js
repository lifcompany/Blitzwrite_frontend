import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Error from "../component/common/error";
import Notification from "../component/common/notification";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const content = props.content ? props.content : "";
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = () => {};

  const [credentialResponse, setCredentialResponse] = useState(null);

  const user = useMemo(() => {
    if (!credentialResponse?.credential) return null;
    const user_info = jwtDecode(credentialResponse.credential);
    return user_info;
  }, [credentialResponse]);

  const handleSuccess = (response) => {
    setCredentialResponse(response);
    checkUserRegistration(response);
  };

  const checkUserRegistration = (credentialResponse) => {
    const { credential } = credentialResponse;
    if (credential) {
      const decodedToken = jwtDecode(credential);
      console.log("Decoded Token:", decodedToken);
      axios
        .post(`${apiUrl}/api/authentication/check-registration`, { credential })
        .then((response) => {
          console.log("Backend Response:", response.data);
          // Navigate user to home page upon successful login
          navigate("/home");
        })
        .catch((error) => {
          console.error("Backend Error:", error);
          setError("Failed to login with Google");
        });
    } else {
      setError("Failed to get Google credentials");
    }
    console.log(credentialResponse);
    // axios.post(`${apiUrl}/api/authentication/check-registration`, { googleToken })
    //   .then((response) => {
    //     const { registered, user } = response.data;
    //     if (registered) {

    //       handleRegisteredUserLogin(user);
    //     } else {
    //       handleNewUserRegistration(credentialResponse);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error checking user registration:", error);
    //   });
  };

  const handleRegisteredUserLogin = (user) => {
    localStorage.setItem("accessToken", user.accessToken);
    navigate("/home");
  };

  const handleNewUserRegistration = (credentialResponse) => {
    const googleToken = credentialResponse.token;
    axios
      .post(`${apiUrl}/api/authentication/google-register`, { googleToken })
      .then((response) => {
        const { user } = response.data;
        // Optionally, you may want to log the user in after registration
        handleRegisteredUserLogin(user);
      })
      .catch((error) => {
        console.error("Error registering new user:", error);
      });
  };

  const handleError = () => {
    setError("Login Failed");
    navigate("/login");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const apiUrl = process.env.REACT_APP_API_URL;
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
        const data = response.data;
        const accessToken = data.result.token;
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        navigate("/home");
      })
      .catch((error) => {
        setError(error.response?.data?.error || "An error occurred");
      });
  };
  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
  };
  useEffect(() => {
    isAuthenticated() && navigate("/home");
  }, [navigate, token]);
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
              <GoogleLogin
                theme="filled_black"
                shape="pill"
                onSuccess={handleSuccess}
                // onSuccess={(credentialResponse) => {
                //   setCredentialResponse(credentialResponse);
                //   const decodedUser = jwtDecode(credentialResponse.credential);
                //   localStorage.setItem("user", JSON.stringify(decodedUser));
                //   navigate("/home");
                // }}
                onError={handleError}
              />
              {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              /> */}
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
      <Error content={error} />
      <Notification content={content} />
    </div>
  );
};

export default Login;
