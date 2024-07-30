// VerifyEmail.js
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    console.log(token);
    if (token) {

      const verifyEmail = async () => {
        try {
          const response = await axios.post(
            `${apiUrl}/api/authentication/mail-verify/`, {}, 
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              }
            }
          );
          console.log(response.data);
          navigate("/login");
        } catch (error) {
          console.log(error);
          // Display error message
        }
      };
      verifyEmail();
    }
  }, [apiUrl, location.search, navigate]);

  return (
    <div>
      <h2>メール認証</h2>
      {/* Display loading or error message */}
    </div>
  );
};

export default EmailVerification;
