import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import Payment from "./pages/Payment.jsx";
import { loadStripe } from "react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_test_51OQqOjSEuj1HRmQX8Ce2BE1cQCxyZgBbsdl4JvwvJ76BcOpj8qjgyGReK2jrDcPPtkTiBG4UM8xoU8VaLlF7z19A00y40YX77m');

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
