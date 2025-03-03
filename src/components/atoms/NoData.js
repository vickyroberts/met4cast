import { useTranslation } from "react-i18next";
import { ReactComponent as NoDataSVG } from "../../assets/no-data.svg";
import "../../locale/locale.i18n";
export const NoData = () => {
  const { t } = useTranslation();
  return (
    <div className="show-no-data">
      <div>{t("error_message")}</div>
      <div>
        <NoDataSVG width={300} height={300}></NoDataSVG>
      </div>
    </div>
  );
};
