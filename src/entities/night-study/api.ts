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
  NightStudyCount,
} from "./types";

const NIGHT_STUDY_BASE = "/nightstudy";

export const NightStudyApi = {
  async createProjectNightStudy(payload: ProjectNightStudyApplyRequest) {
    return await apiClient.post(`${NIGHT_STUDY_BASE}/project`, payload);
  },

  async createPersonalNightStudy(payload: PersonalNightStudyApplyRequest) {
    return await apiClient.post(`${NIGHT_STUDY_BASE}/personal`, payload);
  },

  async getProjectNightStudy() {
    return await apiClient.get<ProjectNightStudy[]>(
      `${NIGHT_STUDY_BASE}/my/project`,
    );
  },

  async getPersonalNightStudy() {
    return await apiClient.get<PersonalNightStudy[]>(
      `${NIGHT_STUDY_BASE}/my/personal`,
    );
  },

  async deleteNightStudy(id: string) {
    return await apiClient.delete(`${NIGHT_STUDY_BASE}/${id}`);
  },

  async getBanStatus() {
    return await apiClient.get<BanStatusResponse>(`${NIGHT_STUDY_BASE}/bans/my`);
  },

  async getPersonalApplications(params: { page: number; size?: number; keyword?: string; status?: NightStudyStatus }) {
    const { page, size = 20, keyword, status } = params;
    const qs = new URLSearchParams({ type: "PERSONAL", page: String(page), size: String(size) });
    if (keyword) qs.set("keyword", keyword);
    if (status) qs.set("status", status);
    return await apiClient.get<PageResponse<PersonalNightStudyApplication>>(
      `${NIGHT_STUDY_BASE}/applications?${qs.toString()}`,
    );
  },

  async getProjectApplications(params: { page: number; size?: number; keyword?: string; status?: NightStudyStatus }) {
    const { page, size = 20, keyword, status } = params;
    const qs = new URLSearchParams({ type: "PROJECT", page: String(page), size: String(size) });
    if (keyword) qs.set("keyword", keyword);
    if (status) qs.set("status", status);
    return await apiClient.get<PageResponse<ProjectNightStudyApplication>>(
      `${NIGHT_STUDY_BASE}/applications?${qs.toString()}`,
    );
  },

  async allowApplication(id: string) {
    return await apiClient.patch(`${NIGHT_STUDY_BASE}/applications/${id}/allow`);
  },

  async rejectApplication(payload: { id: string; rejectionReason: string }) {
    return await apiClient.patch(`${NIGHT_STUDY_BASE}/applications/${payload.id}/reject`, {
      rejectionReason: payload.rejectionReason,
    });
  },

  async pendingApplication(id: string) {
    return await apiClient.patch(`${NIGHT_STUDY_BASE}/applications/${id}/pending`);
  },

  async getRooms() {
    return await apiClient.get<NightStudyRoom[]>(`${NIGHT_STUDY_BASE}/rooms`);
  },

  async assignRoom(payload: { id: string; roomId: number }) {
    return await apiClient.patch(`${NIGHT_STUDY_BASE}/applications/${payload.id}/room`, {
      roomId: payload.roomId,
    });
  },

  async getNightStudyCount() {
    return await apiClient.get<NightStudyCount>(`${NIGHT_STUDY_BASE}/applications/count`);
  },

  async getBanList() {
    return await apiClient.get<BanStatusResponse[]>(`${NIGHT_STUDY_BASE}/bans`);
  },

  async createBan(payload: CreateBanRequest) {
    return await apiClient.post(`${NIGHT_STUDY_BASE}/bans`, payload);
  },

  async deleteBan(userId: string) {
    return await apiClient.delete(`${NIGHT_STUDY_BASE}/bans/${userId}`);
  },
};
