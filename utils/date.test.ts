import { formatISO, localToZonedDate, parseISO, zonedToLocalDate } from "./dateUtils";

const localTimeZone = "America/New_York";

jest.mock("cookies-next", () => ({
  getCookie: (key: string) => ({ timezone: localTimeZone })[key],
}));

const KST = "2024-01-01T09:00:00";
const local = "2023-12-31T19:00:00"; // GMT-05:00

const KSTWithDST = "2023-05-02T09:00:00";
const localWithDST = "2023-05-01T20:00:00"; // GMT-04:00

describe("formatISO()", () => {
  test("convert Date to ISO string", () => {
    const iso = formatISO(new Date(2024, 0, 1));

    expect(iso).toEqual("2024-01-01T00:00:00");
  });
});

describe("parseISO()", () => {
  test("convert ISO string to yyyymmdd, hhmmss", () => {
    const { yyyymmdd, hhmmss } = parseISO("2024-01-01T00:00:00");

    expect({ yyyymmdd, hhmmss }).toEqual({ yyyymmdd: "2024-01-01", hhmmss: "00:00:00" });
  });
});

describe("localToZonedDate()", () => {
  test("convert local date to KST zoned date", () => {
    const result = formatISO(localToZonedDate(local, "Asia/Seoul"));

    expect(result).toEqual(KST);
  });

  test("reflect daylight saving time", () => {
    const result = formatISO(localToZonedDate(localWithDST, "Asia/Seoul"));

    expect(result).toEqual(KSTWithDST);
  });
});

describe("zonedToLocalDate()", () => {
  test("convert KST zoned date to local date", () => {
    const result = formatISO(zonedToLocalDate(KST, "Asia/Seoul"));

    expect(result).toEqual(local);
  });

  test("reflect daylight saving time", () => {
    const result = formatISO(zonedToLocalDate(KSTWithDST, "Asia/Seoul"));

    expect(result).toEqual(localWithDST);
  });
});
