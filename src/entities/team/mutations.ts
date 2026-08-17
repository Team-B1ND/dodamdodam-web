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

export const useDeleteTeamMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.deleteTeam,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateTeamMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.updateTeam,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

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

export const useAcceptTeamInvitationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.acceptInvitation,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

export const useRejectTeamInvitationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.rejectInvitation,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};
