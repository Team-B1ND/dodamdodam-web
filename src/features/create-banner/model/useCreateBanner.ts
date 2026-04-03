import { useCreateBannerMutation } from "@/entities/banner/mutations";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { useToast } from "@b1nd/dodam-design-system/components";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

export const useCreateBanner = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { mutateAsync, isPending } = useCreateBannerMutation();
  const { uploadImage, isPending: isUploadPending } = useImageUpload();

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const changeBannerImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const uploadedImage = await uploadImage(file, {
      allowType: "IMAGE",
    });

    setImageUrl(uploadedImage.url);
    e.target.value = "";
  };

  const submit = async () => {
    if (!imageUrl || !linkUrl.trim()) {
      toast.warning("배너 이미지와 링크를 모두 입력해주세요.");
      return;
    }

    await mutateAsync({
      imageUrl,
      linkUrl: linkUrl.trim(),
    });

    setImageUrl("");
    setLinkUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    imageUrl,
    linkUrl,
    fileInputRef,
    setLinkUrl,
    openImagePicker,
    changeBannerImage,
    submit,
    isPending,
    isUploadPending,
  };
};
