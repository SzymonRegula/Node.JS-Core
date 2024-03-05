import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../services/public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";

const date = new Date();
const currentYear = date.getFullYear();
const supportedCountry = SUPPORTED_COUNTRIES[0];

describe("Public holiday service", () => {
  describe("getListOfPublicHolidays", () => {
    it("should return a list of public holidays", async () => {
      const result = await getListOfPublicHolidays(
        currentYear,
        supportedCountry
      );

      expect(result).toBeInstanceOf(Array);

      result.forEach((holiday) => {
        expect(holiday).toHaveProperty("name");
        expect(holiday).toHaveProperty("localName");
        expect(holiday).toHaveProperty("date");
      });
    });

    it("should throw an error when provided country is not supported", async () => {
      const country = "unsupportedCountry";
      try {
        await getListOfPublicHolidays(currentYear, country);
      } catch (error) {
        expect(error).toEqual(
          new Error(`Country provided is not supported, received: ${country}`)
        );
      }
    });

    it("should throw an error when provided year is not the current", async () => {
      const year = 2000;
      try {
        await getListOfPublicHolidays(year, supportedCountry);
      } catch (error) {
        expect(error).toEqual(
          new Error(`Year provided not the current, received: ${year}`)
        );
      }
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should return true/false", async () => {
      const result = await checkIfTodayIsPublicHoliday(supportedCountry);

      expect(typeof result).toBe("boolean");
    });

    it("should throw an error when provided country is not supported", async () => {
      const country = "unsupportedCountry";
      try {
        await checkIfTodayIsPublicHoliday(country);
      } catch (error) {
        expect(error).toEqual(
          new Error(`Country provided is not supported, received: ${country}`)
        );
      }
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should return a list of next public holidays", async () => {
      const result = await getNextPublicHolidays(supportedCountry);

      expect(result).toBeInstanceOf(Array);

      result.forEach((holiday) => {
        expect(holiday).toHaveProperty("name");
        expect(holiday).toHaveProperty("localName");
        expect(holiday).toHaveProperty("date");
      });
    });

    it("should throw an error when provided country is not supported", async () => {
      const country = "unsupportedCountry";
      try {
        await getNextPublicHolidays(country);
      } catch (error) {
        expect(error).toEqual(
          new Error(`Country provided is not supported, received: ${country}`)
        );
      }
    });
  });
});
