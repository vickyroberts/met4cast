// src/features/weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../api";

// Async Thunk to fetch weather data
export const fetchWeather = createAsyncThunk("weather/fetch", async (latlong) => {
  const {lat, long} = latlong;
  return await getWeather(lat, long);
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    wthrData: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetWeather: (state) => {
      state.wthrData = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wthrData = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;