// VerifyEmail.js
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EmailVerification = () => {
  const location = useLocation();
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      console.log(token);
      const verifyEmail = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/authentication/mail-verify/", {}, 
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              }
            }
          );
          console.log(response.data);
          // Display success message or redirect user
        } catch (error) {
          console.error(error);
          // Display error message
        }
      };
      verifyEmail();
    }
  }, [location.search]);

  return (
    <div>
      <h2>Email Verification</h2>
      {/* Display loading or error message */}
    </div>
  );
};

export default EmailVerification;
