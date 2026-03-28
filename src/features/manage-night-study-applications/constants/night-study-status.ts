import type { NightStudyStatus } from "@/entities/night-study/types";
import { colors } from "@b1nd/dodam-design-system/colors";

export const NIGHT_STUDY_STATUS_LABEL: Record<NightStudyStatus, string> = {
  PENDING: "대기중",
  ALLOWED: "승인",
  REJECTED: "거절",
};

export const NIGHT_STUDY_STATUS_COLOR: Record<NightStudyStatus, string> = {
  PENDING: colors.text.secondary,
  ALLOWED: colors.status.success,
  REJECTED: colors.status.error,
};
