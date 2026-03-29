import type { UploadImageRequest } from "@/entities/file/types";
import { useUploadImageMutation } from "@/entities/file/mutations";

type UploadImageOptions = Omit<UploadImageRequest, "file">;

export const useImageUpload = () => {
  const { mutateAsync, isPending } = useUploadImageMutation();

  const uploadImage = async (file: File, options: UploadImageOptions) => {
    const response = await mutateAsync({
      file,
      ...options,
    });

    return response.data;
  };

  return {
    uploadImage,
    isPending,
  };
};
