import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const handleLogin = () => {
    
  // Handle login with Google
  const auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signIn().then((googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;
    // Send the token to your backend for verification
    // (using fetch or Axios)
  });
};

const SignUp = () => {
  const navigate = useNavigate(); // Hook to get the navigate function
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [email, setEmail] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setValidPassword(validatePassword(newPassword));
  };
  
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (password) => {
    // Define a regular expression pattern for password validation
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return pattern.test(password);
  };
  const validateForm = () => {
    // Reset error state
    setError("");

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // // Required fields validation
    // if (!email || !password || !confirmPassword) {
    //   setError("All fields are required.");
    //   return false;
    // }

    // // Password match validation
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return false;
    // }

    // Password complexity validation (example: minimum 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted with", email, password);
      const signup_data = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:8000/api/authentication/register/", signup_data)
        .then((response) => {
          console.log("Server response:", response.data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Form is invalid. Showing error...");
    }
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
                  アカウントの作成
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
                  onChange={handleEmailChange}
                />
              </div>
              {/* <div className="mb-6">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="パスワード"
                  autoComplete="off"
                />
              </div> */}
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
                  error={!validPassword && password.length > 0} // Show error if password is invalid and not empty
                  helperText={
                    !validPassword && password.length > 0
                      ? "パスワードは8文字以上で、少なくとも小文字1文字、大文字1文字、数字1文字、記号1文字を含む必要があります。"
                      : ""
                  }
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
                      width: "100%", // Full width
                      paddingX: "16px", // Horizontal padding
                      paddingY: "12px", // Vertical padding
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "14px", // Helper text font size
                      color: "#dc3545", // Helper text color (error message)
                    },
                  }}
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <label
                  htmlFor="remember_me"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <span>半角英数字に記号を組み合わせた8文字以上</span>
                </label>
              </div>
              {/* <Button variant="contained" color="primary">
                Click Me
              </Button> */}
              <button
                type="submit"
                className="w-full py-3 bg-[#0F1740] text-white font-bold rounded-lg hover:bg-[#22294e] focus:outline-none focus:bg-[#0e1225]"
                onClick={handleSubmit}
              >
                <span className="inline-block mr-2">アカウントを作成する</span>
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
                  Google アカウントで作成
                </span>
              </div>
              <div className="flex justify-center mt-6 space-x-4 text-sm font-semibold text-gray-700">
                <div
                  onClick={() => navigate("/login")}
                  className="hover:text-blue-500 m-auto"
                >
                  ログインはこちら
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-2">
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

export default SignUp;
