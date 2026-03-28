import { useFixProfile } from "@/features/fix-profile/model/useFixProfile";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { FilledButton, TextField } from "@b1nd/dodam-design-system/components"

interface Props {
  onClose: () => void;
}

const FixProfileModal = ({
  onClose 
}: Props) => {
  const {name, setName, phone, setPhone, submit, isPending} = useFixProfile();
  return (
    <div className="small-container flex flex-col gap-5 w-100">
      <p className="text-heading2 font-bold text-text-primary">프로필 수정</p>
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
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        <FilledButton onClick={onClose} role="assistive">
          취소
        </FilledButton>
        <FilledButton onClick={submit}>
          {isPending ? "수정 중.." : "완료"}
        </FilledButton>
      </div>
    </div>
  );
};

export default FixProfileModal