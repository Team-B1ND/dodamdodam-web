import { padDate } from "@/shared/utils/pad-date";
import {
  DatePicker,
  Dialog,
  FilledButton,
  TextField,
} from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Props {
  studentName: string;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (reason: string, endAt: string) => void;
}

const BanDialog = ({ studentName, isOpen, isPending, onClose, onConfirm }: Props) => {
  const [reason, setReason] = useState("");
  const [endAt, setEndAt] = useState<Date | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} title={`${studentName} 학생을 심자 정지할까요?`}>
        <div className="flex flex-col gap-3 w-full">
          <TextField
            type="text"
            label="정지 사유"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <label className="text-label text-text-secondary">정지 종료일</label>
            <FilledButton role="assistive" size="medium" onClick={() => setIsPickerOpen(true)}>
              {endAt ? padDate(endAt) : "날짜 선택"}
            </FilledButton>
          </div>
          <div className="flex gap-2">
            <Dialog.FilledButton role="assistive" disabled={isPending} onClick={onClose}>
              취소
            </Dialog.FilledButton>
            <Dialog.FilledButton
              role="negative"
              disabled={isPending || !reason.trim() || !endAt}
              onClick={() => onConfirm(reason.trim(), padDate(endAt!))}
            >
              정지
            </Dialog.FilledButton>
          </div>
        </div>
      </Dialog>

      <DatePicker
        open={isPickerOpen}
        date={endAt ?? new Date()}
        onChangeDate={setEndAt}
        onClose={() => setIsPickerOpen(false)}
        onExited={() => setIsPickerOpen(false)}
        disablePast
      />
    </>
  );
};

export default BanDialog;
