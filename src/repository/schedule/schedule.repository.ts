import { dodamV3Axios } from "../../lib/axios/customAxios";
import { TodayScheduleResponse } from "../../types/schedule/schedule.type";

class Schedule {
  public async getTodaySchedules(): Promise<TodayScheduleResponse> {
    const { data } = await dodamV3Axios.get("/schedule/today");
    return data;
  }
}

export default new Schedule();
