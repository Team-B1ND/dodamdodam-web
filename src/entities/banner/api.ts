import type { Banner, CreateBanner } from "@/entities/banner/types";
import { apiClient } from "@/shared/libs/api-client";

const BANNER_BASE = "/file/banner";

export const BannerApi = {
  async getBanner() {
    return await apiClient.get<Banner[]>(`${BANNER_BASE}`);
  },

  async createBanner(payload: CreateBanner) {
    return await apiClient.post(`${BANNER_BASE}`, payload)
  }
}