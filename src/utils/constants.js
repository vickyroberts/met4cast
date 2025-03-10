const constants = {
    weatherAPIURL: process.env.REACT_APP_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast?current=is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,daylight_duration,sunshine_duration,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max&forecast_days=5',
    cityAPIURL: process.env.REACT_APP_CITY_API_URL || 'https://geocoding-api.open-meteo.com/v1/search?count=7&language=en&format=json',
}

export default constants;