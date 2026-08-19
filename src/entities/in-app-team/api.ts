import type { InAppTeam } from "@/entities/in-app-team/types";
import { apiClient } from "@/shared/libs/api-client";

const IN_APP_TEAM_BASE = "/inapp/team";

export const InAppTeamApi = {
  async getTeam(teamId: string) {
    return await apiClient.get<InAppTeam>(
      `${IN_APP_TEAM_BASE}/${encodeURIComponent(teamId)}`,
    );
  },
};
