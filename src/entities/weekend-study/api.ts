import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";
import type {
  BlockWeekendStudyRoomRequest,
  CheckWeekendStudyAttendanceRequest,
  PersonalWeekendStudy,
  PersonalWeekendStudyApplyRequest,
  ProjectWeekendStudy,
  ProjectWeekendStudyApplyRequest,
  SaveWeekendStudyRoomRequest,
  WeekendStudyApplication,
  WeekendStudyApplicationsParams,
  WeekendStudyAttendanceSummary,
  WeekendStudyAttendanceSummaryParams,
  WeekendStudyDeadline,
  WeekendStudyRoom,
  WeekendStudyRoomBlock,
} from "./types";

const WEEKEND_STUDY_BASE = "/weekendstudy";

export const WeekendStudyApi = {
  async applyPersonal(payload: PersonalWeekendStudyApplyRequest) {
    return await apiClient.post(`${WEEKEND_STUDY_BASE}/personal`, payload);
  },

  async applyProject(payload: ProjectWeekendStudyApplyRequest) {
    return await apiClient.post(`${WEEKEND_STUDY_BASE}/project`, payload);
  },

  async getMyPersonal() {
    return await apiClient.get<PersonalWeekendStudy[]>(
      `${WEEKEND_STUDY_BASE}/my/personal`,
    );
  },

  async getMyProject() {
    return await apiClient.get<ProjectWeekendStudy[]>(
      `${WEEKEND_STUDY_BASE}/my/project`,
    );
  },

  async cancel(id: string) {
    return await apiClient.delete(`${WEEKEND_STUDY_BASE}/${id}`);
  },

  async getApplications(params: WeekendStudyApplicationsParams) {
    const { date, type, page, size = 50 } = params;
    const qs = new URLSearchParams({
      date,
      type,
      page: String(page),
      size: String(size),
    });

    return await apiClient.get<PageResponse<WeekendStudyApplication>>(
      `${WEEKEND_STUDY_BASE}/applications?${qs.toString()}`,
    );
  },

  async allow(id: string) {
    return await apiClient.patch(`${WEEKEND_STUDY_BASE}/${id}/allow`);
  },

  async reject(payload: { id: string; rejectionReason: string }) {
    return await apiClient.patch(`${WEEKEND_STUDY_BASE}/${payload.id}/reject`, {
      rejectionReason: payload.rejectionReason,
    });
  },

  async pending(id: string) {
    return await apiClient.patch(`${WEEKEND_STUDY_BASE}/${id}/pending`);
  },

  async assignRoom(payload: { id: string; roomId: number }) {
    return await apiClient.patch(`${WEEKEND_STUDY_BASE}/${payload.id}/room`, {
      roomId: payload.roomId,
    });
  },

  async unassignRoom(id: string) {
    return await apiClient.delete(`${WEEKEND_STUDY_BASE}/${id}/room`);
  },

  async getRooms() {
    return await apiClient.get<WeekendStudyRoom[]>(
      `${WEEKEND_STUDY_BASE}/rooms`,
    );
  },

  async createRoom(payload: SaveWeekendStudyRoomRequest) {
    return await apiClient.post(`${WEEKEND_STUDY_BASE}/rooms`, payload);
  },

  async updateRoom(payload: { id: number } & SaveWeekendStudyRoomRequest) {
    const { id, ...body } = payload;
    return await apiClient.patch(`${WEEKEND_STUDY_BASE}/rooms/${id}`, body);
  },

  async deleteRoom(id: number) {
    return await apiClient.delete(`${WEEKEND_STUDY_BASE}/rooms/${id}`);
  },

  async getRoomBlocks(roomId: number) {
    return await apiClient.get<WeekendStudyRoomBlock[]>(
      `${WEEKEND_STUDY_BASE}/rooms/${roomId}/blocks`,
    );
  },

  async blockRoom(payload: { roomId: number } & BlockWeekendStudyRoomRequest) {
    const { roomId, ...body } = payload;
    return await apiClient.post(
      `${WEEKEND_STUDY_BASE}/rooms/${roomId}/blocks`,
      body,
    );
  },

  async unblockRoom(payload: { roomId: number; blockId: number }) {
    return await apiClient.delete(
      `${WEEKEND_STUDY_BASE}/rooms/${payload.roomId}/blocks/${payload.blockId}`,
    );
  },

  async getDeadline() {
    return await apiClient.get<WeekendStudyDeadline | null>(
      `${WEEKEND_STUDY_BASE}/deadline`,
    );
  },

  async updateDeadline(payload: WeekendStudyDeadline) {
    return await apiClient.patch(`${WEEKEND_STUDY_BASE}/deadline`, payload);
  },

  async checkAttendance(payload: CheckWeekendStudyAttendanceRequest) {
    const { userId, ...body } = payload;
    return await apiClient.patch(
      `${WEEKEND_STUDY_BASE}/attendance/${userId}`,
      body,
    );
  },

  async getAttendanceSummaries(params: WeekendStudyAttendanceSummaryParams) {
    const { startAt, endAt, page, size = 50 } = params;
    const qs = new URLSearchParams({
      startAt,
      endAt,
      page: String(page),
      size: String(size),
    });

    return await apiClient.get<PageResponse<WeekendStudyAttendanceSummary>>(
      `${WEEKEND_STUDY_BASE}/attendance?${qs.toString()}`,
    );
  },
};
