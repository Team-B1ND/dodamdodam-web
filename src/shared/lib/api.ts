import { createApiClient } from "@b1nd/api-client";

export const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL!);
