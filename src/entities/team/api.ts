import type { PageResponse } from "@b1nd/api-client";
import { apiClient } from "@/shared/libs/api-client";
import type { Team, TeamMember } from "./types";

const TEAM_BASE = "/nightstudy/teams";

export const TeamApi = {
  async getMyTeams({ page, size = 10 }: { page: number; size?: number }) {
    return await apiClient.get<PageResponse<Team>>(
      `${TEAM_BASE}/my?page=${page}&size=${size}&sort=id`,
    );
  },

  async getTeamMembers(publicId: string) {
    return await apiClient.get<TeamMember[]>(`${TEAM_BASE}/${publicId}`);
  },
};
