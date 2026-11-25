import dayjs from "dayjs";
import type { WeekendStudyAttendanceStatus, WeekendStudyTime } from "./types";

/** 주말 자습 신청 가능한 교시예요. `17`은 17:00–18:00을 뜻해요. */
export const WEEKEND_STUDY_PERIODS = [17, 18, 19, 20] as const;

export const WEEKEND_STUDY_ATTENDANCE_LABEL: Record<
  WeekendStudyAttendanceStatus,
  string
> = {
  ATTENDANCE: "출석",
  LATE: "지각",
  ABSENT: "결석",
};

/** 서버는 이번 주(오늘 포함) 일요일만 신청을 받아요. */
export const getWeekendStudyDate = (base = dayjs()) =>
  base.day() === 0
    ? base.startOf("day")
    : base.add(7 - base.day(), "day").startOf("day");

/** 서버가 받는 신청 날짜(일요일)인지 확인해요. */
export const isWeekendStudyDay = (date: string | Date | dayjs.Dayjs) =>
  dayjs(date).day() === 0;

/** `17` -> `17–18시` */
export const formatPeriod = (period: number) => `${period}–${period + 1}시`;

/** `17` -> `17:00–18:00` */
export const formatPeriodTime = (period: number) =>
  `${period}:00–${period + 1}:00`;

/** 연속된 교시를 묶어요. `[17, 18, 20]` -> `[[17, 18], [20]]` */
export const groupContinuousPeriods = (periods: number[]) =>
  [...periods]
    .sort((a, b) => a - b)
    .reduce<number[][]>((groups, period) => {
      const last = groups.at(-1);
      if (last && last.at(-1) === period - 1) last.push(period);
      else groups.push([period]);
      return groups;
    }, []);

/** `[17, 18, 20]` -> `17시-19시, 20시-21시` */
export const formatPeriodsLabel = (periods: number[]) =>
  groupContinuousPeriods(periods)
    .map((group) => `${group[0]}시-${group.at(-1)! + 1}시`)
    .join(", ");

/** `[17, 18]` -> `17:00 - 19:00` */
export const formatPeriodsTime = (periods: number[]) =>
  groupContinuousPeriods(periods)
    .map((group) => `${group[0]}:00 - ${group.at(-1)! + 1}:00`)
    .join(", ");

/** `YYYY-MM-DD` -> `7월 18일 (일)` */
export const formatWeekendStudyDate = (date: string | Date | dayjs.Dayjs) => {
  const d = dayjs(date);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.month() + 1}월 ${d.date()}일 (${days[d.day()]})`;
};

export const formatStudentNumber = (
  student: {
    grade: number;
    room: number;
    number: number;
  } | null,
) =>
  student
    ? `${student.grade}${student.room}${String(student.number).padStart(2, "0")}`
    : "-";

/** `17:00:00` 또는 `{ hour: 17, minute: 0 }` -> `17:00` */
export const formatWeekendStudyTime = (time: WeekendStudyTime) =>
  typeof time === "string"
    ? time.slice(0, 5)
    : `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
