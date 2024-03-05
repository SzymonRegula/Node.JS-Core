import { validateInput, shortenPublicHoliday } from "./helpers";
import { SUPPORTED_COUNTRIES } from "./config";

describe("validateInput", () => {
  it("should throw an error if the country is not supported", () => {
    const country = "unsupportedCountry";
    expect(() => validateInput({ country })).toThrow(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });

  it("should throw an error if the year is not the current year", () => {
    const year = 2000;
    expect(() => validateInput({ year })).toThrow(
      new Error(`Year provided not the current, received: ${year}`)
    );
  });

  it("should return true if the country is supported and the year is the current year", () => {
    expect(
      validateInput({
        country: SUPPORTED_COUNTRIES[0],
        year: new Date().getFullYear(),
      })
    ).toBe(true);
  });
});

describe("shortenPublicHoliday", () => {
  it("should return a shortened version of the public holiday", () => {
    const name = "Test Holiday";
    const localName = "Testowy Święto";
    const date = "2022-01-01";

    const holiday = {
      name,
      localName,
      date,
      fixed: true,
      global: true,
      countryCode: "PL",
      counties: null,
      launchYear: null,
      types: ["National holiday"],
    };

    const expectedShortHoliday = {
      name,
      localName,
      date,
    };

    expect(shortenPublicHoliday(holiday)).toEqual(expectedShortHoliday);
  });
});
