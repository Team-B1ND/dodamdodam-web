import { dodamTestAxios } from "@src/lib/axios/customAxios";
import { TodayScheduleResponse } from "@src/types/schedule/schedule.type";

class Schedule {
  public async getTodaySchedules(): Promise<TodayScheduleResponse> {
    const { data } = await dodamTestAxios.get("/schedule/today");
    return data;
  }
}

export default new Schedule();
