import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import CheckoutContextProvider from "./store/checkout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CheckoutContextProvider>
      <App />
    </CheckoutContextProvider>
    <ToastContainer />
  </React.StrictMode>
);
