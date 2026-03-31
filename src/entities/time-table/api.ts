import type { TimeTableType } from "@/entities/time-table/types";
import { apiClient } from "@/shared/libs/api-client";

const TIME_TABLE_BASE = "/neis/time-table";

export const TimeTableApi = {
  async getMyTimeTable() {
    return await apiClient.get<TimeTableType[]>(`${TIME_TABLE_BASE}/me`);
  }
}