import { FilledButton, TextField } from "@b1nd/dodam-design-system/components";

interface Props {
  verificationCode: string;
  verificationTimerText: string;
  hasActiveVerification: boolean;
  isRequestPhoneVerificationPending: boolean;
  onChangeVerificationCode: (value: string) => void;
  onRequestVerificationCode: () => void;
}

const PhoneVerificationSection = ({
  verificationCode,
  verificationTimerText,
  hasActiveVerification,
  isRequestPhoneVerificationPending,
  onChangeVerificationCode,
  onRequestVerificationCode,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        type="text"
        label="인증번호"
        required
        value={verificationCode}
        onChange={(e) => onChangeVerificationCode(e.target.value)}
      />
      <FilledButton
        role="assistive"
        onClick={onRequestVerificationCode}
        disabled={isRequestPhoneVerificationPending || hasActiveVerification}
      >
        {isRequestPhoneVerificationPending
          ? "전송 중.."
          : hasActiveVerification
            ? `${verificationTimerText} 후 재전송 가능`
            : "재전송"}
      </FilledButton>
    </div>
  );
};

export default PhoneVerificationSection;
