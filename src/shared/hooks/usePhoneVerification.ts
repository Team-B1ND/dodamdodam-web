import type { PhoneVerificationPhase } from "@/features/fix-profile/types";
import {
  useConfirmPhoneVerificationMutation,
  useRequestPhoneVerificationMutation,
} from "@/entities/user/mutations";
import { formatRemainingTime } from "@/shared/utils/format-remaining-time";
import { normalizePhoneNumber } from "@/shared/utils/normalize-phone-number";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useEffect, useState } from "react";

const PHONE_VERIFICATION_TIMEOUT = 2 * 60;

interface UsePhoneVerificationOptions {
  requireChangedPhone?: boolean;
}

export const usePhoneVerification = (
  initialPhone: string,
  options?: UsePhoneVerificationOptions,
) => {
  const [phone, setPhoneState] = useState(initialPhone);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationPhase, setVerificationPhase] = useState<PhoneVerificationPhase>("idle");
  const [verificationDeadline, setVerificationDeadline] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const toast = useToast();

  const { mutateAsync: requestPhoneVerification, isPending: isRequestPhoneVerificationPending } =
    useRequestPhoneVerificationMutation();
  const { mutateAsync: confirmPhoneVerification, isPending: isConfirmPhoneVerificationPending } =
    useConfirmPhoneVerificationMutation();

  const originalPhone = normalizePhoneNumber(initialPhone);
  const normalizedPhone = normalizePhoneNumber(phone);
  const isPhoneChanged = normalizedPhone !== originalPhone;
  const isPhoneVerified = verificationPhase === "verified";
  const requireChangedPhone = options?.requireChangedPhone ?? true;
  const isVerificationExpired =
    verificationDeadline !== null ? verificationDeadline <= currentTime : false;
  const remainingVerificationSeconds =
    verificationDeadline !== null
      ? Math.max(0, Math.ceil((verificationDeadline - currentTime) / 1000))
      : 0;
  const hasActiveVerification =
    verificationDeadline !== null && !isVerificationExpired && !isPhoneVerified;

  useEffect(() => {
    if (!verificationDeadline) {
      return;
    }

    const timer = window.setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      if (verificationDeadline <= now) {
        setVerificationDeadline(null);
        setVerificationCode("");
        window.clearInterval(timer);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [verificationDeadline]);

  const setPhone = (value: string) => {
    setPhoneState(value);
    resetVerification();
  };

  const resetVerification = () => {
    setVerificationPhase("idle");
    setVerificationCode("");
    setVerificationDeadline(null);
  };

  const requestVerificationCode = async () => {
    if (normalizedPhone.length !== 11) {
      toast.warning("전화번호를 정확히 입력해주세요.");
      return;
    }

    if (requireChangedPhone && !isPhoneChanged) {
      toast.warning("기존 전화번호와 동일합니다.");
      return;
    }

    if (verificationDeadline && !isVerificationExpired) {
      toast.warning("인증번호 만료 후 다시 요청해주세요.");
      return;
    }

    await requestPhoneVerification({
      phone: normalizedPhone,
    });

    const nextDeadline = Date.now() + PHONE_VERIFICATION_TIMEOUT * 1000;

    setCurrentTime(Date.now());
    setVerificationPhase("requested");
    setVerificationCode("");
    setVerificationDeadline(nextDeadline);
  };

  const confirmVerificationCode = async () => {
    if (!verificationDeadline || isVerificationExpired) {
      toast.warning("인증번호가 만료되었습니다. 다시 요청해주세요.");
      return;
    }

    if (verificationCode.trim().length === 0) {
      toast.warning("인증번호를 입력해주세요.");
      return;
    }

    await confirmPhoneVerification({
      phone: normalizedPhone,
      code: verificationCode.trim(),
    });

    setVerificationPhase("verified");
    setVerificationDeadline(null);
  };

  return {
    phone,
    setPhone,
    resetVerification,
    originalPhone,
    normalizedPhone,
    verificationCode,
    setVerificationCode,
    verificationPhase,
    isPhoneChanged,
    isPhoneVerified,
    hasActiveVerification,
    verificationTimerText: formatRemainingTime(remainingVerificationSeconds),
    requestVerificationCode,
    confirmVerificationCode,
    isRequestPhoneVerificationPending,
    isConfirmPhoneVerificationPending,
  };
};
