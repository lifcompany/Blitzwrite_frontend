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
    <GoogleOAuthProvider clientId="412305795434-j10qukf8odkfe41d3ohmjg7rcb5lo3mm.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
