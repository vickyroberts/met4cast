import { useTranslation } from "react-i18next";
import {weatherCodes} from '../../utils/weatherMapping';
import wind from '../../assets/weather/wind.svg';
import { DateBox } from '../atoms/DateBox';
import "../../locale/locale.i18n";
import "./WeatherCol.css";
export const WeatherCol = ({weather}) => {
    const  {t} = useTranslation();
    return (
        <div className="column" key={weather.id}>
            <>
                <DateBox date={weather.date}></DateBox>
            </>
            <div>
                <img src={weatherCodes(weather.code)?.imgUrl} alt="Sun" width="50px" height="50px"></img>
            </div>
            <div>
                {weatherCodes(weather.code)?.status}
            </div>
            <div class="temp-container">
                {t("weather.temp")}: <br></br>{weather.tempMin} / 
                <span>{weather.tempMax}</span>
            </div>
            <div>
                <img src={wind} alt="Wind" height="30px" width="50px"></img><br></br>
                {weather.wind}
            </div>
        </div>
    );
};