import { dodamAxios } from "@src/lib/axios/customAxios";
import { TodayScheduleResponse } from "@src/types/schedule/schedule.type";

class Schedule {
  public async getTodaySchedules(): Promise<TodayScheduleResponse> {
    const { data } = await dodamAxios.get("/schedule/today");
    return data;
  }
}

export default new Schedule();
