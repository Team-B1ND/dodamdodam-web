import type { ErrorResponse } from "@b1nd/api-client";
import { usePhoneVerification } from "@/shared/hooks/usePhoneVerification";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { FilledButton, TextField } from "@b1nd/dodam-design-system/components";

interface Props {
  phaseController: (type: "up" | "down") => void;
  phone: string;
  phoneHandler: (phone: string) => void;
  submit: () => Promise<void>;
  isSubmitPending: boolean;
}

const RegisterPhoneInfo = ({
  phone,
  phoneHandler,
  phaseController,
  submit,
  isSubmitPending,
}: Props) => {
  const {
    phone: verificationPhone,
    setPhone,
    resetVerification,
    verificationCode,
    setVerificationCode,
    verificationPhase,
    hasActiveVerification,
    verificationTimerText,
    requestVerificationCode,
    confirmVerificationCode,
    isRequestPhoneVerificationPending,
    isConfirmPhoneVerificationPending,
  } = usePhoneVerification(phone, { requireChangedPhone: false });

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    phoneHandler(value);
  };

  const handleComplete = async () => {
    if (verificationPhase === "idle") {
      await requestVerificationCode();
      return;
    }

    try {
      if (verificationPhase === "requested") {
        await confirmVerificationCode();
      }

      await submit();
    } catch (error) {
      const registerError = error as ErrorResponse;

      if (registerError.status === 409) {
        resetVerification();
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <TextField
        label="전화번호"
        type="text"
        value={formatPhoneNumber(verificationPhone)}
        onChange={(e) => handlePhoneChange(e.target.value.replaceAll("-", ""))}
      />

      {verificationPhase === "requested" && (
        <div className="flex flex-col gap-4">
          <TextField
            label="인증번호"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <FilledButton
            role="assistive"
            onClick={requestVerificationCode}
            disabled={isRequestPhoneVerificationPending || hasActiveVerification}
          >
            {isRequestPhoneVerificationPending
              ? "전송 중.."
              : hasActiveVerification
                ? `${verificationTimerText} 후 재전송 가능`
                : "재전송"}
          </FilledButton>
        </div>
      )}

      <div className="grid grid-cols-2 w-full gap-3">
        <FilledButton role="assistive" onClick={() => phaseController("down")}>
          이전으로
        </FilledButton>
        <FilledButton
          onClick={handleComplete}
          disabled={
            isRequestPhoneVerificationPending ||
            isConfirmPhoneVerificationPending ||
            isSubmitPending
          }
        >
          {isRequestPhoneVerificationPending
            ? "전송 중.."
            : isConfirmPhoneVerificationPending
              ? "인증 중.."
              : isSubmitPending
                ? "가입 중.."
                : verificationPhase === "idle"
                  ? "인증번호 전송"
                  : "인증 완료"}
        </FilledButton>
      </div>
    </div>
  );
};

export default RegisterPhoneInfo;
