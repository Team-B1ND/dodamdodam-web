import type { PageResponse } from "@b1nd/api-client";
import { apiClient } from "@/shared/libs/api-client";
import type { Team } from "./types";


const NIGHT_STUDY_BASE = "/nightstudy";

export const TeamApi = {
  async getMyTeams({ page, size = 10 }: { page: number; size?: number }) {
    return await apiClient.get<PageResponse<Team>>(
      `/${NIGHT_STUDY_BASE}teams?page=${page}&size=${size}&sort=id`,
    );
  },
};
