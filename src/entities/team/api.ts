import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";
import type { CreateTeamRequest, InviteTeamRequest, Team } from "./types";

const TEAM_BASE = "/nightstudy/teams";

export const TeamApi = {
  async createTeam(payload: CreateTeamRequest) {
    return await apiClient.post(TEAM_BASE, payload);
  },

  async getMyTeams() {
    const query = new URLSearchParams({
      page: "0",
      size: "20",
      sort: "id,desc",
    });

    return await apiClient.get<PageResponse<Team>>(
      `${TEAM_BASE}/my?${query.toString()}`,
    );
  },

  async inviteTeam(payload: InviteTeamRequest) {
    return await apiClient.post(`${TEAM_BASE}/invite`, payload);
  },
};
