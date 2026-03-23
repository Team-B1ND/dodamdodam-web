import { createApiClient } from "@cher1shrxd/api-client";

export const apiClient = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});
