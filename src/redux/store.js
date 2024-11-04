import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { setCartFromLocalStorage } from "./slices/CartSlice";
import userReducer from "./slices/UserSlice";
import sneakerReducer from "./slices/ShoeSlice";
import { useEffect } from "react";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    user: userReducer,
    sneakers: sneakerReducer,
  },
});

// Use subscribe to listen for changes in the store
store.subscribe(() => {
  const state = store.getState();
  console.log("User: ", state.user);
  console.log("Cart: ", state.cart);
  localStorage.setItem("localCart", JSON.stringify(state.cart));
});

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("localCart");
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);

    store.dispatch(setCartFromLocalStorage(parsedCart));
  }
};
loadCartFromLocalStorage();

