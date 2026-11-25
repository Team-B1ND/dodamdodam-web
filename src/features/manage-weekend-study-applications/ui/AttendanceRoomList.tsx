import {
  WEEKEND_STUDY_PERIODS,
  formatPeriod,
} from "@/entities/weekend-study/constants";
import {
  useGetWeekendStudyApplicationsQuery,
  useGetWeekendStudyRoomsQuery,
} from "@/entities/weekend-study/queries";
import {
  Dropdown,
  Table,
  type DropdownItem,
  type TableKey,
} from "@b1nd/dodam-design-system/components";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useState } from "react";
import { getPeriodFilterItems } from "../constants/filter-items";
import {
  getRowRoomKey,
  toParticipantRows,
  type WeekendStudyParticipantRow,
} from "../lib/weekend-study-rows";
import {
  attendanceRecordKey,
  useAttendanceCheckStore,
} from "../stores/attendance-check";
import SearchInput from "./SearchInput";

export interface AttendanceRoom {
  key: string;
  name: string;
}

type RoomStatus = "ALL" | "CHECKED" | "UNCHECKED";

interface Props {
  date: string;
  period: string;
  onPeriodChange: (period: string) => void;
  onSelectRoom: (room: AttendanceRoom) => void;
}

const STATUS_ITEMS: DropdownItem[] = [
  { name: "모든 상태", value: "ALL" },
  { name: "출석 완료", value: "CHECKED" },
  { name: "미출석 있음", value: "UNCHECKED" },
];

const ROOM_TABLE_KEYS: TableKey[] = [
  ["실 이름", "160px"],
  ["신청 인원", "160px"],
  ["미출석 인원", "FULL"],
];

/** 모바일에서는 표를 화면 너비에 맞추려고 열 너비를 줄여요. */
const MOBILE_ROOM_TABLE_KEYS: TableKey[] = [
  ["실 이름", "FULL"],
  ["신청", "64px"],
  ["미출석", "64px"],
];

const CLASSROOMS: AttendanceRoom[] = [1, 2, 3].flatMap((grade) =>
  [1, 2, 3, 4].map((room) => ({
    key: `class-${grade}-${room}`,
    name: `${grade}학년 ${room}반 교실`,
  })),
);

const countStudents = (rows: WeekendStudyParticipantRow[]) =>
  new Set(rows.map((row) => row.student.publicId)).size;

const AttendanceRoomList = ({
  date,
  period,
  onPeriodChange,
  onSelectRoom,
}: Props) => {
  const { data: personal } = useGetWeekendStudyApplicationsQuery(
    date,
    "PERSONAL",
  );
  const { data: project } = useGetWeekendStudyApplicationsQuery(
    date,
    "PROJECT",
  );
  const { data: weekendRooms } = useGetWeekendStudyRoomsQuery();
  const { records } = useAttendanceCheckStore();
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<RoomStatus>("ALL");
  const isMobile = useIsMobile();

  const allRows = toParticipantRows([...personal, ...project]);
  const periodRows = allRows.filter((row) => row.period === Number(period));

  /** 신청이 없는 실도 보이도록 교실·주말 자습실을 먼저 깔고, 목록에 없는 장소(미배정 등)를 뒤에 붙여요. */
  const baseRooms: AttendanceRoom[] = [
    ...CLASSROOMS,
    ...weekendRooms.data.map((room) => ({
      key: `room-${room.id}`,
      name: room.name,
    })),
  ];
  const knownKeys = new Set(baseRooms.map((room) => room.key));
  const extraRooms = new Map<string, AttendanceRoom>();
  periodRows.forEach((row) => {
    const key = getRowRoomKey(row);
    if (!knownKeys.has(key)) extraRooms.set(key, { key, name: row.place });
  });

  const roomStats = [...baseRooms, ...extraRooms.values()].map((room) => {
    const rows = periodRows.filter((row) => getRowRoomKey(row) === room.key);
    const unchecked = rows.filter(
      (row) =>
        !records[
          attendanceRecordKey(row.student.publicId, row.date, row.period)
        ],
    );
    return {
      room,
      memberCount: countStudents(rows),
      unchecked: countStudents(unchecked),
    };
  });

  const rooms = roomStats.filter(({ room, unchecked }) => {
    const matchesKeyword = room.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesStatus =
      status === "ALL" ||
      (status === "CHECKED" ? unchecked === 0 : unchecked > 0);
    return matchesKeyword && matchesStatus;
  });

  const rows = rooms.map(({ room, memberCount, unchecked }) => [
    room.name,
    `${memberCount}명`,
    `${unchecked}명`,
  ]);

  const periodCountText = WEEKEND_STUDY_PERIODS.map(
    (p) =>
      `${formatPeriod(p)}: ${countStudents(allRows.filter((row) => row.period === p))}명`,
  ).join(", ");

  return (
    <div className="flex grow flex-col items-start gap-3 overflow-hidden">
      <div className="flex w-full shrink-0 flex-row flex-wrap items-center justify-between gap-3 max-md:flex-col max-md:items-start">
        <SearchInput onSearch={setKeyword} />

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <p className="text-body2 text-text-secondary">{periodCountText}</p>
          <Dropdown
            items={STATUS_ITEMS}
            value={status}
            onSelectedItemChange={(item) => setStatus(item.value as RoomStatus)}
          />
          <Dropdown
            items={getPeriodFilterItems(false)}
            value={period}
            onSelectedItemChange={(item) => onPeriodChange(item.value)}
          />
        </div>
      </div>

      <div className="scrollbar min-h-0 w-full flex-1 overflow-auto">
        <div className="sm:min-w-120">
          <Table
            keys={isMobile ? MOBILE_ROOM_TABLE_KEYS : ROOM_TABLE_KEYS}
            data={rows}
            onRowClick={(index) => {
              const target = rooms[index];
              if (target) onSelectRoom(target.room);
            }}
          />
        </div>
      </div>
    </div>
  );
};

AttendanceRoomList.Skeleton = () => (
  <div className="flex grow flex-col gap-3">
    <div className="flex items-center justify-between gap-3">
      <div className="skeleton h-12 w-100 max-w-full rounded-small" />
      <div className="skeleton h-12 w-48 rounded-small" />
    </div>
    <div className="flex flex-col">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-12 w-full border-b border-border-normal"
        />
      ))}
    </div>
  </div>
);

export default AttendanceRoomList;
