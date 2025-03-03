export const weatherCodes = (code) => {
    let intiWeather = {}
    switch(code) {
        case 0: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/1.svg',
                status: 'Sunny'
            }
            break;
        }
        case 1: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/2.svg',
                status: 'Mostly Sunny'
            }
            break;
        }
        case 2: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/3.svg',
                status: 'Partly Sunny'
            }
            break;
        }
        case 3: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/7.svg',
                status: 'Cloudy'
            }
            break;
        }
        case 45: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/11.svg',
                status: 'Fog'
            }
            break;
        }
        case 61: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/12.svg',
                status: 'Showers'
            }
            break;
        }
        case 95: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/15.svg',
                status: 'Thunderstorms'
            }
            break;
        }
        case 63: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/18.svg',
                status: 'Rain'
            }
            break;
        }
        case 73: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/22.svg',
                status: 'Snow'
            }
            break;
        }
        case 66: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/24.svg',
                status: 'Ice'
            }
            break;
        }
        case 80: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/29.svg',
                status: 'Rain and Snow'
            }
            break;
        }
        default: {
            intiWeather = {
                imgUrl: 'https://www.accuweather.com/images/weathericons/1.svg',
                status: 'Sunny'
            }
        }
    }
    return intiWeather;
}