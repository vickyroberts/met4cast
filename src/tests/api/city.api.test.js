import { getCities } from "../../api";
import constants from "../../utils/constants";

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("getCities :: Test the API function", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should transform and return city data on success", async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: "Southampton",
          latitude: 40.7128,
          longitude: -74.006,
          country: "United Kingdom",
          country_code: "GB",
          admin1: "Southampton"
        }
      ]
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const query = "Southampton";
    const data = await getCities(query);

    expect(fetchMock).toHaveBeenCalledWith(`${constants.cityAPIURL}&name=${query}`);
    expect(data).toEqual([
      {
        id: 1,
        name: "Southampton",
        lat: 40.7128,
        long: -74.006,
        country: "United Kingdom",
        countryCode: "gb",
        flagURL: "https://open-meteo.com/images/country-flags/gb.svg",
        region: "Southampton"
      }
    ]);
  });

  it("should throw an error when city is found", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));
    const query = "";
    await expect(getCities(query)).rejects.toThrowError("No city found");
    expect(fetchMock).toHaveBeenCalledWith(`${constants.cityAPIURL}&name=${query}`);
  });

  it("should throw an error when the API fails", async () => {
    fetchMock.mockReject(new Error("Network Error"));
    const query = "Paris";
    await expect(getCities(query)).rejects.toThrowError("Network Error");
    expect(fetchMock).toHaveBeenCalledWith(`${constants.cityAPIURL}&name=${query}`);
  });
});