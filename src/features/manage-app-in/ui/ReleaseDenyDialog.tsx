import { Dialog, TextField } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
}

const ReleaseDenyDialog = ({
  isOpen,
  isPending,
  onClose,
  onConfirm,
}: Props) => {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={isOpen} title="릴리즈 요청을 거절할까요?">
      <div className="flex w-full flex-col gap-3">
        <TextField
          label="거절 사유"
          onChange={(event) => setReason(event.target.value)}
          type="text"
          value={reason}
        />
        <div className="flex gap-2">
          <Dialog.FilledButton
            disabled={isPending}
            onClick={onClose}
            role="assistive"
          >
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            disabled={isPending}
            onClick={() => onConfirm(reason.trim() || undefined)}
            role="negative"
          >
            거절
          </Dialog.FilledButton>
        </div>
      </div>
    </Dialog>
  );
};

export default ReleaseDenyDialog;
