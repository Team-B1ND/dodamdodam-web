import { createApiClient } from "@b1nd/api-client";
import { env } from "@src/shared/server/env";

export const apiClient = createApiClient(env.API_URL!);
