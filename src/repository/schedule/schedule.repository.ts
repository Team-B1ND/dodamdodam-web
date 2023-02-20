import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { TodayScheduleResponse } from "@src/types/schedule/schedule.type";

class Schedule {
  public async getTodaySchedules(): Promise<TodayScheduleResponse> {
    const { data } = await dodamV6Axios.get("/schedule/today");
    return data;
  }
}

export default new Schedule();
