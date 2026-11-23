import { useApplyPersonalWeekendStudyMutation } from "@/entities/weekend-study/mutations";
import { getWeekendStudyDate } from "@/entities/weekend-study/constants";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

export const useApplyPersonalWeekendStudy = () => {
  const [periods, setPeriods] = useState<number[]>([]);
  const { mutateAsync, isPending } = useApplyPersonalWeekendStudyMutation();
  const toast = useToast();
  const date = getWeekendStudyDate();

  const togglePeriod = (period: number) => {
    setPeriods((prev) =>
      prev.includes(period)
        ? prev.filter((p) => p !== period)
        : [...prev, period].sort((a, b) => a - b),
    );
  };

  const submit = async () => {
    if (periods.length === 0) {
      toast.warning("시간을 1개 이상 선택해주세요.");
      return;
    }

    await mutateAsync({ date: date.format("YYYY-MM-DD"), periods });
    setPeriods([]);
  };

  return { periods, togglePeriod, date, submit, isPending };
};
