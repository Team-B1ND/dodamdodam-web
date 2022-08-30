export interface Schedule {
  readonly id: number;
  endDate: string;
  name: string;
  plcae: string | null;
  startDate: string;
  target: string;
}

export interface TodayScheduleResponse extends Response {
  data: Schedule[];
}
