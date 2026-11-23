import type { WeekendStudyAttendanceStatus } from "@/entities/weekend-study/types";
import { create } from "zustand";

/**
 * 서버에 학생별 출결 조회 API가 아직 없어서, 이번 세션에서 체크한 결과만 화면에 반영해요.
 * 조회 API가 생기면 이 store를 쿼리로 대체해야 해요.
 */
interface State {
  records: Record<string, WeekendStudyAttendanceStatus>;
  setRecord: (key: string, status: WeekendStudyAttendanceStatus) => void;
}

export const attendanceRecordKey = (
  userId: string,
  date: string,
  period: number,
) => `${userId}|${date}|${period}`;

export const useAttendanceCheckStore = create<State>((set) => ({
  records: {},
  setRecord: (key, status) =>
    set((state) => ({ records: { ...state.records, [key]: status } })),
}));
