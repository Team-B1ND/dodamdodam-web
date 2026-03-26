import type { OutSleepingApplyRequest } from "@/entities/out-sleeping/type";
import { apiClient } from "@/shared/libs/api-client";

const OUT_SLEEPING_BASE = "/out-sleeping";

export const OutSleepingApi = {
  async createOutSleeping(payload: OutSleepingApplyRequest) {
    return await apiClient.post(`${OUT_SLEEPING_BASE}`, payload);
  }
}