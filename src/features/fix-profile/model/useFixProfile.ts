import { useFixProfileMutation } from "@/entities/user/mutations";
import { useGetMe } from "@/features/get-user/model/useGetMe";
import { normalizePhoneNumber } from "@/features/fix-profile/utils/normalize-phone-number";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { useToast } from "@b1nd/dodam-design-system/components";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

export const useFixProfile = () => {
  const { data } = useGetMe();
  const [name, setName] = useState(data.name ?? "");
  const [profileImage, setProfileImage] = useState(data.profileImage ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const { mutateAsync, isPending } = useFixProfileMutation();
  const { uploadImage, isPending: isUploadPending } = useImageUpload();
  const unchangedProfileImage = data.profileImage ?? null;

  const validate = (phone: string, isPhoneChanged: boolean, isPhoneVerified: boolean) => {
    const errorMessage: string[] = [];
    const normalizedName = name.trim();
    const normalizedPhone = normalizePhoneNumber(phone);

    if (normalizedName.length === 0 && phone.length === 0) {
      errorMessage.push("필수 입력 필드를 모두 채워주세요.");
    } else if (normalizedPhone.length !== 11) {
      errorMessage.push("전화번호를 정확히 입력해주세요.");
    }

    if (isPhoneChanged && !isPhoneVerified) {
      errorMessage.push("변경한 전화번호 인증을 완료해주세요.");
    }

    return errorMessage;
  };

  const changeProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const uploadedImage = await uploadImage(file, {
      allowType: "IMAGE",
    });

    setProfileImage(uploadedImage.url);
    e.target.value = "";
  };

  const openProfileImagePicker = () => {
    fileInputRef.current?.click();
  };

  const resetProfileImage = () => {
    setProfileImage("");
  };

  const submit = async (params: {
    phone: string;
    originalPhone: string;
    isPhoneChanged: boolean;
    isPhoneVerified: boolean;
  }) => {
    const errorMessages = validate(
      params.phone,
      params.isPhoneChanged,
      params.isPhoneVerified,
    );

    if (errorMessages.length > 0) {
      toast.warning(errorMessages.join(" 또한 "));
      return;
    }

    const normalizedName = name.trim();
    const normalizedPhone = normalizePhoneNumber(params.phone);

    // 변경사항이 없다면 null 보내기
    await mutateAsync({
      name: normalizedName === data.name ? null : normalizedName,
      phone: normalizedPhone === params.originalPhone ? null : normalizedPhone,
      profileImage: profileImage === unchangedProfileImage ? null : profileImage,
    });
  };

  return {
    name,
    setName,
    profileImage,
    fileInputRef,
    openProfileImagePicker,
    changeProfileImage,
    resetProfileImage,
    submit,
    isPending,
    isUploadPending,
  };
};
