import { AppApi } from "@/entities/app/api";
import { APP_QUERY_KEY } from "@/entities/app/constants";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAllowAppReleaseMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: AppApi.allowRelease,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: APP_QUERY_KEY });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

export const useDenyAppReleaseMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: AppApi.denyRelease,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: APP_QUERY_KEY });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateAppVisibilityMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: AppApi.updateAppVisibility,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: APP_QUERY_KEY });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAppMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: AppApi.deleteApp,
    onSuccess: async (response) => {
      await queryClient.refetchQueries({ queryKey: APP_QUERY_KEY });
      toast.success(response.message);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });
};
