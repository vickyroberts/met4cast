import { getWeather } from "../../api/weather.api";
import constants from "../../utils/constants";

import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

describe("getWeather :: Test Weather API", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should transform and return weather data on success", async () => {
    const mockResponse = {
      daily: {
        time: ["2025-03-01", "2025-03-02"],
        weather_code: [1, 2],
        temperature_2m_min: [10, 12],
        temperature_2m_max: [20, 22],
        wind_speed_10m_max: [5, 6],
      },
      daily_units: {
        temperature_2m_min: "°C",
        temperature_2m_max: "°C",
        wind_speed_10m_max: "km/h",
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const lat = 40.7128;
    const long = -74.006;
    const data = await getWeather(lat, long);

    expect(fetchMock).toHaveBeenCalledWith(
      `${constants.weatherAPIURL}&&latitude=${lat}&longitude=${long}`
    );
    expect(data).toEqual([
      {
        id: 0,
        date: "2025-03-01",
        code: 1,
        tempMin: "10 °C",
        tempMax: "20 °C",
        wind: "5 km/h",
      },
      {
        id: 1,
        date: "2025-03-02",
        code: 2,
        tempMin: "12 °C",
        tempMax: "22 °C",
        wind: "6 km/h",
      },
    ]);
  });

  it("should throw an errror when no weather data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ daily: {} }));
    const lat = 40.7128;
    const long = -74.006;

    await expect(getWeather(lat, long)).rejects.toThrowError(
      "Error while fetching weather"
    );
    expect(fetchMock).toHaveBeenCalledWith(
      `${constants.weatherAPIURL}&&latitude=${lat}&longitude=${long}`
    );
  });

  it("should throw an error when API fails", async () => {
    fetchMock.mockReject(new Error("Network Error"));
    const lat = 51.5074;
    const long = -0.1278;
    await expect(getWeather(lat, long)).rejects.toThrowError("Network Error");
    expect(fetchMock).toHaveBeenCalledWith(
      `${constants.weatherAPIURL}&&latitude=${lat}&longitude=${long}`
    );
  });
});
