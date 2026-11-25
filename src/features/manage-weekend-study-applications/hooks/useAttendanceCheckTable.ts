import { useCheckWeekendStudyAttendanceMutation } from "@/entities/weekend-study/mutations";
import { useGetWeekendStudyApplicationsQuery } from "@/entities/weekend-study/queries";
import { formatStudentNumber } from "@/entities/weekend-study/constants";
import type { WeekendStudyAttendanceStatus } from "@/entities/weekend-study/types";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import { ALL_VALUE } from "../constants/filter-items";
import {
  compareStudent,
  getRowRoomKey,
  toParticipantRows,
  type WeekendStudyParticipantRow,
} from "../lib/weekend-study-rows";
import {
  attendanceRecordKey,
  useAttendanceCheckStore,
} from "../stores/attendance-check";

export interface AttendanceCheckFilters {
  date: string;
  period: string;
  keyword: string;
  attendance: string;
  /** `getRowRoomKey`로 만든 실 키예요. */
  roomKey: string;
}

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
  const { records, setRecord } = useAttendanceCheckStore();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const toast = useToast();

  const allRows = toParticipantRows([...personal, ...project]);

  const getAttendance = (row: WeekendStudyParticipantRow) =>
    records[attendanceRecordKey(row.student.publicId, row.date, row.period)];

  const rows = allRows
    .filter((row) => {
      if (row.period !== Number(period)) return false;
      if (getRowRoomKey(row) !== roomKey) return false;
      if (keyword) {
        const target = `${row.student.name} ${row.place} ${formatStudentNumber(row.student.student)}`;
        if (!target.includes(keyword)) return false;
      }
      if (attendance !== ALL_VALUE) {
        const current = getAttendance(row) ?? "NONE";
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
  const [isChecking, setIsChecking] = useState(false);

  const checkRows = async (
    targets: WeekendStudyParticipantRow[],
    status: WeekendStudyAttendanceStatus,
  ) => {
    if (targets.length === 0) return;

    setIsChecking(true);
    const results = await Promise.allSettled(
      targets.map((row) =>
        check({
          userId: row.student.publicId,
          date: row.date,
          period: row.period,
          status,
        }).then(() =>
          setRecord(
            attendanceRecordKey(row.student.publicId, row.date, row.period),
            status,
          ),
        ),
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
    } else {
      toast.success(`${targets.length}명의 출석을 체크했어요.`);
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
    checkRows,
    handleBulkCheck,
    isChecking,
  };
};
