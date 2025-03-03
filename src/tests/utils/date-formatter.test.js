import { dateFormat } from "../../utils/date-formatter";

describe("DateFormat :: Format the date and return values Day and MMM DD", () => {
  it("should format the date in 'en-gb'", () => {
    const inputDate = "2025-02-28";
    const result = dateFormat(inputDate, "en-gb");

    expect(result).toEqual(["Friday", "28 Feb"]);
  });

  it("should format the date in 'en-US' locale", () => {
    const inputDate = "2025-02-28";
    const result = dateFormat(inputDate, "en-US");

    expect(result).toEqual(["Friday", "Feb 28"]);
  });

  it("should format the date in 'fr-FR' (French) locale", () => {
    const inputDate = "2025-02-28";
    const result = dateFormat(inputDate, "fr-FR");

    expect(result).toEqual(["vendredi", "28 févr."]);
  });

  it("should format the date in 'de-DE' (German) locale", () => {
    const inputDate = "2025-02-28";
    const result = dateFormat(inputDate, "de-DE");

    expect(result).toEqual(["Freitag", "28. Feb."]);
  });

  it("should format in 'en-US' if locale not provided", () => {
    const inputDate = "2025-02-28";
    const result = dateFormat(inputDate);

    expect(result).toEqual(["Friday", "Feb 28"]);
  });

  it("should handle invalid date input", () => {
    const result = dateFormat("invalid-date", "en-US");

    expect(result).toEqual(["Invalid Date", "Invalid Date"]);
  });
});
