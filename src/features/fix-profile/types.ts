import type { RefObject } from "react";

export interface FixProfileSubmitParams {
  phone: string;
  originalPhone: string;
  isPhoneChanged: boolean;
  isPhoneVerified: boolean;
}

export interface FixProfileCompleteButtonState {
  label: string;
  disabled: boolean;
}

export type PhoneVerificationPhase = "idle" | "requested" | "verified";

export interface ProfileImageSectionProps {
  profileImage: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChangeProfileImage: React.ChangeEventHandler<HTMLInputElement>;
  onOpenProfileImagePicker: () => void;
  onResetProfileImage: () => void;
  isUploadPending: boolean;
}

export interface PhoneVerificationSectionProps {
  verificationCode: string;
  verificationTimerText: string;
  hasActiveVerification: boolean;
  isRequestPhoneVerificationPending: boolean;
  onChangeVerificationCode: (value: string) => void;
  onRequestVerificationCode: () => void;
}

export interface FixProfileActionsProps {
  onClose: () => void;
  onComplete: () => void;
  completeButtonText: string;
  isCompleteDisabled: boolean;
}
