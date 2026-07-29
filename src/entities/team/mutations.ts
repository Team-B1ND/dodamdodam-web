import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamApi } from "./api";

export const useLeaveTeamMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.leaveTeam,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};
