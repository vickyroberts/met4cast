// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./city.slice";
import weatherReducer from "./weather.slice";

export const store = configureStore({
  reducer: {
    cities: cityReducer,
    weather: weatherReducer
  },
});

export default store;