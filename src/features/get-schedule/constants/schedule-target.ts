import type { DropdownItem } from "@b1nd/dodam-design-system/components";

export const SCHEDULE_TARGET_ITEMS: DropdownItem[] = [
  { name: "1학년", value: "GRADE_1" },
  { name: "2학년", value: "GRADE_2" },
  { name: "3학년", value: "GRADE_3" },
  { name: "전교생", value: "ALL_STUDENTS" },
  { name: "기타", value: "TEACHER" },
] as const;
