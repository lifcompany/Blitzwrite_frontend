import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Error from "../component/common/error";
import Notification from "../component/common/notification";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const content = props.content ? props.content : "";
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = () => { };

  const [credentialResponse, setCredentialResponse] = useState(null);

  const user = useMemo(() => {
    if (!credentialResponse?.credential) return null;
    const user_info = jwtDecode(credentialResponse.credential);
    return user_info;
  }, [credentialResponse]);


  const googlelogin = useGoogleLogin({

    onSuccess: (credentialResponse) => {
      const { access_token } = credentialResponse;
      if (access_token) {
          axios
            .post(`${apiUrl}/api/authentication/check-google-registration/`, { access_token })
            .then((response) => {
              const data = response.data;
              const accessToken = data.accessToken;
              setToken(accessToken);
              localStorage.setItem("accessToken", accessToken);
              setNotification(data.message);
              navigate("/home");
            })
            .catch((error) => {
              console.error("Backend Error:", error);
              setError(error.response.data.error);
            });
        } else {
          setError("Failed to get Google credentials");
        }
        console.log(credentialResponse);
        // axios.get('https://www.googleapis.com/userinfo/v2/me', {
        //   headers: {
        //     Authorization: `Bearer ${access_token}`,
        //   },
        // }).then(response => {
        //   console.log('User Info:', response.data);

        //   // Handle response data as needed
        // }).catch(error => {
        //   console.error('Error fetching user info:', error);
        //   // Handle errors
        // });
      // }
    },
    onError: () => {
      setError("Login Failed");
      navigate("/login");
    },
  });


  const handleSuccess = (response) => {
    setCredentialResponse(response);
    checkUserRegistration(response);
  };

  const checkUserRegistration = (credentialResponse) => {
    const { credential } = credentialResponse;
    const { clientId } = credentialResponse;

    if (credential) {
      axios
        .post(`${apiUrl}/api/authentication/check-registration/`, { credential, clientId })
        .then((response) => {
          const data = response.data;
          const accessToken = data.accessToken;
          setToken(accessToken);
          localStorage.setItem("accessToken", accessToken);
          setNotification(data.message);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Backend Error:", error);
          setError(error.response.data.error);
        });
    } else {
      setError("Failed to get Google credentials");
    }
    console.log(credentialResponse);
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
                className=" relative w-full py-2 flex items-center justify-center gap-5 cursor-pointer bg-white border border-gray-300 rounded-[3rem] mt-3 hover:bg-gray-100 focus:outline-none"
                onClick={() => googlelogin()}
              >
                <img
                  alt="Google Icon"
                  src="images/google-icon.svg"
                  className="h-6 mr-3"
                />
                <div className=" absolute left-1">
                </div>

                <span className="text-gray-700 font-bold">
                  Googleでログイン
                </span>

              </div>
              <div className="google-login-container">
              {/* <GoogleLogin
                theme="filled_blue"
                shape="pill"
                locale="ja"
                // cookiePolicy={'single_host_origin'}
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
              /> */}
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
      <Error content={error} />
      <Notification content={content} />
    </div>
  );
};

export default Login;
