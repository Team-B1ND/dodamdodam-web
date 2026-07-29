import type { PageResponse } from "@b1nd/api-client";
import { apiClient } from "@/shared/libs/api-client";
import type { Team } from "./types";

const TEAM_BASE = "/nightstudy/teams";

export const TeamApi = {
  async getTeams({ page, size = 12 }: { page: number; size?: number }) {
    return await apiClient.get<PageResponse<Team>>(
      `${TEAM_BASE}?page=${page}&size=${size}&sort=id`,
    );
  },

  async getMyTeams({ page, size = 10 }: { page: number; size?: number }) {
    return await apiClient.get<PageResponse<Team>>(
      `${TEAM_BASE}/my?page=${page}&size=${size}&sort=id`,
    );
  },

  async getMyInvitations({ page, size = 10 }: { page: number; size?: number }) {
    return await apiClient.get<PageResponse<Team>>(
      `${TEAM_BASE}/invite/my?page=${page}&size=${size}&sort=id`,
    );
  },

  async leaveTeam(publicId: string) {
    return await apiClient.delete(`${TEAM_BASE}/${publicId}`);
  },
};
