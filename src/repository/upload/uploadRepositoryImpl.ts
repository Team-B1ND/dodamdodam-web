import { UploadResponse } from "@src/types/upload/upload.type";
import { postUploadParam, uploadRepository } from "./uploadRepository";
import { dodamV6Axios } from "@src/lib/axios/customAxios";

class UploadRepositoryImpl implements uploadRepository {
  public async postUpload({
    formData,
  }: postUploadParam): Promise<UploadResponse> {
    const { data } = await dodamV6Axios.post("/upload", formData);
    return data;
  }
}

export default new UploadRepositoryImpl();
