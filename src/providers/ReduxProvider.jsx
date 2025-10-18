"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
    </Provider>   
  )
}