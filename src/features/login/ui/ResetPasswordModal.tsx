import { useResetPasswordMutation } from "@/entities/user/mutations";
import { usePhoneVerification } from "@/shared/hooks/usePhoneVerification";
import { isValidPassword } from "@/shared/utils/validate-password";
import { FilledButton, TextField, useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

const ResetPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const toast = useToast();
  const { mutate, isPending } = useResetPasswordMutation();
  const {
    phone, setPhone, normalizedPhone, verificationCode, setVerificationCode,
    verificationPhase, isPhoneVerified, hasActiveVerification, verificationTimerText,
    requestVerificationCode, confirmVerificationCode,
    isRequestPhoneVerificationPending, isConfirmPhoneVerificationPending,
  } = usePhoneVerification("", { requireChangedPhone: false });

  const submit = () => {
    if (!isPhoneVerified || isPending) return;
    if (newPassword.length < 6 || !isValidPassword(newPassword)) {
      toast.warning("비밀번호는 영문, 숫자, 특수문자로 6자 이상 입력해주세요.");
      return;
    }
    if (newPassword !== confirmation) {
      toast.warning("새 비밀번호가 일치하지 않아요.");
      return;
    }
    mutate({ phone: normalizedPhone, newPassword }, { onSuccess: onClose });
  };

  return (
    <div className="small-container flex flex-col gap-5 w-100 max-w-full">
      <p className="text-heading2 font-bold text-text-primary">비밀번호 재설정</p>
      <TextField label="전화번호" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isPhoneVerified || isRequestPhoneVerificationPending || isConfirmPhoneVerificationPending} />
      {!isPhoneVerified && (
        <FilledButton role="assistive" onClick={() => { void requestVerificationCode().catch(() => {}); }} disabled={isRequestPhoneVerificationPending || isConfirmPhoneVerificationPending || hasActiveVerification}>
          {isRequestPhoneVerificationPending ? "전송 중.." : hasActiveVerification ? `${verificationTimerText} 후 재전송 가능` : "인증번호 전송"}
        </FilledButton>
      )}
      {verificationPhase === "requested" && (
        <>
          <TextField label="인증번호" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          <FilledButton role="assistive" onClick={() => { void confirmVerificationCode().catch(() => {}); }} disabled={isConfirmPhoneVerificationPending || isRequestPhoneVerificationPending}>
            {isConfirmPhoneVerificationPending ? "인증 중.." : "인증 확인"}
          </FilledButton>
        </>
      )}
      {isPhoneVerified && (
        <>
          <TextField label="새 비밀번호" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <TextField label="새 비밀번호 확인" type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
        </>
      )}
      <div className="grid grid-cols-2 gap-3">
        <FilledButton role="assistive" onClick={onClose}>취소</FilledButton>
        <FilledButton onClick={submit} disabled={!isPhoneVerified || isPending}>{isPending ? "변경 중.." : "재설정"}</FilledButton>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
