import {
  WEEKEND_STUDY_ATTENDANCE_LABEL,
  formatPeriodTime,
  formatStudentNumber,
  formatWeekendStudyDate,
} from "@/entities/weekend-study/constants";
import { useGetWeekendStudyApplicationsQuery } from "@/entities/weekend-study/queries";
import type { WeekendStudyAttendanceStatusItem } from "@/entities/weekend-study/types";
import { downloadExcelFile } from "@/shared/ui/extract-excel";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Dropdown,
  FilledButton,
  useToast,
} from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import {
  ALL_VALUE,
  ATTENDANCE_FILTER_ITEMS,
  CLASS_FILTER_ITEMS,
  getCurrentWeekendStudyDate,
  getPeriodFilterItems,
} from "../constants/filter-items";
import { NO_ATTENDANCE } from "../hooks/useAttendanceCheckTable";
import {
  attendanceRecordKey,
  useAttendanceRecords,
} from "../hooks/useAttendanceRecords";
import {
  compareStudent,
  toParticipantRows,
  type WeekendStudyParticipantRow,
} from "../lib/weekend-study-rows";
import SearchInput from "./SearchInput";
import WeekendDatePicker from "./WeekendDatePicker";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

interface Filters {
  date: string;
  period: string;
  place: string;
  attendance: string;
  keyword: string;
  classValue: string;
}

interface DailyRecord {
  row: WeekendStudyParticipantRow;
  /** 체크하지 않은 행(미출석)은 비어 있어요. */
  record?: WeekendStudyAttendanceStatusItem;
}

const COLUMNS: WeekendTableColumn[] = [
  { label: "이름", width: "120px" },
  { label: "학반", width: "72px" },
  { label: "시간", width: "128px" },
  { label: "장소" },
  { label: "상태", width: "88px" },
  { label: "수정 사유" },
];

const getStatusLabel = (record?: WeekendStudyAttendanceStatusItem) =>
  record?.status ? WEEKEND_STUDY_ATTENDANCE_LABEL[record.status] : "미출석";

/** 출석 체크 화면과 같은 신청 응답을 학생·교시 단위 행으로 펼쳐요. */
const useParticipantRows = (date: string) => {
  const { data: personal } = useGetWeekendStudyApplicationsQuery(
    date,
    "PERSONAL",
  );
  const { data: project } = useGetWeekendStudyApplicationsQuery(
    date,
    "PROJECT",
  );
  return toParticipantRows([...personal, ...project]);
};

/** 그날 신청에 있는 장소만 골라요. 교실을 먼저, 실을 뒤에 둬요. */
const getPlaceItems = (rows: WeekendStudyParticipantRow[]) => [
  { name: "모든 장소", value: ALL_VALUE },
  ...[
    ...new Set(
      [...rows]
        .sort(
          (a, b) =>
            Number(a.type === "PROJECT") - Number(b.type === "PROJECT") ||
            a.place.localeCompare(b.place, "ko", { numeric: true }),
        )
        .map((row) => row.place),
    ),
  ].map((place) => ({ name: place, value: place })),
];

const filterDailyRecords = (
  rows: WeekendStudyParticipantRow[],
  records: Map<string, WeekendStudyAttendanceStatusItem>,
  { date, period, place, attendance, keyword, classValue }: Filters,
): DailyRecord[] =>
  rows
    .map((row) => ({
      row,
      record: records.get(
        attendanceRecordKey(row.student.publicId, date, row.period),
      ),
    }))
    .filter(({ row, record }) => {
      const { student } = row;
      if (period !== ALL_VALUE && row.period !== Number(period)) return false;
      if (place !== ALL_VALUE && row.place !== place) return false;
      if (
        attendance !== ALL_VALUE &&
        (record?.status ?? NO_ATTENDANCE) !== attendance
      ) {
        return false;
      }
      if (
        keyword &&
        !student.name.includes(keyword) &&
        !formatStudentNumber(student.student).includes(keyword)
      ) {
        return false;
      }
      if (classValue !== ALL_VALUE) {
        const [grade, room] = classValue.split("-").map(Number);
        if (
          student.student?.grade !== grade ||
          student.student?.room !== room
        ) {
          return false;
        }
      }
      return true;
    })
    .sort(
      (a, b) =>
        compareStudent(a.row.student, b.row.student) ||
        a.row.period - b.row.period,
    );

const PlaceFilter = ({
  date,
  value,
  onChange,
}: {
  date: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const rows = useParticipantRows(date);
  return (
    <Dropdown
      items={getPlaceItems(rows)}
      value={value}
      onSelectedItemChange={(item) => onChange(item.value)}
    />
  );
};

const AttendanceDailyData = (filters: Filters) => {
  const toast = useToast();
  const rows = useParticipantRows(filters.date);
  const records = useAttendanceRecords(filters.date);
  const dailyRecords = filterDailyRecords(rows, records, filters);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadExcelFile({
        fileName: `주말자습_출석기록_${filters.date}`,
        sheetName: "날짜별 출석 기록",
        data: dailyRecords.map(({ row, record }) => ({
          이름: row.student.name,
          학번: formatStudentNumber(row.student.student),
          시간: formatPeriodTime(row.period),
          장소: row.place,
          상태: getStatusLabel(record),
          "수정 사유": record?.reason || "-",
        })),
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "엑셀 파일 생성에 실패했습니다.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="text-headline font-bold">날짜별 출석 기록</h2>
          <p className="text-caption1 text-text-tertiary">
            선택한 날짜 기준 ({formatWeekendStudyDate(filters.date)})
          </p>
        </div>
        <FilledButton
          role="assistive"
          size="medium"
          display="inline"
          disabled={isDownloading || dailyRecords.length === 0}
          onClick={handleDownload}
        >
          {isDownloading ? "다운로드 중.." : "엑셀 다운로드"}
        </FilledButton>
      </div>
      <WeekendTable
        columns={COLUMNS}
        minWidth="44rem"
        emptyText="조건에 맞는 출석 기록이 없어요."
        rows={dailyRecords.map(({ row, record }) => ({
          key: row.key,
          cells: [
            <span className="font-bold">{row.student.name}</span>,
            formatStudentNumber(row.student.student),
            formatPeriodTime(row.period),
            row.place,
            getStatusLabel(record),
            record?.reason || "-",
          ],
        }))}
      />
    </div>
  );
};

/** 일요일 하루의 출석을 학생·교시 단위로 보여줘요. 장소 목록이 날짜마다 달라서 날짜를 바꾸면 장소 필터를 풀어요. */
const AttendanceDailyRecord = () => {
  const [filters, setFilters] = useState<Filters>({
    date: getCurrentWeekendStudyDate(),
    period: ALL_VALUE,
    place: ALL_VALUE,
    attendance: ALL_VALUE,
    keyword: "",
    classValue: ALL_VALUE,
  });
  const set = (field: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex flex-col gap-5 min-w-0">
      <div className="flex w-full flex-row flex-wrap items-center justify-between gap-3 max-md:flex-col max-md:items-start">
        <SearchInput
          placeholder="학생 이름 또는 학번 검색"
          onSearch={set("keyword")}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            items={getPeriodFilterItems(true)}
            value={filters.period}
            onSelectedItemChange={(item) => set("period")(item.value)}
          />
          <QueryBoundary
            pendingFallback={
              <div className="skeleton h-12 w-24 rounded-medium" />
            }
          >
            <PlaceFilter
              date={filters.date}
              value={filters.place}
              onChange={set("place")}
            />
          </QueryBoundary>
          <Dropdown
            items={ATTENDANCE_FILTER_ITEMS}
            value={filters.attendance}
            onSelectedItemChange={(item) => set("attendance")(item.value)}
          />
          <Dropdown
            items={CLASS_FILTER_ITEMS}
            value={filters.classValue}
            onSelectedItemChange={(item) => set("classValue")(item.value)}
          />
          <WeekendDatePicker
            value={filters.date}
            onChange={(date) =>
              setFilters((prev) => ({ ...prev, date, place: ALL_VALUE }))
            }
          />
        </div>
      </div>
      <QueryBoundary
        pendingFallback={<WeekendTable.Skeleton columns={COLUMNS} />}
      >
        <AttendanceDailyData {...filters} />
      </QueryBoundary>
    </div>
  );
};

export default AttendanceDailyRecord;
