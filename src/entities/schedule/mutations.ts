import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@b1nd/dodam-design-system/components";
import type {ErrorResponse} from "@b1nd/api-client";
import {AddScheduleApi} from "@/entities/schedule/api.ts";

export const useAddScheduleMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: AddScheduleApi.addSchedule,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["schedule"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};
