import type { TimeTable } from "@/entities/time-table/types";
import { apiClient } from "@/shared/libs/api-client";

const TIME_TABLE_BASE = "/neis/schedule";

export const MyTimeTableApi = async () => {
  return await apiClient.get<TimeTable[]>(`${TIME_TABLE_BASE}/me`);
}
