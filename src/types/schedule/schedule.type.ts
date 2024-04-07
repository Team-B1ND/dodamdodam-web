export interface Schedule {
  readonly id: number;
  name: string;
  place: string;
  type: "ACADEMIC" | "HOLIDAY";
  startDate: string;
  endDate: string;
  targetGrades: string[];
}

export interface TodayScheduleResponse extends Response {
  data: Schedule[];
}
