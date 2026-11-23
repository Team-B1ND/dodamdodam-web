import { useGetWeekendStudyDeadlineQuery } from "@/entities/weekend-study/queries";
import type { DayOfWeek } from "@/entities/weekend-study/types";

const DAY_LABEL: Record<DayOfWeek, string> = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

interface Props {
  extra?: string;
}

const DeadlineNotice = ({ extra }: Props) => {
  const { data } = useGetWeekendStudyDeadlineQuery();
  const deadline = data?.data;
  const endTime = deadline?.endTime.slice(0, 5) ?? "17:00";
  const endDay = deadline ? DAY_LABEL[deadline.endDayOfWeek] : "당일";

  return (
    <p className="text-caption2 font-regular text-status-error">
      (신청은 {endDay} {endTime}에 마감됩니다.{" "}
      {extra ?? `${endTime} 이후 변경은 관리자에게 문의하세요.`})
    </p>
  );
};

export default DeadlineNotice;
