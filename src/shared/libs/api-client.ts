import { createApiClient } from "@b1nd/api-client";
import { redirectToLogin } from "@/shared/utils/redirect-to-login";

const createClient = (): ReturnType<typeof createApiClient> => {
  const client = createApiClient(import.meta.env.VITE_API_URL!, {
    onRefreshFailed: () => {
      // A previous session's response must not discard a newer login.
      if (client !== apiClient) return;
      resetApiClient();
      redirectToLogin();
    },
  });
  return client;
};

export let apiClient = createClient();

export const resetApiClient = () => {
  apiClient = createClient();
};
