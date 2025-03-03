import { configureStore } from "@reduxjs/toolkit";
import cityReducer, { fetchCities, setSelectedCity } from "../../store/city.slice";
import { getCities } from "../../api";

jest.mock("../../api");

describe("citySlice :: Test the reducer", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { cities: cityReducer } });
  });

  it("should return initial empty state value", () => {
    const state = store.getState().cities;
    expect(state).toEqual({
      cityData: null,
      status: "idle",
      errorCity: null,
      selectedCity: null
    });
  });

  it("should set selected city", () => {
    const action = setSelectedCity("Southampton");
    store.dispatch(action);
    const state = store.getState().cities;
    expect(state.selectedCity).toBe("Southampton");
  });
});

describe("Test fetchCities async calls", () => {
  it("should handle pending", () => {
    const action = { type: fetchCities.pending.type };
    const state = cityReducer(undefined, action);
    expect(state.status).toBe("loading");
  });

  it("should handle success", async () => {
    const mockCityData = [{ id: 1, name: "Southampton" }];
    getCities.mockResolvedValue(mockCityData);
    const action = { type: fetchCities.fulfilled.type, payload: mockCityData };
    const state = cityReducer(undefined, action);
    expect(state.status).toBe("success");
    expect(state.cityData).toEqual(mockCityData);
  });

  it("should handle rejected", async () => {
    getCities.mockRejectedValue(new Error("Failed to fetch cities"));
    const action = { type: fetchCities.rejected.type, error: { message: "Failed to fetch cities" } };
    const state = cityReducer(undefined, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Failed to fetch cities");
  });
});
