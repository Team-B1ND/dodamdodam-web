import { formatStudentNumber } from "@/entities/weekend-study/constants";
import { useGetWeekendStudyAttendanceSummariesQuery } from "@/entities/weekend-study/queries";
import type { WeekendStudyAttendanceSummary } from "@/entities/weekend-study/types";
import { downloadExcelFile } from "@/shared/ui/extract-excel";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Dropdown,
  FilledButton,
  SegmentedButton,
  useToast,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import dayjs from "dayjs";
import { useState } from "react";
import { ALL_VALUE, CLASS_FILTER_ITEMS } from "../constants/filter-items";
import { compareStudent } from "../lib/weekend-study-rows";
import AttendanceDailyRecord from "./AttendanceDailyRecord";
import SearchInput from "./SearchInput";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

interface Filters {
  month: string;
  keyword: string;
  classValue: string;
}

const COLUMNS: WeekendTableColumn[] = [
  { label: "이름", width: "120px" },
  { label: "학반" },
  { label: "출석", width: "96px", align: "right" },
  { label: "지각", width: "96px", align: "right" },
  { label: "결석", width: "96px", align: "right" },
];

/** 이번 달부터 지난 5개월까지 선택할 수 있어요. */
const MONTH_ITEMS = Array.from({ length: 6 }).map((_, idx) => {
  const month = dayjs().subtract(idx, "month");
  return {
    name: `${month.year()}년 ${month.month() + 1}월`,
    value: month.format("YYYY-MM"),
  };
});

const getRange = (month: string) => {
  const start = dayjs(`${month}-01`);
  return {
    startAt: start.format("YYYY-MM-DD"),
    endAt: start.endOf("month").format("YYYY-MM-DD"),
  };
};

const filterSummaries = (
  summaries: WeekendStudyAttendanceSummary[],
  { keyword, classValue }: Filters,
) =>
  summaries
    .filter(({ student }) => {
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
    .sort((a, b) => compareStudent(a.student, b.student));

const AttendanceRecordData = (filters: Filters) => {
  const toast = useToast();
  const { startAt, endAt } = getRange(filters.month);
  const { data } = useGetWeekendStudyAttendanceSummariesQuery(startAt, endAt);
  const summaries = filterSummaries(data, filters);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadExcelFile({
        fileName: `주말자습_출석기록_${filters.month}`,
        sheetName: "학생별 누적 집계",
        data: summaries.map(({ student, attendance, late, absent }) => ({
          이름: student.name,
          학번: formatStudentNumber(student.student),
          출석: attendance,
          지각: late,
          결석: absent,
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
          <h2 className="text-headline font-bold">학생별 누적 집계</h2>
          <p className="text-caption1 text-text-tertiary">
            선택한 기간 기준 ({dayjs(startAt).month() + 1}월{" "}
            {dayjs(startAt).date()}일 ~ {dayjs(endAt).month() + 1}월{" "}
            {dayjs(endAt).date()}일)
          </p>
        </div>
        <FilledButton
          role="assistive"
          size="medium"
          display="inline"
          disabled={isDownloading || summaries.length === 0}
          onClick={handleDownload}
        >
          {isDownloading ? "다운로드 중.." : "엑셀 다운로드"}
        </FilledButton>
      </div>
      <WeekendTable
        columns={COLUMNS}
        minWidth="32rem"
        emptyText="출석 기록이 없어요."
        rows={summaries.map(({ student, attendance, late, absent }) => ({
          key: student.publicId,
          cells: [
            <span className="font-bold">{student.name}</span>,
            formatStudentNumber(student.student),
            attendance,
            late,
            absent,
          ],
        }))}
      />
    </div>
  );
};

const AttendanceSummary = () => {
  const [filters, setFilters] = useState<Filters>({
    month: MONTH_ITEMS[0].value,
    keyword: "",
    classValue: ALL_VALUE,
  });
  const set = (field: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex flex-col gap-5 min-w-0">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="학생 이름 또는 학번 검색"
          onSearch={set("keyword")}
        />
        <Dropdown
          items={MONTH_ITEMS}
          value={filters.month}
          onSelectedItemChange={(item) => set("month")(item.value)}
        />
        <Dropdown
          items={CLASS_FILTER_ITEMS}
          value={filters.classValue}
          onSelectedItemChange={(item) => set("classValue")(item.value)}
        />
      </div>
      <QueryBoundary
        pendingFallback={<WeekendTable.Skeleton columns={COLUMNS} />}
      >
        <AttendanceRecordData {...filters} />
      </QueryBoundary>
    </div>
  );
};

type View = "summary" | "daily";

/** 월별 누적 집계에는 장소·교시별 상태가 없어서, 장소·상태 필터는 날짜별 기록에 둬요. */
const AttendanceRecordTable = () => {
  const [segment, setSegment] = useState<SegmentedButtonData[]>([
    { text: "학생별 누적", value: "summary", isActive: true },
    { text: "날짜별 기록", value: "daily", isActive: false },
  ]);
  const [view, setView] = useState<View>("summary");

  return (
    <div className="flex flex-col gap-5 min-w-0">
      <SegmentedButton
        data={segment}
        setData={setSegment}
        onBlockClick={(value) => setView(value as View)}
        width="16rem"
      />
      {view === "summary" ? <AttendanceSummary /> : <AttendanceDailyRecord />}
    </div>
  );
};

export default AttendanceRecordTable;
