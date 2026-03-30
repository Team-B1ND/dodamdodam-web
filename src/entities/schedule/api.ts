import { apiClient } from "@/shared/libs/api-client";
import type { Schedule } from "@/entities/schedule/types";

const SCHEDULE_BASE = "neis/schedule";

export const ScheduleApi = {
  async getSchedules(date: string) {
    return await apiClient.get<Schedule[]>(`${SCHEDULE_BASE}?date=${date}`);
  },
};
