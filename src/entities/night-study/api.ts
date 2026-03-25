import { apiClient } from "@/shared/libs/api-client";
import type {
  NightStudyStatus,
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

  async getProjectNightStudy(params: {
    status: NightStudyStatus;
    page: number;
  }) {
    return await apiClient.get<PageResponse<ProjectNightStudy>>(
      `/nightstudy/my/project?status=${params.status}&page=${params.page}&size=10`,
    );
  },

  async getPersonalNightStudy(params: {
    status: NightStudyStatus;
    page: number;
  }) {
    return await apiClient.get<PageResponse<PersonalNightStudy>>(
      `/nightstudy/my/personal?status=${params.status}&page=${params.page}&size=10`,
    );
  },

  async deleteNightStudy(id: string) {
    return await apiClient.delete(`/nightstudy/${id}`);
  },
};
