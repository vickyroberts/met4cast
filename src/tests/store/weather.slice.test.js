import { configureStore } from "@reduxjs/toolkit";
import weatherReducer, { fetchWeather, resetWeather } from "../../store/weather.slice";
import { getWeather } from "../../api";

jest.mock("../../api");

describe("weatherSlice reducer", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { weather: weatherReducer } });
  });

  it("should return initial state", () => {
    const state = store.getState().weather;
    expect(state).toEqual({
      wthrData: null,
      status: "idle",
      error: null,
    });
  });

  it("should reset weather data when resetWeather is dispatched", () => {
    const action = resetWeather();
    store.dispatch(action);
    const state = store.getState().weather;
    expect(state.wthrData).toBeNull();
  });
});

describe("Test fetchWeather async calls", () => {
  it("should handle fetchWeather.pending", () => {
    const action = { type: fetchWeather.pending.type };
    const state = weatherReducer(undefined, action);
    expect(state.status).toBe("loading");
  });

  it("should handle success", async () => {
    const mockWeatherData = { temp: 20, condition: "Sunny" };
    getWeather.mockResolvedValue(mockWeatherData);
    const action = { type: fetchWeather.fulfilled.type, payload: mockWeatherData };
    const state = weatherReducer(undefined, action);
    expect(state.status).toBe("succeeded");
    expect(state.wthrData).toEqual(mockWeatherData);
  });

  it("should handle rejected error", async () => {
    getWeather.mockRejectedValue(new Error("Failed to fetch weather"));
    const action = { type: fetchWeather.rejected.type, error: { message: "Failed to fetch weather" } };
    const state = weatherReducer(undefined, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Failed to fetch weather");
  });
});
