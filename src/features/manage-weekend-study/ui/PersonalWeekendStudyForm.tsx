import { formatWeekendStudyDate } from "@/entities/weekend-study/constants";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import { ArrowRight } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { useApplyPersonalWeekendStudy } from "../hooks/useApplyPersonalWeekendStudy";
import DeadlineNotice from "./DeadlineNotice";
import PeriodTimeline from "./PeriodTimeline";

const PersonalWeekendStudyForm = () => {
  const { periods, togglePeriod, date, submit, isPending } =
    useApplyPersonalWeekendStudy();

  return (
    <div className="w-full flex flex-col gap-4 grow">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-headline font-bold">신청 시간 선택</h1>
        <DeadlineNotice />
      </div>
      <PeriodTimeline periods={periods} onToggle={togglePeriod} />
      <div className="w-full flex items-center justify-between">
        <p className="text-headline font-medium text-text-secondary">
          진행 날짜
        </p>
        <p className="text-headline font-bold">
          {formatWeekendStudyDate(date)}
        </p>
      </div>
      <div className="grow min-h-16" />
      <div className="self-end">
        <FilledButton size="large" disabled={isPending} onClick={submit}>
          <p className="mr-2">{isPending ? "신청하는 중..." : "신청하기"}</p>
          <ArrowRight color={colors.static.white} size={20} />
        </FilledButton>
      </div>
    </div>
  );
};

export default PersonalWeekendStudyForm;
