import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./application/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <GoogleOAuthProvider clientId="304531247476-58f940f3b0dgrupg95cdo8b51fspupdv.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
