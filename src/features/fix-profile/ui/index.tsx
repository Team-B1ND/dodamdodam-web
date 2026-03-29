import FixProfileActions from "@/features/fix-profile/ui/FixProfileActions";
import PhoneVerificationSection from "@/features/fix-profile/ui/PhoneVerificationSection";
import ProfileImageSection from "@/features/fix-profile/ui/ProfileImageSection";
import { useFixProfile } from "@/features/fix-profile/model/useFixProfile";
import { usePhoneVerification } from "@/features/fix-profile/model/usePhoneVerification";
import { useGetMe } from "@/features/get-user/model/useGetMe";
import { normalizePhoneNumber } from "@/features/fix-profile/utils/normalize-phone-number";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { TextField } from "@b1nd/dodam-design-system/components";

interface Props {
  onClose: () => void;
}

const FixProfileModal = ({
  onClose,
}: Props) => {
  const { data } = useGetMe();
  const {
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
  } = useFixProfile();
  const {
    phone,
    setPhone,
    originalPhone,
    verificationCode,
    setVerificationCode,
    isPhoneChanged,
    isPhoneVerified,
    hasRequestedVerification,
    hasActiveVerification,
    verificationTimerText,
    requestVerificationCode,
    confirmVerificationCode,
    isRequestPhoneVerificationPending,
    isConfirmPhoneVerificationPending,
  } = usePhoneVerification(data.phone ?? "");
  const hasChanges =
    name.trim() !== data.name ||
    normalizePhoneNumber(phone) !== originalPhone ||
    (profileImage ?? "") !== (data.profileImage ?? "");

  const handleComplete = async () => {
    if (!isPhoneChanged || isPhoneVerified) {
      await submit({
        phone,
        originalPhone,
        isPhoneChanged,
        isPhoneVerified,
      });
      return;
    }

    if (!hasRequestedVerification) {
      await requestVerificationCode();
      return;
    }

    await confirmVerificationCode();
  };

  const completeButtonText = (() => {
    if (isPending) {
      return "수정 중..";
    }

    if (isRequestPhoneVerificationPending) {
      return "전송 중..";
    }

    if (isConfirmPhoneVerificationPending) {
      return "확인 중..";
    }

    if (!isPhoneChanged || isPhoneVerified) {
      return "완료";
    }

    if (!hasRequestedVerification) {
      return "인증번호 전송";
    }

    return "인증 확인";
  })();

  return (
    <div className="small-container flex flex-col gap-5 w-100">
      <p className="text-heading2 font-bold text-text-primary">프로필 수정</p>
      <ProfileImageSection
        profileImage={profileImage}
        fileInputRef={fileInputRef}
        onChangeProfileImage={changeProfileImage}
        onOpenProfileImagePicker={openProfileImagePicker}
        onResetProfileImage={resetProfileImage}
        isUploadPending={isUploadPending}
      />
      <div className="flex flex-col gap-5">
        <TextField
          type="text"
          label="이름"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          label="전화번호"
          required
          value={formatPhoneNumber(phone)}
          onChange={(e) => setPhone(e.target.value)}
        />
        {isPhoneChanged && hasRequestedVerification && !isPhoneVerified && (
          <PhoneVerificationSection
            verificationCode={verificationCode}
            verificationTimerText={verificationTimerText}
            hasActiveVerification={hasActiveVerification}
            isRequestPhoneVerificationPending={isRequestPhoneVerificationPending}
            onChangeVerificationCode={setVerificationCode}
            onRequestVerificationCode={requestVerificationCode}
          />
        )}
      </div>
      <FixProfileActions
        onClose={onClose}
        onComplete={handleComplete}
        completeButtonText={completeButtonText}
        isCompleteDisabled={
          !hasChanges ||
          isPending ||
          isUploadPending ||
          isRequestPhoneVerificationPending ||
          isConfirmPhoneVerificationPending
        }
      />
    </div>
  );
};

export default FixProfileModal;
