import type { FixProfileCompleteButtonState } from "@/features/fix-profile/types";

interface Params {
  hasChanges: boolean;
  isPending: boolean;
  isUploadPending: boolean;
  isRequestPhoneVerificationPending: boolean;
  isConfirmPhoneVerificationPending: boolean;
  isStudentProfilePending: boolean;
  isPhoneChanged: boolean;
  isPhoneVerified: boolean;
  verificationPhase: "idle" | "requested" | "verified";
}

export const getCompleteButtonState = ({
  hasChanges,
  isPending,
  isUploadPending,
  isRequestPhoneVerificationPending,
  isConfirmPhoneVerificationPending,
  isStudentProfilePending,
  isPhoneChanged,
  isPhoneVerified,
  verificationPhase,
}: Params): FixProfileCompleteButtonState => {
  if (isPending) {
    return { label: "수정 중..", disabled: true };
  }

  if (isUploadPending) {
    return { label: "완료", disabled: true };
  }

  if (isRequestPhoneVerificationPending) {
    return { label: "전송 중..", disabled: true };
  }

  if (isConfirmPhoneVerificationPending) {
    return { label: "확인 중..", disabled: true };
  }

  if (isStudentProfilePending) {
    return { label: "수정 중..", disabled: true };
  }

  if (!hasChanges) {
    return { label: "완료", disabled: true };
  }

  if (!isPhoneChanged || isPhoneVerified) {
    return { label: "완료", disabled: false };
  }

  if (verificationPhase === "idle") {
    return { label: "인증번호 전송", disabled: false };
  }

  return { label: "인증 확인", disabled: false };
};
