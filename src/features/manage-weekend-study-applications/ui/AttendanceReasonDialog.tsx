import { Dialog, TextField } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  /** 고칠 학생 수예요. 일괄 처리면 2명 이상이에요. */
  count: number;
  onSubmit: (reason: string) => void;
  onClose: () => void;
}

/** 슬롯이 끝난 뒤 출결을 고칠 때 사유를 받아요. */
const AttendanceReasonDialog = ({ isOpen, count, onSubmit, onClose }: Props) => {
  const [reason, setReason] = useState("");
  const trimmed = reason.trim();

  return (
    <Dialog
      open={isOpen}
      title="수정 사유를 입력해주세요"
      description={`슬롯이 끝난 뒤에 고치는 출결이에요.${count > 1 ? ` (${count}명)` : ""}`}
      onClose={onClose}
      closeOnDimmerClick
    >
      <div className="flex flex-col gap-6 w-full">
        <TextField
          type="text"
          label="수정 사유"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex gap-2">
          <Dialog.FilledButton role="assistive" onClick={onClose}>
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            role="primary"
            disabled={!trimmed}
            onClick={() => onSubmit(trimmed)}
          >
            저장
          </Dialog.FilledButton>
        </div>
      </div>
    </Dialog>
  );
};

export default AttendanceReasonDialog;
