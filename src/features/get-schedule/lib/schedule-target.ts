import { SCHEDULE_CATEGORY_ITEMS } from "@/features/get-schedule/constants/schedule-category";

interface ScheduleTargetMeta {
  label: string;
  color: string;
}

const FALLBACK_TARGET: ScheduleTargetMeta = {
  label: "기타",
  color: SCHEDULE_CATEGORY_ITEMS[4].color,
};

export const parseScheduleTarget = (rawTarget: string): ScheduleTargetMeta => {
  const target = rawTarget.trim();
  const normalizedTarget = target.toUpperCase();

  if (
    normalizedTarget.includes("TEACHER") ||
    normalizedTarget.includes("교사")
  ) {
    return { label: "기타", color: SCHEDULE_CATEGORY_ITEMS[4].color };
  }

  if (target.includes("1")) {
    return { label: "1학년", color: SCHEDULE_CATEGORY_ITEMS[0].color };
  }

  if (target.includes("2")) {
    return { label: "2학년", color: SCHEDULE_CATEGORY_ITEMS[1].color };
  }

  if (target.includes("3")) {
    return { label: "3학년", color: SCHEDULE_CATEGORY_ITEMS[2].color };
  }

  if (
    target.includes("전") ||
    normalizedTarget.includes("ALL") ||
    normalizedTarget.includes("STUDENT")
  ) {
    return { label: "전교생", color: SCHEDULE_CATEGORY_ITEMS[3].color };
  }

  return FALLBACK_TARGET;
};
