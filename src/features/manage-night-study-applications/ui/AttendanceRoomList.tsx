import { useGetAttendanceRoomsQuery } from "@/entities/night-study/queries";
import type { AttendanceRoom } from "@/entities/night-study/types";
import {
  Dropdown,
  type DropdownItem,
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
          <div className="grid h-12 grid-cols-[120px_160px_160px_1fr] items-center border-b border-border-normal text-body2 font-semibold text-text-primary">
            <span className="px-2">실 이름</span>
            <span className="px-2">심자 인원</span>
            <span className="px-2">미출석 인원</span>
            <span />
          </div>

          {rooms.length > 0 ? (
            rooms.map((room) => (
              <button
                key={room.roomId}
                type="button"
                aria-label={`${room.roomName}, 심자 ${room.memberCount}명, 미출석 ${room.unchecked}명`}
                className="grid h-12 w-full grid-cols-[120px_160px_160px_1fr] items-center text-left transition-colors hover:bg-fill-primary focus-visible:ring-2 focus-visible:ring-primary-normal"
                onClick={() => onSelectRoom(room)}
              >
                <strong className="px-2 text-headline text-text-primary">
                  {room.roomName}
                </strong>
                <span className="px-2 text-body1 text-text-primary">
                  {room.memberCount}명
                </span>
                <span className="px-2 text-body1 text-text-primary">
                  {room.unchecked}명
                </span>
                <span />
              </button>
            ))
          ) : (
            <p className="py-10 text-center text-body1 text-text-tertiary">
              조건에 맞는 실이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRoomList;
