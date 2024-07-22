import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = new URLSearchParams(location.search).get("token");
    console.log(token);
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("パスワードが一致しない");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/authentication/reset-password/`,
        {
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        setMessage("パスワードリセットは成功しました。");
        // navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "An unexpected error occurred.");
      } else {
        setError("An error occurred while making the request.");
      }
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          <div
            onClick={() => navigate("/home")}
            className="mb-12 cursor-pointer"
          >
            <img
              alt="Logo"
              src="/images/logo.svg"
              className="h-12"
            // Adjust the image source path according to your project structure
            />
          </div>
          <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-10 px-20">
            <form
              className="w-full"
              onSubmit={handleSubmit}
              noValidate
              id="reset_password_form"
            >
              <div className="mb-10 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  パスワードの再設定
                </h1>
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
              <div className="mb-6">
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="standard"
                  placeholder="パスワード"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {/* <div className="mb-6">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="新しいパスワード（確認）"
                  autoComplete="off"
                  required
                />
              </div> */}
              <button
                type="submit"
                className="w-full py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
              >
                <span className="inline-block mr-2">パスワードを変更する</span>
                {/* You can add a spinner here if needed */}
              </button>
              <div className="flex justify-center mt-4 text-gray-700 font-semibold text-sm">
                <a href="/login" className="text-blue-500 font-semibold">
                  ログインはこちら
                </a>
              </div>
            </form>
            {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          </div>
        </div>
        <div className="flex items-center justify-center py-10">
          <div className="flex space-x-4 text-sm font-semibold text-gray-700">
            <span>Copyright © 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
