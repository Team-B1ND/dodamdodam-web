import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";
import type { FixPassword, User } from "./types";

const USER_BASE = "/user"

export const UserApi = {
  async searchStudents(params: { keyword: string; page: number }) {
    return await apiClient.get<PageResponse<User>>(
      `${USER_BASE}/search?roles=STUDENT&page=${params.page}&size=10${params.keyword ? `&keyword=${params.keyword}` : ""}`,
    );
  },

  async getMe() {
    return await apiClient.get<User>(`${USER_BASE}/me`);
  },
  
  async fixPassword(payload: FixPassword) {
    return await apiClient.patch(`${USER_BASE}/change-password`, payload);
  }
};
