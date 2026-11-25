import {
  formatPeriodsTime,
  formatStudentNumber,
} from "@/entities/weekend-study/constants";
import {
  useGetWeekendStudyApplicationsQuery,
  useGetWeekendStudyRoomsQuery,
} from "@/entities/weekend-study/queries";
import type { WeekendStudyApplication } from "@/entities/weekend-study/types";
import QueryBoundary from "@/shared/ui/query-boundary";
import { Dropdown, useOverlay } from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import {
  ALL_VALUE,
  getCurrentWeekendStudyDate,
  getPeriodFilterItems,
} from "../constants/filter-items";
import ProjectRentalDialog from "./ProjectRentalDialog";
import SearchInput from "./SearchInput";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

interface Filters {
  date: string;
  keyword: string;
  period: string;
  room: string;
}

const COLUMNS: WeekendTableColumn[] = [
  { label: "프로젝트 이름", width: "200px" },
  { label: "실", width: "120px" },
  { label: "진행 날짜", width: "120px" },
  { label: "시간대", width: "160px" },
  { label: "인원" },
];

const matchesKeyword = (
  application: WeekendStudyApplication,
  keyword: string,
) =>
  [application.leader, ...application.members].some(
    (member) =>
      member.name.includes(keyword) ||
      formatStudentNumber(member.student).includes(keyword),
  ) || (application.name ?? "").includes(keyword);

const ProjectRentalData = ({ date, keyword, period, room }: Filters) => {
  const { open } = useOverlay();
  const { data } = useGetWeekendStudyApplicationsQuery(date, "PROJECT");

  const applications = data.filter((application) => {
    if (keyword && !matchesKeyword(application, keyword)) return false;
    if (period !== ALL_VALUE && !application.periods.includes(Number(period))) {
      return false;
    }
    if (room !== ALL_VALUE && application.room?.id !== Number(room))
      return false;
    return true;
  });

  const openDetail = (application: WeekendStudyApplication) =>
    open(({ close, exit, isOpen }) => (
      <ProjectRentalDialog
        application={application}
        isOpen={isOpen}
        onClose={() => {
          close();
          exit();
        }}
      />
    ));

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <WeekendTable
        columns={COLUMNS}
        rows={applications.map((application) => ({
          key: application.id,
          onClick: () => openDetail(application),
          cells: [
            <span className="text-headline font-bold">{application.name}</span>,
            application.room?.name ?? "-",
            application.date,
            formatPeriodsTime(application.periods),
            `${application.members.length + 1}명`,
          ],
        }))}
      />
    </div>
  );
};

const RoomFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { data } = useGetWeekendStudyRoomsQuery();
  return (
    <Dropdown
      items={[
        { name: "모든 실", value: ALL_VALUE },
        ...data.data.map((room) => ({
          name: room.name,
          value: String(room.id),
        })),
      ]}
      value={value}
      onSelectedItemChange={(item) => onChange(item.value)}
    />
  );
};

const ProjectRentalTable = () => {
  const [filters, setFilters] = useState<Filters>({
    date: getCurrentWeekendStudyDate(),
    keyword: "",
    period: ALL_VALUE,
    room: ALL_VALUE,
  });
  const set = (field: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SearchInput onSearch={set("keyword")} />
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            items={getPeriodFilterItems(true)}
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
      </div>
      <QueryBoundary
        pendingFallback={<WeekendTable.Skeleton columns={COLUMNS} />}
      >
        <ProjectRentalData key={filters.date} {...filters} />
      </QueryBoundary>
    </div>
  );
};

export default ProjectRentalTable;
