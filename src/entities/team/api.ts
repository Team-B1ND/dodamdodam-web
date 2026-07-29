import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";
import type {
  CreateTeamRequest,
  InviteTeamRequest,
  Team,
  TeamMember,
} from "./types";

const TEAM_BASE = "/nightstudy/teams";

interface GetMyTeamsParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const TeamApi = {
  async createTeam(payload: CreateTeamRequest) {
    return await apiClient.post(TEAM_BASE, payload);
  },

  async getMyTeams({
    page = 0,
    size = 10,
    sort = "id",
  }: GetMyTeamsParams = {}) {
    const query = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });

    return await apiClient.get<PageResponse<Team>>(
      `${TEAM_BASE}/my?${query.toString()}`,
    );
  },

  async getTeamMembers(publicId: string) {
    return await apiClient.get<TeamMember[]>(`${TEAM_BASE}/${publicId}`);
  },

  async inviteTeam(payload: InviteTeamRequest) {
    return await apiClient.post(`${TEAM_BASE}/invite`, payload);
  },
};
