import { getToday } from "@/shared/libs/day";
import { useDebounce } from "@/shared/hooks/useDebounce";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Dropdown,
  Table,
} from "@b1nd/dodam-design-system/components";
import { colors } from "@b1nd/dodam-design-system/colors";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { useState } from "react";
import { ATTENDANCE_TABLE_KEYS } from "../constants/attendance-table-keys";
import {
  type AttendanceFilterStatus,
  useAttendanceTable,
} from "../hooks/useAttendanceTable";
import AttendanceActionCell from "./AttendanceActionCell";
import AttendanceSkeletonRows from "./AttendanceSkeletonRows";
import NightStudyAttendanceExcelButton from "./NightStudyAttendanceExcelButton";

const ATTENDANCE_FILTER_ITEMS = [
  { name: "전체 상태", value: "ALL" },
  { name: "출석 학생", value: "ATTENDED" },
  { name: "미출석 학생", value: "UNATTENDED" },
];

const ATTENDANCE_PERIOD_ITEMS = [
  { name: "심자 1", value: "1" },
  { name: "심자 2", value: "2" },
];

const AttendanceTableData = ({
  keyword,
  period,
  attendStatus,
}: {
  keyword: string;
  period: number;
  attendStatus: AttendanceFilterStatus;
}) => {
  const date = getToday();
  const {
    students,
    ref,
    hasNextPage,
    isFetchingNextPage,
    isAttendanceLoading,
    updateAttendance,
    isUpdating,
  } = useAttendanceTable(keyword, period, date, attendStatus);

  if (isAttendanceLoading) {
    return <AttendanceSkeletonRows count={8} />;
  }

  if (students.length === 0) {
    return (
      <div className="w-full flex items-start justify-center grow text-text-secondary text-body1">
        출석 대상 학생이 없습니다.
      </div>
    );
  }

  const rows = students.map((student) => [
    student.name,
    student.studentId,
    student.currentRoom,
    <AttendanceActionCell
      attended={student.attended}
      disabled={isUpdating}
      onAttend={() =>
        updateAttendance({
          userId: student.userId,
          date,
          period: student.period,
          attended: true,
        })
      }
      onRevert={() =>
        updateAttendance({
          userId: student.userId,
          date,
          period: student.period,
          attended: false,
        })
      }
    />,
  ]);

  return (
    <>
      <Table keys={ATTENDANCE_TABLE_KEYS} data={rows} />
      {isFetchingNextPage && <AttendanceSkeletonRows count={3} />}
      {hasNextPage ? <div ref={ref} className="h-2 shrink-0" /> : null}
    </>
  );
};

const AttendanceTable = () => {
  const [keyword, setKeyword] = useState("");
  const [attendStatus, setAttendStatus] =
    useState<AttendanceFilterStatus>("ALL");
  const [period, setPeriod] = useState(1);
  const query = useDebounce(keyword);

  return (
    <div className="flex items-start flex-col gap-3 overflow-hidden grow">
      <div className="flex flex-wrap flex-row items-center justify-between w-full shrink-0 gap-3 max-md:flex-col max-md:items-start">
        <div className="flex items-center gap-3 h-12 bg-fill-primary rounded-small px-3">
          <MagnifyingGlass size={24} color={colors.text.placeholder} />
          <input
            className="flex-1 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <NightStudyAttendanceExcelButton keyword={query} period={period} />
          <Dropdown
            items={ATTENDANCE_FILTER_ITEMS}
            value={attendStatus}
            onSelectedItemChange={(item) =>
              setAttendStatus(item.value as AttendanceFilterStatus)
            }
          />
          <Dropdown
            items={ATTENDANCE_PERIOD_ITEMS}
            value={String(period)}
            onSelectedItemChange={(item) => setPeriod(Number(item.value))}
          />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto flex-1 w-full min-h-0 min-w-0 scrollbar">
        <div className="min-w-120">
          <QueryBoundary pendingFallback={<AttendanceTable.Skeleton />}>
            <AttendanceTableData
              keyword={query}
              period={period}
              attendStatus={attendStatus}
            />
          </QueryBoundary>
        </div>
      </div>
    </div>
  );
};

AttendanceTable.Skeleton = () => (
  <>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {ATTENDANCE_TABLE_KEYS.map(([label, width], i) => (
            <th
              key={`${label}-${i}`}
              className="text-left px-3 text-text-secondary border-t border-border-normal"
              style={{
                height: 32,
                width: width === "FULL" ? undefined : width,
              }}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
    </table>
    <AttendanceSkeletonRows count={8} />
  </>
);

export default AttendanceTable;
