import { createApiClient } from "@b1nd/api-client";
import { redirectToLogin } from "@/shared/utils/redirect-to-login";

export const apiClient = createApiClient(import.meta.env.VITE_API_URL!, {
  onRefreshFailed: redirectToLogin,
});
