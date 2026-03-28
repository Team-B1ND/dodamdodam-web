import useFixPassword from "@/features/fix-password/model/useFixPassword";
import { FilledButton, TextField } from "@b1nd/dodam-design-system/components";

interface Props {
  onClose: () => void;
}

const FixPasswordModal = ({
  onClose
}: Props) => {
  const { submit, postPassword, newPassword, setPostPassword, setNewPassword } = useFixPassword();

  return (
    <div className="small-container flex flex-col gap-5 w-100">
      <p className="text-heading2 font-bold text-text-primary">비밀번호 수정</p>
      <div className="flex flex-col gap-5">
        <TextField type="password" label="현재 비밀번호" required value={postPassword} onChange={(e) => setPostPassword(e.target.value)}/>
        <TextField type="password" label="새로운 비밀번호" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        <FilledButton onClick={onClose} role="assistive">
          취소
        </FilledButton>
        <FilledButton onClick={submit}>
          완료
        </FilledButton>
      </div>
    </div>
  );
}

export default FixPasswordModal