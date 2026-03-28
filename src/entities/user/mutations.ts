import { UserApi } from "@/entities/user/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation } from "@tanstack/react-query"

export const useFixPasswordMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.fixPassword,
    onSuccess: async (res) => toast.success(res.message),
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    }
  })
}