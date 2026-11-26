import { formatWeekendStudyDate } from "@/entities/weekend-study/constants";
import { useUpdatePersonalWeekendStudyMutation } from "@/entities/weekend-study/mutations";
import type { PersonalWeekendStudy } from "@/entities/weekend-study/types";
import { Dialog, useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import PeriodTimeline from "./PeriodTimeline";

interface Props {
  data: PersonalWeekendStudy;
  isOpen: boolean;
  onClose: () => void;
}

/** 개별 자습 신청의 시간만 고쳐요. 서버는 같은 날짜 안에서만 수정을 받아요. */
const PersonalWeekendStudyEditDialog = ({ data, isOpen, onClose }: Props) => {
  const [periods, setPeriods] = useState(data.periods);
  const { mutate, isPending } = useUpdatePersonalWeekendStudyMutation();
  const toast = useToast();

  const togglePeriod = (period: number) =>
    setPeriods((prev) =>
      prev.includes(period)
        ? prev.filter((p) => p !== period)
        : [...prev, period].sort((a, b) => a - b),
    );

  const handleSubmit = () => {
    if (periods.length === 0) {
      toast.warning("시간을 1개 이상 선택해주세요.");
      return;
    }
    mutate({ id: data.id, date: data.date, periods }, { onSuccess: onClose });
  };

  return (
    <Dialog
      open={isOpen}
      title="신청 시간 수정"
      description={formatWeekendStudyDate(data.date)}
      onClose={onClose}
      closeOnDimmerClick
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="-mx-5">
          <PeriodTimeline periods={periods} onToggle={togglePeriod} />
        </div>
        <div className="flex gap-2">
          <Dialog.FilledButton
            role="assistive"
            disabled={isPending}
            onClick={onClose}
          >
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            role="primary"
            disabled={isPending}
            onClick={handleSubmit}
          >
            저장
          </Dialog.FilledButton>
        </div>
      </div>
    </Dialog>
  );
};

export default PersonalWeekendStudyEditDialog;
