import {
  WEEKEND_STUDY_ATTENDANCE_LABEL,
  formatPeriod,
  formatPeriodTime,
  formatStudentNumber,
} from "@/entities/weekend-study/constants";
import type { WeekendStudyAttendanceStatus } from "@/entities/weekend-study/types";
import {
  Checkbox,
  Dropdown,
  FilledButton,
  IconButton,
} from "@b1nd/dodam-design-system/components";
import { colors } from "@b1nd/dodam-design-system/colors";
import { ArrowLeft } from "@b1nd/dodam-design-system/icons";
import { useState } from "react";
import { ALL_VALUE, ATTENDANCE_FILTER_ITEMS } from "../constants/filter-items";
import {
  NO_ATTENDANCE,
  useAttendanceCheckTable,
  type AttendanceChoice,
} from "../hooks/useAttendanceCheckTable";
import type { WeekendStudyParticipantRow } from "../lib/weekend-study-rows";
import type { AttendanceRoom } from "./AttendanceRoomList";
import SearchInput from "./SearchInput";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

interface Props {
  room: AttendanceRoom;
  date: string;
  period: string;
  onBack: () => void;
}

const ATTENDANCE_ITEMS = [
  { name: "미출석", value: NO_ATTENDANCE },
  ...(
    Object.keys(
      WEEKEND_STUDY_ATTENDANCE_LABEL,
    ) as WeekendStudyAttendanceStatus[]
  ).map((status) => ({
    name: WEEKEND_STUDY_ATTENDANCE_LABEL[status],
    value: status,
  })),
];

const ROW_CLASS: Record<WeekendStudyAttendanceStatus | "NONE", string> = {
  ATTENDANCE: "",
  LATE: "bg-status-warning/10",
  ABSENT: "bg-status-error/10",
  NONE: "bg-fill-primary",
};

export const ATTENDANCE_DETAIL_COLUMNS: WeekendTableColumn[] = [
  { label: null, width: "48px" },
  { label: "이름", width: "88px" },
  { label: "학반", width: "72px" },
  { label: "진행 날짜", width: "120px" },
  { label: "시간" },
  { label: "출석 상태", width: "140px", align: "right" },
];

const AttendanceRoomDetail = ({ room, date, period, onBack }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [attendance, setAttendance] = useState(ALL_VALUE);
  const {
    rows,
    selectedKeys,
    toggleAll,
    toggleOne,
    getAttendance,
    getRecord,
    checkRows,
    handleBulkCheck,
    isChecking,
  } = useAttendanceCheckTable({
    date,
    period,
    keyword,
    attendance,
    roomKey: room.key,
  });

  const renderStatusCell = (row: WeekendStudyParticipantRow) => (
    <div className="flex justify-end">
      <Dropdown
        items={ATTENDANCE_ITEMS}
        value={getAttendance(row) ?? NO_ATTENDANCE}
        onSelectedItemChange={(item) =>
          checkRows([row], item.value as AttendanceChoice)
        }
      />
    </div>
  );

  return (
    <div className="flex grow flex-col items-start gap-3 min-w-0">
      <div className="flex items-center gap-2">
        <IconButton
          icon={<ArrowLeft color={colors.text.primary} />}
          size={48}
          iconSize={24}
          onClick={onBack}
        />
        <div className="flex items-baseline gap-2">
          <h1 className="text-title2 font-medium text-text-primary">
            {room.name}
          </h1>
          <span className="text-body1 text-text-tertiary">
            {formatPeriod(Number(period))}
          </span>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-row flex-wrap items-center justify-between gap-3 max-md:flex-col max-md:items-start">
        <SearchInput onSearch={setKeyword} />

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Dropdown
            items={ATTENDANCE_FILTER_ITEMS}
            value={attendance}
            onSelectedItemChange={(item) => setAttendance(item.value)}
          />
          {selectedKeys.size > 0 && (
            <>
              <FilledButton
                role="negative"
                size="medium"
                display="inline"
                disabled={isChecking}
                onClick={() => handleBulkCheck("ABSENT")}
              >
                일괄 결석
              </FilledButton>
              <FilledButton
                role="primary"
                size="medium"
                display="inline"
                disabled={isChecking}
                onClick={() => handleBulkCheck("ATTENDANCE")}
              >
                일괄 출석
              </FilledButton>
            </>
          )}
        </div>
      </div>

      <WeekendTable
        columns={[
          {
            ...ATTENDANCE_DETAIL_COLUMNS[0],
            label: (
              <Checkbox
                size="small"
                selected={rows.length > 0 && selectedKeys.size === rows.length}
                onClick={toggleAll}
              />
            ),
          },
          ...ATTENDANCE_DETAIL_COLUMNS.slice(1),
        ]}
        rowHeight={72}
        minWidth="44rem"
        dropdownSpace
        emptyText="조건에 맞는 학생이 없어요."
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
            <div className="flex flex-col gap-0.5">
              <span>{formatPeriodTime(row.period)}</span>
              {getRecord(row)?.reason && (
                <span className="text-caption1 text-text-tertiary whitespace-normal">
                  수정 사유: {getRecord(row)?.reason}
                </span>
              )}
            </div>,
            renderStatusCell(row),
          ],
        }))}
      />
    </div>
  );
};

export default AttendanceRoomDetail;
