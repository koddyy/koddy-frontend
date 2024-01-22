import { Mentor, Period } from "@/types/mentor";

export interface GetReservedSchedulesRequest {
  year: number;
  month: number;
}

export interface GetReservedSchedulesResponse {
  period: Period;
  schedules: Mentor["schedules"];
  timeUnit: 30 | 60;
  reserved: Array<{ start: string; end: string }>;
}
