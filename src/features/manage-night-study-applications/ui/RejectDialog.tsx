import { Dialog, TextField } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const RejectDialog = ({ isOpen, isPending, onClose, onConfirm }: Props) => {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={isOpen} title="심자 신청을 거절할까요?">
      <div className="flex flex-col gap-3 w-full">
        <TextField
          type="text"
          label="거절 사유"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex gap-2">
          <Dialog.FilledButton role="assistive" disabled={isPending} onClick={onClose}>
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            role="negative"
            disabled={isPending || !reason.trim()}
            onClick={() => onConfirm(reason.trim())}
          >
            확인
          </Dialog.FilledButton>
        </div>
      </div>
    </Dialog>
  );
};

export default RejectDialog;
