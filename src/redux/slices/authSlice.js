import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  email: typeof window !== "undefined" ? localStorage.getItem("email") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
      }
    },
    clearCredentials: (state) => {
      state.token = null;
      state.email = null;

      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
      }
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;