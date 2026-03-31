import { apiClient } from "@/shared/libs/api-client"

export const logout = async () => {
  return await apiClient.post(`/auth/logout`);
}