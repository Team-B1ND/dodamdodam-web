import { useUpdateAttendanceMutation } from "@/entities/night-study/mutations";
import { useGetAttendanceRoomQuery } from "@/entities/night-study/queries";
import type { AttendanceRoom } from "@/entities/night-study/types";
import { ATTENDANCE_TABLE_KEYS } from "@/features/manage-night-study-applications/constants/attendance-table-keys";
import {
  Dropdown,
  Table,
  type DropdownItem,
} from "@b1nd/dodam-design-system/components";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  ArrowLeft,
  MagnifyingGlass,
} from "@b1nd/dodam-design-system/icons";
import { type FormEvent, useMemo, useState } from "react";
import AttendanceActionCell from "./AttendanceActionCell";

type AttendanceStatus = "ALL" | "ATTENDED" | "UNATTENDED";

interface Props {
  room: AttendanceRoom;
  date: string;
  period: number;
  onBack: () => void;
}

const STATUS_ITEMS: DropdownItem[] = [
  { name: "모든 상태", value: "ALL" },
  { name: "출석 학생", value: "ATTENDED" },
  { name: "미출석 학생", value: "UNATTENDED" },
];

const AttendanceRoomDetail = ({ room, date, period, onBack }: Props) => {
  const { data } = useGetAttendanceRoomQuery({
    roomId: room.roomId,
    date,
    period,
  });
  const { mutate: updateAttendance, isPending: isUpdating } =
    useUpdateAttendanceMutation();
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("ALL");
  const [grade, setGrade] = useState("ALL");
  const [classroom, setClassroom] = useState("ALL");
  const members = data.data.roomMembers;

  const gradeItems = useMemo<DropdownItem[]>(
    () => [
      { name: "모든 학년", value: "ALL" },
      ...Array.from(new Set(members.map((member) => member.grade)))
        .sort((left, right) => left - right)
        .map((value) => ({ name: `${value}학년`, value: String(value) })),
    ],
    [members],
  );

  const classroomItems = useMemo<DropdownItem[]>(
    () => [
      { name: "모든 학반", value: "ALL" },
      ...Array.from(new Set(members.map((member) => member.room)))
        .sort((left, right) => left - right)
        .map((value) => ({ name: `${value}반`, value: String(value) })),
    ],
    [members],
  );

  const filteredMembers = members.filter((member) => {
    const studentInfo = `${member.name} ${member.grade}학년 ${member.room}반 ${member.number}번`;
    const matchesKeyword = studentInfo
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesStatus =
      status === "ALL" ||
      (status === "ATTENDED" ? member.attended : !member.attended);
    const matchesGrade = grade === "ALL" || member.grade === Number(grade);
    const matchesClassroom =
      classroom === "ALL" || member.room === Number(classroom);

    return (
      matchesKeyword && matchesStatus && matchesGrade && matchesClassroom
    );
  });

  const rows = filteredMembers.map((member) => [
    member.name,
    `${member.grade}학년 ${member.room}반 ${member.number}번`,
    null,
    <AttendanceActionCell
      attended={member.attended}
      disabled={isUpdating}
      onAttend={() =>
        updateAttendance({
          userId: member.userId,
          date,
          period,
          attended: true,
        })
      }
      onRevert={() =>
        updateAttendance({
          userId: member.userId,
          date,
          period,
          attended: false,
        })
      }
    />,
  ]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setKeyword(keywordInput.trim());
  };

  return (
    <div className="flex grow flex-col items-start gap-3 overflow-hidden">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="실 목록으로 돌아가기"
          className="flex size-12 items-center justify-center rounded-medium hover:bg-fill-primary focus-visible:ring-2 focus-visible:ring-primary-normal"
          onClick={onBack}
        >
          <ArrowLeft size={24} color={colors.text.primary} />
        </button>
        <h1 className="text-title2 font-medium text-text-primary">
          {room.roomName}
        </h1>
      </div>

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
          <Dropdown
            items={STATUS_ITEMS}
            value={status}
            onSelectedItemChange={(item) =>
              setStatus(item.value as AttendanceStatus)
            }
          />
          <Dropdown
            items={gradeItems}
            value={grade}
            onSelectedItemChange={(item) => setGrade(item.value)}
          />
          <Dropdown
            items={classroomItems}
            value={classroom}
            onSelectedItemChange={(item) => setClassroom(item.value)}
          />
        </div>
      </div>

      <div className="scrollbar min-h-0 w-full flex-1 overflow-auto">
        <div className="min-w-120">
          {rows.length > 0 ? (
            <Table keys={ATTENDANCE_TABLE_KEYS} data={rows} />
          ) : (
            <p className="py-10 text-center text-body1 text-text-tertiary">
              조건에 맞는 학생이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRoomDetail;
