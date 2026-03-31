import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";
import type {
  BanStatusResponse,
  CreateBanRequest,
  NightStudyRoom,
  NightStudyStatus,
  PersonalNightStudy,
  PersonalNightStudyApplyRequest,
  PersonalNightStudyApplication,
  ProjectNightStudy,
  ProjectNightStudyApplyRequest,
  ProjectNightStudyApplication,
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
  },

  async getPersonalApplications(params: { page: number; size?: number; keyword?: string; status?: NightStudyStatus }) {
    const { page, size = 20, keyword, status } = params;
    const qs = new URLSearchParams({ type: "PERSONAL", page: String(page), size: String(size) });
    if (keyword) qs.set("keyword", keyword);
    if (status) qs.set("status", status);
    return await apiClient.get<PageResponse<PersonalNightStudyApplication>>(
      `/nightstudy/applications?${qs.toString()}`,
    );
  },

  async getProjectApplications(params: { page: number; size?: number; keyword?: string; status?: NightStudyStatus }) {
    const { page, size = 20, keyword, status } = params;
    const qs = new URLSearchParams({ type: "PROJECT", page: String(page), size: String(size) });
    if (keyword) qs.set("keyword", keyword);
    if (status) qs.set("status", status);
    return await apiClient.get<PageResponse<ProjectNightStudyApplication>>(
      `/nightstudy/applications?${qs.toString()}`,
    );
  },

  async allowApplication(id: string) {
    return await apiClient.patch(`/nightstudy/applications/${id}/allow`);
  },

  async rejectApplication(payload: { id: string; rejectionReason: string }) {
    return await apiClient.patch(`/nightstudy/applications/${payload.id}/reject`, {
      rejectionReason: payload.rejectionReason,
    });
  },

  async pendingApplication(id: string) {
    return await apiClient.patch(`/nightstudy/applications/${id}/pending`);
  },

  async getRooms() {
    return await apiClient.get<NightStudyRoom[]>('/nightstudy/rooms');
  },

  async assignRoom(payload: { id: string; roomId: number }) {
    return await apiClient.patch(`/nightstudy/applications/${payload.id}/room`, {
      roomId: payload.roomId,
    });
  },

  async getBanList() {
    return await apiClient.get<BanStatusResponse[]>('/nightstudy/bans');
  },

  async createBan(payload: CreateBanRequest) {
    return await apiClient.post('/nightstudy/bans', payload);
  },

  async deleteBan(userId: string) {
    return await apiClient.delete(`/nightstudy/bans/${userId}`);
  },
};
