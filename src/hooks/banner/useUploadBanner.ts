import { B1ndToast } from "@b1nd/b1nd-toastify";
import { useUploadBannerMutation } from "@src/queries/banner/banner.query";
import { useUploadImageMutation } from "@src/queries/upload/upload.query";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";

const useUplodaBanner = () => {
  const queryClient = useQueryClient();
  const uploadBannerMutation = useUploadBannerMutation();
  const [fileName, setFileName] = useState<File>();
  const uploadMutation = useUploadImageMutation();
  const [uploadData, setUploadData] = useState({
    expireDateTime: "",
    image: "",
    title: "",
    url: "",
  });

  const onChangeImage = (event: ChangeEvent<HTMLInputElement> | any) => {
    let image: File;
    image = event.target.files[0];
    setFileName(image);

    const formData = new FormData();
    formData.append("file", image);

    uploadMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          setUploadData((prev) => ({ ...prev, image: data.data }));
        },
      }
    );
  };

  const onChangeUploadData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitUploadData = () => {
    const { expireDateTime, image, title, url } = uploadData;
    uploadBannerMutation.mutate(
      {
        expireDateTime,
        image,
        title,
        url,
      },
      {
        onSuccess: () => {
          B1ndToast.showSuccess("배너가 등록되었습니다");
          queryClient.invalidateQueries("");
        },
        onError: () => {
          B1ndToast.showError("배너 등록 실패");
        },
      }
    );
  };

  return {
    fileName,
    uploadData,
    onSubmitUploadData,
    onChangeUploadData,
    onChangeImage,
  };
};

export default useUplodaBanner;
