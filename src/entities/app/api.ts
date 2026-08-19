import type {
  App,
  AppDetail,
  DenyAppReleaseRequest,
} from "@/entities/app/types";
import { apiClient } from "@/shared/libs/api-client";
import type { PageResponse } from "@b1nd/api-client";

const APP_BASE = "/inapp/app";

export const AppApi = {
  async getApps({ page, size = 10 }: { page: number; size?: number }) {
    const query = new URLSearchParams({
      page: String(page),
      size: String(size),
    });

    return await apiClient.get<PageResponse<App>>(
      `${APP_BASE}?${query.toString()}`,
    );
  },

  async getAppDetail(appId: string) {
    return await apiClient.get<AppDetail>(
      `${APP_BASE}/${encodeURIComponent(appId)}`,
    );
  },

  async allowRelease(releaseId: string) {
    return await apiClient.patch(`${APP_BASE}/release/status`, {
      releaseId,
      status: "ALLOWED",
    });
  },

  async denyRelease(payload: DenyAppReleaseRequest) {
    return await apiClient.patch(`${APP_BASE}/release/deny`, payload);
  },

  async updateAppVisibility({
    appId,
    visible,
  }: {
    appId: string;
    visible: boolean;
  }) {
    const action = visible ? "show" : "hide";
    return await apiClient.patch(
      `${APP_BASE}/${encodeURIComponent(appId)}/${action}`,
    );
  },

  async deleteApp(appId: string) {
    return await apiClient.delete(`${APP_BASE}/${encodeURIComponent(appId)}`);
  },
};
