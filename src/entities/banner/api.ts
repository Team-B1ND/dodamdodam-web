import type { Banner, CreateBanner, PatchBannerStatus } from "@/entities/banner/types";
import { apiClient } from "@/shared/libs/api-client";

const BANNER_BASE = "/file/banner";

export const BannerApi = {
  async getBanner() {
    return await apiClient.get<Banner[]>(`${BANNER_BASE}`);
  },

  async createBanner(payload: CreateBanner) {
    return await apiClient.post(`${BANNER_BASE}`, payload)
  },

  async patchBannerStatus({
    id,
    active
  }: PatchBannerStatus) {
    return await apiClient.patch(`${BANNER_BASE}/${id}/active?active=${active.toString()}`);
  },
}