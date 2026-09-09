import type { OutSleepingReasonType } from "@/entities/out-sleeping/types";
import type { DropdownItem } from "@b1nd/dodam-design-system/components";

export const OUT_SLEEPING_REASON_LABELS: Record<OutSleepingReasonType, string> =
  {
    PERSONAL: "일반 외박",
    TRAINING: "연수",
    INTERNSHIP: "현장실습",
    SILICON_VALLEY: "실리콘벨리",
    SICK_LEAVE: "병가",
    ETC: "기타",
  };

export const OUT_SLEEPING_REASON_ITEMS: DropdownItem[] = Object.entries(
  OUT_SLEEPING_REASON_LABELS,
).map(([value, name]) => ({ value, name }));

export const OUT_SLEEPING_REASON_FILTER_ITEMS: DropdownItem[] = [
  { name: "전체 사유", value: "" },
  ...OUT_SLEEPING_REASON_ITEMS,
];

export const formatOutSleepingReason = (
  reasonType: OutSleepingReasonType,
  reason: string | null,
) =>
  reasonType === "ETC" && reason
    ? `기타 (${reason})`
    : OUT_SLEEPING_REASON_LABELS[reasonType];
