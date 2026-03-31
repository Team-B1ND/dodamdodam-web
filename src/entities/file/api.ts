import type { UploadImageRequest, UploadedImage } from "@/entities/file/types";
import { apiClient } from "@/shared/libs/api-client";

const FILE_BASE = "/file";

export const FileApi = {
  async uploadImage({ file, allowType, width, height }: UploadImageRequest) {
    const formData = new FormData();
    formData.append("file", file);

    const searchParams = new URLSearchParams({
      allowType,
    });

    if (width !== undefined) {
      searchParams.set("width", String(width));
    }

    if (height !== undefined) {
      searchParams.set("height", String(height));
    }

    return await apiClient.post<UploadedImage>(
      `${FILE_BASE}/upload?${searchParams.toString()}`,
      formData,
    );
  },
};
