import type { Banner } from "@/entities/banner/types";
import { apiClient } from "@/shared/libs/api-client";

const BANNER_BASE = "/file/banner";

export const BannerApi = {
  async getBanner() {
    return await apiClient.get<Banner[]>(`${BANNER_BASE}`);
  },
}