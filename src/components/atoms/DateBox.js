import { dateFormat } from "../../utils/date-formatter";
export const DateBox = ({date}) => {
    return (
        <div className="date-container">
            <div className="day-container">
                <p>{dateFormat(date)[0]}</p>
                <span>{dateFormat(date)[1]}</span>    
            </div>
        </div>
    )
};