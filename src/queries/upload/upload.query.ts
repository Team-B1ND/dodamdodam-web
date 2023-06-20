import { postUploadParam } from "@src/repository/upload/uploadRepository";
import uploadRepositoryImpl from "@src/repository/upload/uploadRepositoryImpl";
import { useMutation } from "react-query";

export const useUploadImageMutation = () => {
  const mutation = useMutation(({ formData }: postUploadParam) =>
    uploadRepositoryImpl.postUpload({ formData })
  );
  return mutation;
};
