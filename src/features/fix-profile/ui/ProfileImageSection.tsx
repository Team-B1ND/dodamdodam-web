import { colors } from "@b1nd/dodam-design-system/colors";
import { Avatar } from "@b1nd/dodam-design-system/components";
import { Plus } from "@b1nd/dodam-design-system/icons";
import type { ProfileImageSectionProps } from "@/features/fix-profile/types";

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
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <Avatar size={128} />
        )}
        <button
          type="button"
          aria-label="프로필 이미지 변경"
          className="absolute right-0 bottom-0 flex h-9 w-9 items-center cursor-pointer justify-center rounded-full bg-brand-primary text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isUploadPending}
          onClick={onOpenProfileImagePicker}
        >
          <Plus color={colors.static.white} pointer size={20}/>
        </button>
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
