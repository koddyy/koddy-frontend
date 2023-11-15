import { WeekType } from "@/types/user";
import { createTimeRangeList, getDisabledDays } from "./scheduleUtils";

describe("getDisabledDays()", () => {
  test("should return disabled days based on available days.", () => {
    const availableDays: WeekType[] = ["SUN", "MON", "TUE"];
    const result = getDisabledDays(availableDays);
    expect(result).toEqual([3, 4, 5, 6]);
  });
});

describe("createTimeRangeList()", () => {
  test("should return an array of time ranges based on start and end time with default gap.", () => {
    const result = createTimeRangeList("09:00", "11:30");
    expect(result).toEqual([
      ["09:00", "09:30"],
      ["09:30", "10:00"],
      ["10:00", "10:30"],
      ["10:30", "11:00"],
      ["11:00", "11:30"],
    ]);
  });

  test("should return an array of time ranges with custom gap", () => {
    const result = createTimeRangeList("09:00", "11:30", 40);
    expect(result).toEqual([
      ["09:00", "09:40"],
      ["09:40", "10:20"],
      ["10:20", "11:00"],
    ]);
  });
});
