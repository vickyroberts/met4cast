import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fetchCities, setSelectedCity } from "../../store/city.slice";
import { fetchWeather } from "../../store/weather.slice";
import { InputBox } from "../atoms/InputBox";
import "../../locale/locale.i18n";
import "./CitySelector.css";

export const CitySelector = () => {
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const  {t} = useTranslation();
  const lastSearched = useRef();
  const selectionRef = useRef();
  const dispatch = useDispatch();
  const { cityData } = useSelector((state) => state.cities);

  // Set debounce to call city search api only after typing is complete.
  const handleKeyPress = useCallback((e) => {
    if (lastSearched.current) {
      clearTimeout(lastSearched.current);
    }
    lastSearched.current = setTimeout(() => {
      setShowOptions(query);
      dispatch(fetchCities(query));
    }, 1500);
  }, [dispatch, query]);

  const handleInput = (e) => {
    if (e.target.value === "") {
      setShowOptions(false);
    }
  };

  /*When city is selected from the list, dispatch to save selected
  and to fetch weather for the city*/
  const handleCitySelection = (city) => {
    dispatch(setSelectedCity(city));
    dispatch(fetchWeather({ lat: city.lat, long: city.long }));
    setShowOptions(false);
  };

  // City selection hide when clicked outside the area.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectionRef.current &&
        !selectionRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <InputBox
        type="search"
        className="search"
        name="search"
        id="search"
        placeholder={t("search.button")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyPress}
      ></InputBox>
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="dropdown"
          ref={selectionRef}
        >
          {cityData &&
            cityData.map((city) => (
              <div
                key={city.id}
                className="dropdown-item"
                onClick={() => {
                  handleCitySelection(city);
                }}
              >
                <div id="countryFlag">
                  <img src={city.flagURL} alt={city.country}></img>
                </div>
                <div id="cityName">
                  {city.name}
                  <br></br>
                </div>
                <div id="countryName">
                  <small className="text-faded">
                    {city.region} - {city.country}
                  </small>
                </div>
              </div>
            ))}
        </motion.div>
      )}
    </>
  );
};
