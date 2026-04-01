import { BannerApi } from "@/entities/banner/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: BannerApi.createBanner,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["banner"] });
      toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};

