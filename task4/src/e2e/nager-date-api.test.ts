import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";
import { SUPPORTED_COUNTRIES } from "../config";

const country = SUPPORTED_COUNTRIES[0];

describe("Cats API", () => {
  describe("/IsTodayPublicHoliday/{countryCode}", () => {
    it("should return 200 or 204", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/IsTodayPublicHoliday/${country}`
      );

      expect([200, 204]).toContain(status);
    });

    it("should return 404 if country is unknown", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/IsTodayPublicHoliday/unnkownCountry`
      );

      expect(status).toEqual(404);
    });
  });

  describe("/NextPublicHolidays/{countryCode}", () => {
    it("should return 200 and upcoming holidays", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/NextPublicHolidays/${country}`
      );

      expect(status).toEqual(200);

      body.forEach((holiday: any) => {
        expect(typeof holiday.date).toBe("string");
        expect(typeof holiday.localName).toBe("string");
        expect(typeof holiday.name).toBe("string");
        expect(typeof holiday.countryCode).toBe("string");
        expect(typeof holiday.fixed).toBe("boolean");
        expect(typeof holiday.global).toBe("boolean");

        if (holiday.counties !== null) {
          expect(Array.isArray(holiday.counties)).toBe(true);
          holiday.counties.forEach((county: any) => {
            expect(typeof county).toBe("string");
          });
        } else {
          expect(holiday.counties).toBeNull();
        }

        if (holiday.launchYear !== null) {
          expect(typeof holiday.launchYear).toBe("number");
        } else {
          expect(holiday.launchYear).toBeNull();
        }

        expect(Array.isArray(holiday.types)).toBe(true);
        holiday.types.forEach((type: any) => {
          expect(typeof type).toBe("string");
        });
      });
    });

    it("should return 500 if country is unknown", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/NextPublicHolidays/unnkownCountry`
      );

      expect(status).toEqual(500);
    });
  });
});
