import constants from '../utils/constants';
export const getWeather = async (lat, long) => {
    const errNoData = 'Error while fetching weather';
    const weatherRes = await fetch(`${constants.weatherAPIURL}&&latitude=${lat}&longitude=${long}`);
    if (!weatherRes.ok) {
        throw new Error(errNoData);
    }
    const data = await weatherRes.json();
    console.log('>>>> weatherRes DATA', data);
    if (data && data.daily?.time?.length > 0 && data.daily?.wind_speed_10m_max?.length > 0) {
        try {
            const transformedData = data.daily.time.map((wthrTime, index) => {
                return {
                    id: index,
                    date: wthrTime,
                    code: data.daily.weather_code[index],
                    tempMin: `${data.daily.temperature_2m_min[index]} ${data.daily_units.temperature_2m_min}`,
                    tempMax: `${data.daily.temperature_2m_max[index]} ${data.daily_units.temperature_2m_max}`,
                    wind: `${data.daily.wind_speed_10m_max[index]} ${data.daily_units.wind_speed_10m_max}`
                }
            });
            return transformedData;
        } catch (e) {
            console.log(e);
            throw new Error(errNoData);    
        }
    } else {
        throw new Error(errNoData);
    }
};