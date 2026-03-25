import dayjs from "dayjs";

/**
 * format 삽입 시 dayjs를 통해 format에 맞게 오늘 날짜를 출력합니다.
 * 
 * 기본 format : `YYYY-MM-DD`
 */

export const getToday = (format?: string) => {
  return dayjs().format(format ?? "YYYY-MM-DD");
}