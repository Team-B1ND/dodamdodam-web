import { TeamApi } from "@/entities/team/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation } from "@tanstack/react-query";

export const useCreateTeamMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.createTeam,
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

export const useInviteTeamMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.inviteTeam,
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};
