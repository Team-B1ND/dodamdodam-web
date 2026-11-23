import {
  formatPeriodsTime,
  formatStudentNumber,
} from "@/entities/weekend-study/constants";
import {
  useGetWeekendStudyApplicationsQuery,
  useGetWeekendStudyRoomsQuery,
} from "@/entities/weekend-study/queries";
import type { WeekendStudyApplication } from "@/entities/weekend-study/types";
import {
  NIGHT_STUDY_STATUS_COLOR,
  NIGHT_STUDY_STATUS_LABEL,
} from "@/features/manage-night-study-applications/constants/night-study-status";
import RejectDialog from "@/features/manage-night-study-applications/ui/RejectDialog";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Checkbox,
  Dropdown,
  FilledButton,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import {
  ALL_VALUE,
  APPROVAL_FILTER_ITEMS,
  getDateFilterItems,
  getPeriodFilterItems,
} from "../constants/filter-items";
import { useBulkApproval } from "../hooks/useBulkApproval";
import ProjectRentalDialog from "./ProjectRentalDialog";
import SearchInput from "./SearchInput";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

interface Filters {
  date: string;
  keyword: string;
  status: string;
  period: string;
  room: string;
}

const COLUMNS: WeekendTableColumn[] = [
  { label: null, width: "48px" },
  { label: "프로젝트 이름", width: "200px" },
  { label: "실", width: "120px" },
  { label: "진행 날짜", width: "120px" },
  { label: "시간대" },
  { label: "상태", width: "88px" },
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

const ProjectRentalData = ({
  date,
  keyword,
  status,
  period,
  room,
}: Filters) => {
  const { open } = useOverlay();
  const { data } = useGetWeekendStudyApplicationsQuery(date, "PROJECT");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { bulkAllow, bulkReject, isPending } = useBulkApproval();

  const applications = data.filter((application) => {
    if (keyword && !matchesKeyword(application, keyword)) return false;
    if (status !== ALL_VALUE && application.status !== status) return false;
    if (period !== ALL_VALUE && !application.periods.includes(Number(period))) {
      return false;
    }
    const roomId = application.room?.id ?? application.wishRoom?.id;
    if (room !== ALL_VALUE && roomId !== Number(room)) return false;
    return true;
  });

  const toggleOne = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selected = applications.filter((a) => selectedIds.has(a.id));

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

  const openBulkReject = () =>
    open(({ close, exit, isOpen }) => (
      <RejectDialog
        title="실 대여 신청을 거절할까요?"
        isOpen={isOpen}
        isPending={isPending}
        onClose={() => {
          close();
          exit();
        }}
        onConfirm={async (reason) => {
          await bulkReject(
            selected.map((a) => a.id),
            reason,
          );
          setSelectedIds(new Set());
          close();
          exit();
        }}
      />
    ));

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex items-center gap-3">
        <FilledButton
          role="primary"
          size="small"
          display="inline"
          disabled={isPending || selected.length === 0}
          onClick={async () => {
            await bulkAllow(
              selected.filter((a) => a.status !== "ALLOWED").map((a) => a.id),
            );
            setSelectedIds(new Set());
          }}
        >
          일괄 승인
        </FilledButton>
        <FilledButton
          role="negative"
          size="small"
          display="inline"
          disabled={isPending || selected.length === 0}
          onClick={openBulkReject}
        >
          일괄 거절
        </FilledButton>
      </div>
      <WeekendTable
        columns={[
          {
            ...COLUMNS[0],
            label: (
              <Checkbox
                size="small"
                selected={
                  applications.length > 0 &&
                  selected.length === applications.length
                }
                onClick={() =>
                  setSelectedIds(
                    selected.length === applications.length
                      ? new Set()
                      : new Set(applications.map((a) => a.id)),
                  )
                }
              />
            ),
          },
          ...COLUMNS.slice(1),
        ]}
        rows={applications.map((application) => ({
          key: application.id,
          onClick: () => openDetail(application),
          cells: [
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                size="small"
                selected={selectedIds.has(application.id)}
                onClick={() => toggleOne(application.id)}
              />
            </div>,
            <span className="text-headline font-bold">{application.name}</span>,
            application.room?.name ?? (
              <span className="text-text-tertiary">
                {application.wishRoom
                  ? `${application.wishRoom.name} (희망)`
                  : "-"}
              </span>
            ),
            application.date,
            formatPeriodsTime(application.periods),
            <span
              style={{ color: NIGHT_STUDY_STATUS_COLOR[application.status] }}
            >
              {NIGHT_STUDY_STATUS_LABEL[application.status]}
            </span>,
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
  const dateItems = getDateFilterItems();
  const [filters, setFilters] = useState<Filters>({
    date: dateItems[0].value,
    keyword: "",
    status: ALL_VALUE,
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
            items={dateItems}
            value={filters.date}
            onSelectedItemChange={(item) => set("date")(item.value)}
          />
          <Dropdown
            items={APPROVAL_FILTER_ITEMS}
            value={filters.status}
            onSelectedItemChange={(item) => set("status")(item.value)}
          />
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
