import {
  WEEKEND_STUDY_ATTENDANCE_LABEL,
  formatPeriod,
  formatPeriodTime,
  formatStudentNumber,
} from "@/entities/weekend-study/constants";
import { useGetWeekendStudyRoomsQuery } from "@/entities/weekend-study/queries";
import type { WeekendStudyAttendanceStatus } from "@/entities/weekend-study/types";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Checkbox,
  Dropdown,
  FilledButton,
} from "@b1nd/dodam-design-system/components";
import dayjs from "dayjs";
import { useState } from "react";
import {
  ALL_VALUE,
  ATTENDANCE_FILTER_ITEMS,
  CLASS_FILTER_ITEMS,
  PLACE_TYPE_FILTER_ITEMS,
  getDateFilterItems,
  getDefaultPeriod,
  getPeriodFilterItems,
} from "../constants/filter-items";
import {
  useAttendanceCheckTable,
  type AttendanceCheckFilters,
} from "../hooks/useAttendanceCheckTable";
import type { WeekendStudyParticipantRow } from "../lib/weekend-study-rows";
import SearchInput from "./SearchInput";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

const ATTENDANCE_ITEMS = (
  Object.keys(WEEKEND_STUDY_ATTENDANCE_LABEL) as WeekendStudyAttendanceStatus[]
).map((status) => ({
  name: WEEKEND_STUDY_ATTENDANCE_LABEL[status],
  value: status,
}));

const ROW_CLASS: Record<WeekendStudyAttendanceStatus | "NONE", string> = {
  ATTENDANCE: "",
  LATE: "bg-status-warning",
  ABSENT: "bg-status-error",
  NONE: "bg-fill-primary",
};

const COLUMNS: WeekendTableColumn[] = [
  { label: null, width: "48px" },
  { label: "이름", width: "88px" },
  { label: "학반", width: "72px" },
  { label: "진행 날짜", width: "120px" },
  { label: "시간", width: "120px" },
  { label: "장소" },
  { label: "출석 상태", width: "140px", align: "right" },
];

const RoomFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { data } = useGetWeekendStudyRoomsQuery();
  const items = [
    { name: "모든 실", value: ALL_VALUE },
    { name: "교실 (개별 자습)", value: "CLASSROOM" },
    ...data.data.map((room) => ({ name: room.name, value: String(room.id) })),
  ];
  return (
    <Dropdown
      items={items}
      value={value}
      onSelectedItemChange={(item) => onChange(item.value)}
    />
  );
};

const AttendanceCheckData = (filters: AttendanceCheckFilters) => {
  const {
    rows,
    selectedKeys,
    toggleAll,
    toggleOne,
    getAttendance,
    checkRows,
    handleBulkCheck,
    isChecking,
    summary,
  } = useAttendanceCheckTable(filters);
  const date = dayjs(filters.date);

  const renderStatusCell = (row: WeekendStudyParticipantRow) => {
    const attendance = getAttendance(row);
    return (
      <div className="flex justify-end">
        <Dropdown
          items={ATTENDANCE_ITEMS}
          value={attendance ?? "미출석"}
          onSelectedItemChange={(item) =>
            checkRows([row], item.value as WeekendStudyAttendanceStatus)
          }
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex items-center gap-3">
        <FilledButton
          role="primary"
          size="small"
          display="inline"
          disabled={isChecking || selectedKeys.size === 0}
          onClick={() => handleBulkCheck("ATTENDANCE")}
        >
          일괄 출석
        </FilledButton>
        <FilledButton
          role="negative"
          size="small"
          display="inline"
          disabled={isChecking || selectedKeys.size === 0}
          onClick={() => handleBulkCheck("ABSENT")}
        >
          일괄 결석
        </FilledButton>
      </div>

      <div className="w-full rounded-medium bg-fill-primary px-5 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="text-body2 font-bold">
            {date.month() + 1}월 {date.date()}일 신청 현황
          </span>
          {summary.periodCounts.map(({ period, count }) => (
            <span key={period} className="text-caption1 text-text-tertiary">
              {formatPeriod(period)}{" "}
              <b
                className={
                  String(period) === filters.period
                    ? "text-brand-primary"
                    : "text-text-primary"
                }
              >
                {count}명
              </b>
            </span>
          ))}
        </div>
        <span className="text-caption1 text-text-tertiary">
          개별 자습 {summary.personalCount}명 · 실 대여 {summary.projectCount}명
          ({summary.projectRoomCount}실)
        </span>
      </div>

      <WeekendTable
        columns={[
          {
            ...COLUMNS[0],
            label: (
              <Checkbox
                size="small"
                selected={rows.length > 0 && selectedKeys.size === rows.length}
                onClick={toggleAll}
              />
            ),
          },
          ...COLUMNS.slice(1),
        ]}
        rowHeight={72}
        minWidth="52rem"
        rows={rows.map((row) => ({
          key: row.key,
          className: ROW_CLASS[getAttendance(row) ?? "NONE"],
          cells: [
            <Checkbox
              size="small"
              selected={selectedKeys.has(row.key)}
              onClick={() => toggleOne(row.key)}
            />,
            <span className="font-bold">{row.student.name}</span>,
            formatStudentNumber(row.student.student),
            row.date,
            formatPeriodTime(row.period),
            row.place,
            renderStatusCell(row),
          ],
        }))}
      />
    </div>
  );
};

const AttendanceCheckTable = () => {
  const dateItems = getDateFilterItems();
  const [filters, setFilters] = useState<AttendanceCheckFilters>({
    date: dateItems[0].value,
    period: getDefaultPeriod(),
    keyword: "",
    classValue: ALL_VALUE,
    placeType: ALL_VALUE,
    attendance: ALL_VALUE,
    room: ALL_VALUE,
  });
  const set = (field: keyof AttendanceCheckFilters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <SearchInput onSearch={set("keyword")} />
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          items={dateItems}
          value={filters.date}
          onSelectedItemChange={(item) => set("date")(item.value)}
        />
        <Dropdown
          items={CLASS_FILTER_ITEMS}
          value={filters.classValue}
          onSelectedItemChange={(item) => set("classValue")(item.value)}
        />
        <Dropdown
          items={PLACE_TYPE_FILTER_ITEMS}
          value={filters.placeType}
          onSelectedItemChange={(item) => set("placeType")(item.value)}
        />
        <Dropdown
          items={ATTENDANCE_FILTER_ITEMS}
          value={filters.attendance}
          onSelectedItemChange={(item) => set("attendance")(item.value)}
        />
        <Dropdown
          items={getPeriodFilterItems(false)}
          value={filters.period}
          onSelectedItemChange={(item) => set("period")(item.value)}
        />
        <QueryBoundary
          pendingFallback={
            <div className="skeleton h-12 w-28 rounded-medium" />
          }
        >
          <RoomFilter value={filters.room} onChange={set("room")} />
        </QueryBoundary>
      </div>
      <QueryBoundary
        pendingFallback={
          <WeekendTable.Skeleton columns={COLUMNS} rowHeight={72} />
        }
      >
        <AttendanceCheckData key={filters.date} {...filters} />
      </QueryBoundary>
    </div>
  );
};

export default AttendanceCheckTable;
