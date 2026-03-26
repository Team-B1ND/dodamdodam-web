import { OutSleepingApi } from "@/entities/out-sleeping/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApplyOutSleepingMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: OutSleepingApi.createOutSleeping,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["out-sleeping", "my"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useDeleteOutSleepingMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: OutSleepingApi.deleteMyOutSleeping,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["out-sleeping", "my"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
}