export const dateFormat = (inputDate, locale = 'en-US') => {
    const date = new Date(inputDate);
    const day = date.toLocaleDateString(locale, { weekday: "long" });
    const formattedDate = date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
    });
    return [day, formattedDate];
  };
  