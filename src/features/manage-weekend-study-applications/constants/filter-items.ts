import {
  WEEKEND_STUDY_PERIODS,
  formatPeriod,
  formatWeekendStudyDate,
  getWeekendStudyDate,
} from "@/entities/weekend-study/constants";
import type { DropdownItem } from "@b1nd/dodam-design-system/components";

export const ALL_VALUE = "";

/** 이번 주 일요일부터 지난 8주까지 선택할 수 있어요. */
export const getDateFilterItems = (): DropdownItem[] => {
  const base = getWeekendStudyDate();
  return Array.from({ length: 9 }).map((_, idx) => {
    const date = base.subtract(idx * 7, "day");
    return {
      name: formatWeekendStudyDate(date),
      value: date.format("YYYY-MM-DD"),
    };
  });
};

const getCurrentPeriod = () => {
  const hour = new Date().getHours();
  return WEEKEND_STUDY_PERIODS.find((period) => period === hour);
};

export const getPeriodFilterItems = (withAll: boolean): DropdownItem[] => {
  const current = getCurrentPeriod();
  return [
    ...(withAll ? [{ name: "모든 시간", value: ALL_VALUE }] : []),
    ...WEEKEND_STUDY_PERIODS.map((period) => ({
      name: `${formatPeriod(period)}${period === current ? " (현재)" : ""}`,
      value: String(period),
    })),
  ];
};

export const getDefaultPeriod = () =>
  String(getCurrentPeriod() ?? WEEKEND_STUDY_PERIODS[0]);

export const CLASS_FILTER_ITEMS: DropdownItem[] = [
  { name: "모든 반", value: ALL_VALUE },
  ...[1, 2, 3].flatMap((grade) =>
    [1, 2, 3, 4].map((room) => ({
      name: `${grade}학년 ${room}반`,
      value: `${grade}-${room}`,
    })),
  ),
];

export const PLACE_TYPE_FILTER_ITEMS: DropdownItem[] = [
  { name: "모든 장소 유형", value: ALL_VALUE },
  { name: "개별 자습", value: "PERSONAL" },
  { name: "실 대여", value: "PROJECT" },
];

export const APPROVAL_FILTER_ITEMS: DropdownItem[] = [
  { name: "모든 상태", value: ALL_VALUE },
  { name: "대기중", value: "PENDING" },
  { name: "승인됨", value: "ALLOWED" },
  { name: "거절됨", value: "REJECTED" },
];

export const ATTENDANCE_FILTER_ITEMS: DropdownItem[] = [
  { name: "모든 상태", value: ALL_VALUE },
  { name: "출석", value: "ATTENDANCE" },
  { name: "지각", value: "LATE" },
  { name: "결석", value: "ABSENT" },
  { name: "미출석", value: "NONE" },
];
