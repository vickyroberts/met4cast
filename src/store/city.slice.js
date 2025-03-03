// src/features/weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities } from "../api";

// Async Thunk to fetch weather data
export const fetchCities = createAsyncThunk("city/fetch", async (city) => {
  console.log('>>> City', city);
  return await getCities(city);
});

const citySlice = createSlice({
  name: "cities",
  initialState: {
    cityData: null,
    status: "idle",
    errorCity: null,
    selectedCity: null
  },
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
        state.errorCity = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "success";
        state.cityData = action.payload;
        state.errorCity = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.errorCity = action.error.message;
        state.selectedCity = null;
        state.cityData = [];
      });
  },
});

export const { setSelectedCity } = citySlice.actions;
export default citySlice.reducer;