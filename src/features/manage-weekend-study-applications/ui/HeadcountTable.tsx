import {
  useGetWeekendStudyApplicationsQuery,
  useGetWeekendStudyRoomsQuery,
} from "@/entities/weekend-study/queries";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  Dropdown,
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import {
  ALL_VALUE,
  getDateFilterItems,
  getDefaultPeriod,
  getPeriodFilterItems,
} from "../constants/filter-items";
import { toParticipantRows } from "../lib/weekend-study-rows";
import WeekendTable, { type WeekendTableColumn } from "./WeekendTable";

type Group = "floor" | "room";

interface Filters {
  date: string;
  period: string;
  floor: string;
  group: Group;
}

const CLASSROOM_LABEL = "교실 (개별 자습)";

const getColumns = (group: Group): WeekendTableColumn[] => [
  { label: group === "floor" ? "층" : "실" },
  { label: "총인원", width: "160px" },
];

const HeadcountData = ({ date, period, floor, group }: Filters) => {
  const { data: rooms } = useGetWeekendStudyRoomsQuery();
  const { data: personal } = useGetWeekendStudyApplicationsQuery(
    date,
    "PERSONAL",
  );
  const { data: project } = useGetWeekendStudyApplicationsQuery(
    date,
    "PROJECT",
  );

  const rows = toParticipantRows([...personal, ...project]).filter(
    (row) => period === ALL_VALUE || row.period === Number(period),
  );
  const roomFloor = new Map(rooms.data.map((room) => [room.id, room.floor]));

  const countStudents = (filter: (row: (typeof rows)[number]) => boolean) =>
    new Set(rows.filter(filter).map((row) => row.student.publicId)).size;

  const isInFloor = (row: (typeof rows)[number]) =>
    floor === ALL_VALUE ||
    (row.roomId !== null && roomFloor.get(row.roomId) === Number(floor));

  const groups =
    group === "floor"
      ? [...new Set(rooms.data.map((room) => room.floor))]
          .sort((a, b) => a - b)
          .filter((f) => floor === ALL_VALUE || f === Number(floor))
          .map((f) => ({
            key: `floor-${f}`,
            label: `${f}층`,
            count: countStudents(
              (row) => row.roomId !== null && roomFloor.get(row.roomId) === f,
            ),
          }))
      : rooms.data
          .filter((room) => floor === ALL_VALUE || room.floor === Number(floor))
          .map((room) => ({
            key: `room-${room.id}`,
            label: room.name,
            count: countStudents((row) => row.roomId === room.id),
          }));

  const classroom =
    floor === ALL_VALUE
      ? [
          {
            key: "classroom",
            label: CLASSROOM_LABEL,
            count: countStudents((row) => row.type === "PERSONAL"),
          },
        ]
      : [];

  const total = {
    key: "total",
    label: "전체",
    count: countStudents((row) =>
      floor === ALL_VALUE ? true : row.type === "PROJECT" && isInFloor(row),
    ),
  };

  return (
    <WeekendTable
      columns={getColumns(group)}
      minWidth="20rem"
      emptyText="등록된 실이 없어요."
      rows={[...groups, ...classroom, total].map((item) => ({
        key: item.key,
        className: item.key === "total" ? "border-t border-border-normal" : "",
        cells: [
          <span className="font-bold">{item.label}</span>,
          <span className="font-bold">{item.count}명</span>,
        ],
      }))}
    />
  );
};

const FloorFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { data } = useGetWeekendStudyRoomsQuery();
  const floors = [...new Set(data.data.map((room) => room.floor))].sort(
    (a, b) => a - b,
  );
  return (
    <Dropdown
      items={[
        { name: "모든 층", value: ALL_VALUE },
        ...floors.map((f) => ({ name: `${f}층`, value: String(f) })),
      ]}
      value={value}
      onSelectedItemChange={(item) => onChange(item.value)}
    />
  );
};

const HeadcountTable = () => {
  const dateItems = getDateFilterItems();
  const [segment, setSegment] = useState<SegmentedButtonData[]>([
    { text: "층 별", value: "floor", isActive: true },
    { text: "실 별", value: "room", isActive: false },
  ]);
  const [filters, setFilters] = useState<Filters>({
    date: dateItems[0].value,
    period: getDefaultPeriod(),
    floor: ALL_VALUE,
    group: "floor",
  });
  const set = (field: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex flex-col gap-5 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedButton
          data={segment}
          setData={setSegment}
          onBlockClick={set("group")}
          width="14rem"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            items={dateItems}
            value={filters.date}
            onSelectedItemChange={(item) => set("date")(item.value)}
          />
          <QueryBoundary
            pendingFallback={
              <div className="skeleton h-12 w-24 rounded-medium" />
            }
          >
            <FloorFilter value={filters.floor} onChange={set("floor")} />
          </QueryBoundary>
          <Dropdown
            items={getPeriodFilterItems(true)}
            value={filters.period}
            onSelectedItemChange={(item) => set("period")(item.value)}
          />
        </div>
      </div>
      <QueryBoundary
        pendingFallback={
          <WeekendTable.Skeleton
            columns={getColumns(filters.group)}
            count={3}
          />
        }
      >
        <HeadcountData {...filters} />
      </QueryBoundary>
    </div>
  );
};

export default HeadcountTable;
