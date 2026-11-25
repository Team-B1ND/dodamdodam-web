import { useGetWeekendStudyAttendanceStatusQuery } from "@/entities/weekend-study/queries";
import type { WeekendStudyAttendanceStatusItem } from "@/entities/weekend-study/types";
import dayjs from "dayjs";

export const attendanceRecordKey = (
  userId: string,
  date: string,
  period: number,
) => `${userId}|${date}|${period}`;

/** 서버 출결 현황을 `학생|날짜|교시` 키로 찾을 수 있게 펼쳐요. 체크하지 않은 행은 빠져요. */
export const useAttendanceRecords = (date: string) => {
  const { data } = useGetWeekendStudyAttendanceStatusQuery(date);
  const records = new Map<string, WeekendStudyAttendanceStatusItem>();
  data.data.forEach((item) => {
    if (item.status)
      records.set(
        attendanceRecordKey(item.student.publicId, date, item.period),
        item,
      );
  });
  return records;
};

/** 슬롯(교시) 시간이 끝났는지예요. 끝난 뒤 고칠 때는 사유를 받아요. */
export const isPeriodEnded = (date: string, period: number, now = dayjs()) =>
  !now.isBefore(
    dayjs(date)
      .hour(period + 1)
      .startOf("hour"),
  );
