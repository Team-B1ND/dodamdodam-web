import { FileApi } from "@/entities/file/api";
import type { ErrorResponse } from "@b1nd/api-client";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: FileApi.uploadImage,
    onError: (e: ErrorResponse) => {
      toast.error(e.message);
    },
  });
};
