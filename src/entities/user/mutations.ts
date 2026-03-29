import { UserApi } from "@/entities/user/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation, useQueryClient } from "@tanstack/react-query"

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

export const useFixProfileMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.fixProfile,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["user", "my"] })
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useRequestPhoneVerificationMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.requestPhoneVerification,
    onSuccess: async (res) => {
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

export const useConfirmPhoneVerificationMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: UserApi.confirmPhoneVerification,
    onSuccess: async (res) => {
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};
