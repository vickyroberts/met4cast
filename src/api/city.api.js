import constants from '../utils/constants';
export const getCities = async (query) => {
    const errNoData = 'No city found';
    const cityRes = await fetch(`${constants.cityAPIURL}&name=${query}`);
    if (!cityRes.ok) {
        throw new Error(errNoData);
    }
    const data = await cityRes.json();
    if (data && data.results?.length) {
        const transformedData = data.results.map((city) => {
            return {
                id: city.id,
                name: city.name,
                lat: city.latitude,
                long: city.longitude,
                country: city.country,
                countryCode: city.country_code.toLowerCase(),
                flagURL: `https://open-meteo.com/images/country-flags/${city.country_code.toLowerCase()}.svg`,
                region: city.admin1
            }
        });
        return transformedData;
    } else {
        throw new Error(errNoData);
    }
};