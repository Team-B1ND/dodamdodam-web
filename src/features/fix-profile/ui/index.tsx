import { getCompleteButtonState } from "@/features/fix-profile/lib/get-complete-button-state";
import FixProfileActions from "@/features/fix-profile/ui/FixProfileActions";
import PhoneVerificationSection from "@/features/fix-profile/ui/PhoneVerificationSection";
import ProfileImageSection from "@/features/fix-profile/ui/ProfileImageSection";
import StudentProfileSection from "@/features/fix-profile/ui/StudentProfileSection";
import TeacherProfileSection from "@/features/fix-profile/ui/TeacherProfileSection";
import { useFixProfile } from "@/features/fix-profile/model/useFixProfile";
import { useFixStudentProfile } from "@/features/fix-profile/model/useFixStudentProfile";
import { useFixTeacherProfile } from "@/features/fix-profile/model/useFixTeacherProfile";
import { useGetMe } from "@/features/get-user/model/useGetMe";
import { usePhoneVerification } from "@/shared/hooks/usePhoneVerification";
import { normalizePhoneNumber } from "@/shared/utils/normalize-phone-number";
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
    hasChanges: hasProfileChanges,
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
    verificationPhase,
    hasActiveVerification,
    verificationTimerText,
    requestVerificationCode,
    confirmVerificationCode,
    isRequestPhoneVerificationPending,
    isConfirmPhoneVerificationPending,
  } = usePhoneVerification(data.phone ?? "");
  const {
    isStudent,
    grade,
    room,
    number,
    setGrade,
    setRoom,
    setNumber,
    hasChanges: hasStudentChanges,
    submit: submitStudentProfile,
    isPending: isStudentProfilePending,
  } = useFixStudentProfile(data);
  const {
    isTeacher,
    position,
    setPosition,
    hasChanges: hasTeacherChanges,
    submit: submitTeacherProfile,
    isPending: isTeacherProfilePending,
  } = useFixTeacherProfile(data);
  const hasChanges =
    hasProfileChanges ||
    normalizePhoneNumber(phone) !== originalPhone ||
    hasStudentChanges ||
    hasTeacherChanges;
  const completeButtonState = getCompleteButtonState({
    hasChanges,
    isPending,
    isUploadPending,
    isRequestPhoneVerificationPending,
    isConfirmPhoneVerificationPending,
    isStudentProfilePending,
    isTeacherProfilePending,
    isPhoneChanged,
    isPhoneVerified,
    verificationPhase,
  });

  const handleComplete = async () => {
    if (!isPhoneChanged || isPhoneVerified) {
      const isProfileSubmitted = await submit({
        phone,
        originalPhone,
        isPhoneChanged,
        isPhoneVerified,
      });

      if (isProfileSubmitted === false) {
        return;
      }

      await submitStudentProfile();
      await submitTeacherProfile();
      return;
    }

    if (verificationPhase === "idle") {
      await requestVerificationCode();
      return;
    }

    await confirmVerificationCode();
  };

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
        {isStudent && (
          <StudentProfileSection
            grade={grade}
            room={room}
            number={number}
            onChangeGrade={setGrade}
            onChangeRoom={setRoom}
            onChangeNumber={setNumber}
          />
        )}
        {isTeacher && (
          <TeacherProfileSection
            position={position}
            onChangePosition={setPosition}
          />
        )}
        {isPhoneChanged && verificationPhase === "requested" && !isPhoneVerified && (
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
        completeButtonText={completeButtonState.label}
        isCompleteDisabled={completeButtonState.disabled}
      />
    </div>
  );
};

export default FixProfileModal;
