import {useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { WeatherCol } from "./molecules/WeatherCol";
import { CitySelector } from "./molecules/CitySelector";
import { resetWeather } from "../store/weather.slice";
import { setSelectedCity } from "../store/city.slice";
import { NoData } from "../components/atoms/NoData";
import "../locale/locale.i18n";
import "./Container.css";
const Container = () => {
  const  {t} = useTranslation();
  const { wthrData, error } = useSelector((state) => state.weather);
  const { selectedCity, errorCity } = useSelector((state) => state.cities);
  console.log('>> wthrData', wthrData);
  const dispatch = useDispatch();

  //Clear the data when the cross button is pressed next to selected city.
  const clearSearch = useCallback((e) => {
    e.preventDefault();
    dispatch(setSelectedCity());
    dispatch(resetWeather());
  }, [dispatch]);

  return (
    <main className="main-container">
      <div className="search-container">
        {/* City selector will display a input box and on search display cities list */}
        <CitySelector></CitySelector>
      </div>
      <div className="city-title">
        {selectedCity && <><div>
            {selectedCity && selectedCity.name} <span>{selectedCity && selectedCity.country}</span>
        </div>
        <div>
            <input type="button" onClick={clearSearch} value="X"></input>
        </div></>
        }
      </div>
      <div className="weather-container">
      {/* Show an error message when error obj is available */}
        {(errorCity || error) && <div className="error">
            {t("landing_info")}
        </div>}
        <div className="columns">
        {/* Display weather columns or no data component */}
          {!errorCity && !error && wthrData && wthrData.map((weather) => (
            <WeatherCol weather={weather}></WeatherCol>
          ))}
          {!errorCity && !error && !wthrData && <>
            <NoData></NoData>
          </>}
        </div>
      </div>
    </main>
  );
};

export default Container;
