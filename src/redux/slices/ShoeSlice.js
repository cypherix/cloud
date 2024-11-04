// slices/sneakersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sneakers: [], // Initial state for sneakers data
  loading: false, // Loading state for async operations
  error: null, // Error state for async operations
};

const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {
    setSneakers: (state, action) => {
      state.sneakers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSneakers, setLoading, setError } = sneakersSlice.actions;

export default sneakersSlice.reducer;
