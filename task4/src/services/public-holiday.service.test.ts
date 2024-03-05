import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { PublicHoliday, PublicHolidayShort } from "../types";
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../config";

const date = new Date();
const currentYear = date.getFullYear();
const supportedCountry = SUPPORTED_COUNTRIES[0];

const shortenedPublicHolidays: PublicHolidayShort[] = [
  {
    name: "Test Holiday",
    localName: "Test Local Name",
    date: date.toISOString(),
  },
];
const publicHolidays: PublicHoliday[] = [
  {
    ...shortenedPublicHolidays[0],
    countryCode: supportedCountry,
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ["National holiday"],
  },
];

describe("getListOfPublicHolidays", () => {
  it("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: publicHolidays });

    await getListOfPublicHolidays(currentYear, supportedCountry);

    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${currentYear}/${supportedCountry}`
    );
  });

  it("should return a list of public holidays", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: publicHolidays });

    const result = await getListOfPublicHolidays(currentYear, supportedCountry);

    expect(result).toEqual(shortenedPublicHolidays);
  });

  it("should return an empty array when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Request failed"));

    const result = await getListOfPublicHolidays(currentYear, supportedCountry);

    expect(result).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  it("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ status: 200 });

    await checkIfTodayIsPublicHoliday(supportedCountry);

    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${supportedCountry}`
    );
  });

  it("should return true if today is a public holiday", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday(supportedCountry);

    expect(result).toBe(true);
  });

  it("should return false if today is not a public holiday", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 204 });

    const result = await checkIfTodayIsPublicHoliday(supportedCountry);

    expect(result).toBe(false);
  });

  it("should return false when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Request failed"));

    const result = await checkIfTodayIsPublicHoliday(supportedCountry);

    expect(result).toBe(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("getNextPublicHolidays", () => {
  it("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: publicHolidays });

    await getNextPublicHolidays(supportedCountry);

    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${supportedCountry}`
    );
  });

  it("should return a list of next public holidays", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: publicHolidays });

    const result = await getNextPublicHolidays(supportedCountry);

    expect(result).toEqual(shortenedPublicHolidays);
  });

  it("should return an empty array when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Request failed"));

    const result = await getNextPublicHolidays(supportedCountry);

    expect(result).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
