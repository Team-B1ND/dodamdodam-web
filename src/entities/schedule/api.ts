import { apiClient } from "@/shared/libs/api-client";
import type {AddScheduleRequest, Schedule} from "@/entities/schedule/types";

const SCHEDULE_BASE = "neis/schedule";

export const ScheduleApi = {
  async getSchedules(date: string) {
    return await apiClient.get<Schedule[]>(`${SCHEDULE_BASE}?date=${date}`);
  },
};

export const AddScheduleApi = {
  async addSchedule(data: AddScheduleRequest) {
    return await apiClient.post(`${SCHEDULE_BASE}`, data);
  }
}