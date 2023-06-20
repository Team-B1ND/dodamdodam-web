import { UploadResponse } from "../../types/upload/upload.type";

export interface uploadRepository {
  postUpload({ formData }: postUploadParam): Promise<UploadResponse>;
}

export interface postUploadParam {
  formData: FormData;
}
