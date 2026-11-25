import { colors } from "@b1nd/dodam-design-system/colors";
import { IconButton } from "@b1nd/dodam-design-system/components";
import { Plus } from "@b1nd/dodam-design-system/icons";
import type { ProfileImageSectionProps } from "@/features/fix-profile/types";
import ProfileImage from "@/shared/ui/profile-image";

/** 프로필 사진 오른쪽 아래에 겹치는 원형 브랜드 버튼이에요. DS IconButton의 회색 hover를 브랜드색으로 덮어요. */
const PLUS_BUTTON_STYLE = {
  position: "absolute" as const,
  right: 0,
  bottom: 0,
  borderRadius: "50%",
  backgroundColor: colors.brand.primary,
  "&:hover": { backgroundColor: colors.brand.primary },
};

const ProfileImageSection = ({
  profileImage,
  fileInputRef,
  onChangeProfileImage,
  onOpenProfileImagePicker,
  onResetProfileImage,
  isUploadPending,
}: ProfileImageSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32">
        <ProfileImage
          src={profileImage}
          alt="프로필 이미지"
          className="h-32 w-32 rounded-full object-cover"
          size={128}
        />
        <IconButton
          icon={<Plus color={colors.static.white} />}
          size={36}
          iconSize={20}
          disabled={isUploadPending}
          onClick={onOpenProfileImagePicker}
          customStyle={PLUS_BUTTON_STYLE}
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChangeProfileImage}
      />
      <p
        className="text-caption1 text-text-tertiary font-bold cursor-pointer"
        onClick={onResetProfileImage}
      >
        기본 프로필로 변경
      </p>
    </div>
  );
};

export default ProfileImageSection;
