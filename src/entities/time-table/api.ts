import type { TimeTableType } from "@/entities/time-table/types";
import { apiClient } from "@/shared/libs/api-client";

const TIME_TABLE_BASE = "/neis/schedule";

export const GetMyTimeTableApi = async () => {
  return await apiClient.get<TimeTableType[]>(`${TIME_TABLE_BASE}/me`);
}
