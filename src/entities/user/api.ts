import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";
import type { LoginRequest, User } from "./types";

export const UserApi = {
  async login(payload: LoginRequest) {
    return await apiClient.post("/auth/login", payload);
  },

  async searchStudents(params: { keyword: string; page: number }) {
    return await apiClient.get<PageResponse<User>>(
      `/user/search?roles=STUDENT&page=${params.page}&size=10${params.keyword ? `&keyword=${params.keyword}` : ""}`,
    );
  },
};
