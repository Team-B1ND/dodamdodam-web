import { apiClient } from "@/shared/libs/api-client";
import type {
  PersonalNightStudy,
  PersonalNightStudyApplyRequest,
  ProjectNightStudy,
  ProjectNightStudyApplyRequest,
} from "./types";
import type { PageResponse } from "@b1nd/api-client";

export const NightStudyApi = {
  async createProjectNightStudy(payload: ProjectNightStudyApplyRequest) {
    return await apiClient.post("/nightstudy/project", payload);
  },

  async createPersonalNightStudy(payload: PersonalNightStudyApplyRequest) {
    return await apiClient.post("/nightstudy/personal", payload);
  },

  async getProjectNightStudy(params: { page: number }) {
    return await apiClient.get<PageResponse<ProjectNightStudy>>(
      `/nightstudy/my/project?page=${params.page}&size=10`,
    );
  },

  async getPersonalNightStudy(params: { page: number }) {
    return await apiClient.get<PageResponse<PersonalNightStudy>>(
      `/nightstudy/my/personal?page=${params.page}&size=10`,
    );
  },

  async deleteNightStudy(id: string) {
    return await apiClient.delete(`/nightstudy/${id}`);
  },
};
