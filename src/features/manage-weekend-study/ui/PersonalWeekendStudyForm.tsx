import { padDate } from "@/shared/utils/pad-date";
import {
  DatePicker,
  FilledButton,
  PickerTrigger,
} from "@b1nd/dodam-design-system/components";
import { ArrowRight } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { useApplyPersonalWeekendStudy } from "../hooks/useApplyPersonalWeekendStudy";
import DeadlineNotice from "./DeadlineNotice";
import PeriodTimeline from "./PeriodTimeline";

const PersonalWeekendStudyForm = () => {
  const { periods, togglePeriod, date, changeDate, submit, isPending } =
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
        {/* 버튼이 행 오른쪽 끝이라 달력을 오른쪽 기준으로 펼쳐요. DS 스타일(emotion)은 CSS 레이어 밖이라 left는 !important로 덮어요. */}
        <div className="[&>div>div:last-child]:left-auto! [&>div>div:last-child]:right-0">
          <PickerTrigger
            content={({ onClose }) => (
              <DatePicker.Content
                date={date.toDate()}
                onChangeDate={changeDate}
                onClose={onClose}
                disablePast
              />
            )}
          >
            <FilledButton role="assistive" size="medium">
              {padDate(date.toDate())}
            </FilledButton>
          </PickerTrigger>
        </div>
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
