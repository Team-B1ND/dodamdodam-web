import {
  useCancelWeekendStudyAttendanceMutation,
  useCheckWeekendStudyAttendanceMutation,
} from "@/entities/weekend-study/mutations";
import { useGetWeekendStudyApplicationsQuery } from "@/entities/weekend-study/queries";
import { formatStudentNumber } from "@/entities/weekend-study/constants";
import type { WeekendStudyAttendanceStatus } from "@/entities/weekend-study/types";
import { useOverlay, useToast } from "@b1nd/dodam-design-system/components";
import { createElement, useState } from "react";
import { ALL_VALUE } from "../constants/filter-items";
import {
  compareStudent,
  getRowRoomKey,
  toParticipantRows,
  type WeekendStudyParticipantRow,
} from "../lib/weekend-study-rows";
import AttendanceReasonDialog from "../ui/AttendanceReasonDialog";
import {
  attendanceRecordKey,
  isPeriodEnded,
  useAttendanceRecords,
} from "./useAttendanceRecords";

export interface AttendanceCheckFilters {
  date: string;
  period: string;
  keyword: string;
  attendance: string;
  /** `getRowRoomKey`로 만든 실 키예요. */
  roomKey: string;
}

/** 출결 드롭다운의 `미출석`이에요. 고르면 체크를 취소해요. */
export const NO_ATTENDANCE = "NONE";
export type AttendanceChoice = WeekendStudyAttendanceStatus | typeof NO_ATTENDANCE;

export const useAttendanceCheckTable = (filters: AttendanceCheckFilters) => {
  const { date, period, keyword, attendance, roomKey } = filters;
  const { data: personal } = useGetWeekendStudyApplicationsQuery(
    date,
    "PERSONAL",
  );
  const { data: project } = useGetWeekendStudyApplicationsQuery(
    date,
    "PROJECT",
  );
  const records = useAttendanceRecords(date);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const toast = useToast();
  const { open } = useOverlay();

  const allRows = toParticipantRows([...personal, ...project]);

  const getRecord = (row: WeekendStudyParticipantRow) =>
    records.get(attendanceRecordKey(row.student.publicId, row.date, row.period));

  const getAttendance = (row: WeekendStudyParticipantRow) =>
    getRecord(row)?.status ?? undefined;

  const rows = allRows
    .filter((row) => {
      if (row.period !== Number(period)) return false;
      if (getRowRoomKey(row) !== roomKey) return false;
      if (keyword) {
        const target = `${row.student.name} ${row.place} ${formatStudentNumber(row.student.student)}`;
        if (!target.includes(keyword)) return false;
      }
      if (attendance !== ALL_VALUE) {
        const current = getAttendance(row) ?? NO_ATTENDANCE;
        if (current !== attendance) return false;
      }
      return true;
    })
    .sort((a, b) => compareStudent(a.student, b.student));

  const toggleAll = () => {
    setSelectedKeys((prev) =>
      prev.size === rows.length
        ? new Set()
        : new Set(rows.map((row) => row.key)),
    );
  };

  const toggleOne = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const { mutateAsync: check } = useCheckWeekendStudyAttendanceMutation({
    notify: false,
  });
  const { mutateAsync: cancel } = useCancelWeekendStudyAttendanceMutation({
    notify: false,
  });
  const [isChecking, setIsChecking] = useState(false);

  const askReason = (count: number) =>
    new Promise<string | null>((resolve) =>
      open(({ close, exit, isOpen }) => {
        const finish = (reason: string | null) => {
          resolve(reason);
          close();
          exit();
        };
        return createElement(AttendanceReasonDialog, {
          isOpen,
          count,
          onSubmit: finish,
          onClose: () => finish(null),
        });
      }),
    );

  const checkRows = async (
    targets: WeekendStudyParticipantRow[],
    choice: AttendanceChoice,
  ) => {
    // 미출석은 이미 체크한 학생의 체크만 지워요.
    const changed = targets.filter(
      (row) => (getAttendance(row) ?? NO_ATTENDANCE) !== choice,
    );
    if (changed.length === 0) return;

    const ended = isPeriodEnded(date, Number(period));
    if (ended && choice === NO_ATTENDANCE) {
      toast.warning(
        "슬롯이 끝난 뒤에는 미출석으로 되돌릴 수 없어요. 출석·지각·결석 중에서 골라주세요.",
      );
      return;
    }
    // 명세: 슬롯이 끝난 뒤 수정은 사유를 입력해야 해요.
    const reason = ended ? await askReason(changed.length) : null;
    if (ended && !reason) return;

    setIsChecking(true);
    const results = await Promise.allSettled(
      changed.map((row) =>
        choice === NO_ATTENDANCE
          ? cancel({
              userId: row.student.publicId,
              date: row.date,
              period: row.period,
            })
          : check({
              userId: row.student.publicId,
              date: row.date,
              period: row.period,
              status: choice,
              ...(reason ? { reason } : {}),
            }),
      ),
    );
    setIsChecking(false);

    const failed = results.filter((result) => result.status === "rejected");
    if (failed.length) {
      const reason = (failed[0] as PromiseRejectedResult).reason as {
        message?: string;
      };
      toast.error(
        `${failed.length}건을 처리하지 못했어요. ${reason?.message ?? ""}`.trim(),
      );
    } else if (choice === NO_ATTENDANCE) {
      toast.success(`${changed.length}명의 출석 체크를 취소했어요.`);
    } else {
      toast.success(`${changed.length}명의 출석을 체크했어요.`);
    }
  };

  const handleBulkCheck = async (status: WeekendStudyAttendanceStatus) => {
    await checkRows(
      rows.filter((row) => selectedKeys.has(row.key)),
      status,
    );
    setSelectedKeys(new Set());
  };

  return {
    rows,
    selectedKeys,
    toggleAll,
    toggleOne,
    getAttendance,
    getRecord,
    checkRows,
    handleBulkCheck,
    isChecking,
  };
};
