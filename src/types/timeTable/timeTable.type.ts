import { Response } from "types/util/response.type";

export interface TimeTable {
  endTime: string;
  id: number;
  name: string;
  startTime: string;
  type: "WEEKDAY" | "WEEKEND";
}

export interface TimeTablesResponse extends Response {
  data: TimeTable[];
}
