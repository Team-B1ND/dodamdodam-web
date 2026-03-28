import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NightStudyApi } from "./api";
import { useToast } from "@b1nd/dodam-design-system/components";
import type { ErrorResponse } from "@b1nd/api-client";

const APPLICATIONS_KEY = ["nightstudy", "applications"];

export const useApplyProjectNightStudyMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.createProjectNightStudy,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["my", "project"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useApplyPersonalNightStudyMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.createPersonalNightStudy,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["my", "personal"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useDeleteNightStudyMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.deleteNightStudy,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["my", "personal"] });
      await queryClient.refetchQueries({ queryKey: ["my", "project"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useAllowApplicationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.allowApplication,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: APPLICATIONS_KEY });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useRejectApplicationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.rejectApplication,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: APPLICATIONS_KEY });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const usePendingApplicationMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.pendingApplication,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: APPLICATIONS_KEY });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useAssignRoomMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.assignRoom,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: APPLICATIONS_KEY });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useCreateBanMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.createBan,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["nightstudy", "bans"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useDeleteBanMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: NightStudyApi.deleteBan,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["nightstudy", "bans"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};
