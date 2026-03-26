import { apiClient } from "@/shared/libs/api-client";
import type {
  BanStatusResponse,
  PersonalNightStudy,
  PersonalNightStudyApplyRequest,
  ProjectNightStudy,
  ProjectNightStudyApplyRequest,
} from "./types";

export const NightStudyApi = {
  async createProjectNightStudy(payload: ProjectNightStudyApplyRequest) {
    return await apiClient.post("/nightstudy/project", payload);
  },

  async createPersonalNightStudy(payload: PersonalNightStudyApplyRequest) {
    return await apiClient.post("/nightstudy/personal", payload);
  },

  async getProjectNightStudy() {
    return await apiClient.get<ProjectNightStudy[]>(
      `/nightstudy/my/project`,
    );
  },

  async getPersonalNightStudy() {
    return await apiClient.get<PersonalNightStudy[]>(
      `/nightstudy/my/personal`,
    );
  },

  async deleteNightStudy(id: string) {
    return await apiClient.delete(`/nightstudy/${id}`);
  },

  async getBanStatus() {
    return await apiClient.get<BanStatusResponse>('/nightstudy/bans/my');
  }
};
