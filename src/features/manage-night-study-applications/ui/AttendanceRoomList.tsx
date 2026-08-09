import { useGetAttendanceRoomsQuery } from "@/entities/night-study/queries";
import type { AttendanceRoom } from "@/entities/night-study/types";
import {
  Dropdown,
  Table,
  type DropdownItem,
  type TableKey,
} from "@b1nd/dodam-design-system/components";
import { colors } from "@b1nd/dodam-design-system/colors";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { type FormEvent, useState } from "react";
import NightStudyAttendanceExcelButton from "./NightStudyAttendanceExcelButton";

type RoomStatus = "ALL" | "CHECKED" | "UNCHECKED";

interface Props {
  date: string;
  period: number;
  onPeriodChange: (period: number) => void;
  onSelectRoom: (room: AttendanceRoom) => void;
}

const STATUS_ITEMS: DropdownItem[] = [
  { name: "모든 상태", value: "ALL" },
  { name: "출석 완료", value: "CHECKED" },
  { name: "미출석 있음", value: "UNCHECKED" },
];

const PERIOD_ITEMS: DropdownItem[] = [
  { name: "심자 1", value: "1" },
  { name: "심자 2", value: "2" },
];

const ROOM_TABLE_KEYS: TableKey[] = [
  ["실 이름", "120px"],
  ["심자 인원", "160px"],
  ["미출석 인원", "FULL"],
];

const AttendanceRoomList = ({
  date,
  period,
  onPeriodChange,
  onSelectRoom,
}: Props) => {
  const { data } = useGetAttendanceRoomsQuery({ date, period });
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<RoomStatus>("ALL");

  const rooms = data.data.filter((room) => {
    const matchesKeyword = room.roomName
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesStatus =
      status === "ALL" ||
      (status === "CHECKED" ? room.unchecked === 0 : room.unchecked > 0);

    return matchesKeyword && matchesStatus;
  });
  const rows = rooms.map((room) => [
    room.roomName,
    `${room.memberCount}명`,
    `${room.unchecked}명`,
  ]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setKeyword(keywordInput.trim());
  };

  return (
    <div className="flex grow flex-col items-start gap-3 overflow-hidden">
      <div className="flex w-full shrink-0 flex-row flex-wrap items-center justify-between gap-3 max-md:flex-col max-md:items-start">
        <form
          className="flex h-12 w-100 max-w-full items-center gap-3 rounded-small bg-fill-primary px-3"
          onSubmit={handleSearch}
        >
          <MagnifyingGlass size={24} color={colors.text.placeholder} />
          <input
            className="min-w-0 flex-1 bg-transparent text-headline text-text-primary outline-none placeholder:text-text-placeholder"
            placeholder="검색어 입력 후 Enter key를 누르세요."
            value={keywordInput}
            onChange={(event) => setKeywordInput(event.target.value)}
          />
        </form>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <NightStudyAttendanceExcelButton keyword={keyword} period={period} />
          <Dropdown
            items={STATUS_ITEMS}
            value={status}
            onSelectedItemChange={(item) =>
              setStatus(item.value as RoomStatus)
            }
          />
          <Dropdown
            items={PERIOD_ITEMS}
            value={String(period)}
            onSelectedItemChange={(item) =>
              onPeriodChange(Number(item.value))
            }
          />
        </div>
      </div>

      <div className="scrollbar min-h-0 w-full flex-1 overflow-auto">
        <div className="min-w-120">
          <Table
            keys={ROOM_TABLE_KEYS}
            data={rows}
            onRowClick={(index) => {
              const room = rooms[index];
              if (room) onSelectRoom(room);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceRoomList;
