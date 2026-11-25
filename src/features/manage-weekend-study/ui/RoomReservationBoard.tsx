import { padDate } from "@/shared/utils/pad-date";
import {
  WEEKEND_STUDY_PERIODS,
  formatPeriod,
} from "@/entities/weekend-study/constants";
import {
  useGetMyProjectWeekendStudyQuery,
  useGetWeekendStudyRoomStatusQuery,
} from "@/entities/weekend-study/queries";
import {
  DatePicker,
  FilledButton,
  SegmentedButton,
  type SegmentedButtonData,
  PickerTrigger,
} from "@b1nd/dodam-design-system/components";
import dayjs from "dayjs";
import { useState } from "react";
import { useApplyProjectWeekendStudy } from "../hooks/useApplyProjectWeekendStudy";

type CellState =
  | { type: "available" }
  | { type: "selected" }
  | { type: "reserved"; label?: string }
  | { type: "blocked"; label?: string };

const CELL_CLASS: Record<CellState["type"], string> = {
  available:
    "border border-border-normal bg-background-surface text-brand-primary hover:bg-fill-primary cursor-pointer",
  selected: "bg-brand-primary text-static-white cursor-pointer",
  reserved: "bg-fill-primary text-text-tertiary cursor-not-allowed",
  blocked: "bg-status-error/10 text-status-error cursor-not-allowed",
};

const CELL_TEXT: Record<CellState["type"], string> = {
  available: "예약 가능",
  selected: "선택됨",
  reserved: "예약됨",
  blocked: "사용 제한",
};

const RoomReservationBoard = () => {
  const { form, changeDate, selectCell, editingId } =
    useApplyProjectWeekendStudy();
  const dateText = form.date;
  const date = dayjs(dateText);
  const { data: rooms } = useGetWeekendStudyRoomStatusQuery(dateText);
  const { data: myProjects } = useGetMyProjectWeekendStudyQuery();

  const floors = [...new Set(rooms.data.map((room) => room.floor))].sort(
    (a, b) => a - b,
  );
  const [floorSegment, setFloorSegment] = useState<SegmentedButtonData[]>(
    () => [
      { text: "전체", value: "", isActive: true },
      ...floors.map((floor) => ({
        text: `${floor}층`,
        value: String(floor),
        isActive: false,
      })),
    ],
  );
  const [floor, setFloor] = useState("");

  /** 서버는 누가 예약했는지 내려주지 않아서, 내가 신청한 칸에만 팀 이름을 붙여요. */
  const myReservations = new Map<string, string>();
  /** 수정 중인 신청이 잡아 둔 칸은 서버가 수정할 때 비워주니 다시 고를 수 있어요. */
  const editingCells = new Set<string>();
  myProjects.data
    .filter((project) => project.id === editingId && project.room)
    .forEach((project) =>
      project.periods.forEach((period) =>
        editingCells.add(`${project.room!.id}-${period}`),
      ),
    );
  myProjects.data
    .filter((project) => project.date === dateText && project.room)
    .forEach((project) =>
      project.periods.forEach((period) =>
        myReservations.set(`${project.room!.id}-${period}`, project.name),
      ),
    );

  const getCellState = (
    room: (typeof rooms.data)[number],
    period: number,
  ): CellState => {
    const status = room.periods.find((p) => p.period === period);
    if (status?.status === "BLOCKED") {
      return { type: "blocked", label: status.reason ?? undefined };
    }
    if (
      status?.status === "RESERVED" &&
      !editingCells.has(`${room.id}-${period}`)
    ) {
      return {
        type: "reserved",
        label: myReservations.get(`${room.id}-${period}`),
      };
    }
    if (form.roomId === room.id && form.periods.includes(period)) {
      return { type: "selected" };
    }
    return { type: "available" };
  };

  const visibleRooms = rooms.data.filter(
    (room) => !floor || room.floor === Number(floor),
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline font-bold">실 예약 현황</h1>
        <p className="text-caption2 text-status-error">
          (원하는 실과 시간을 눌러 선택하세요. 사용 제한된 실은 사유와 함께
          표시됩니다.)
        </p>
      </div>
      <div className="w-full flex flex-wrap items-center justify-between gap-3">
        {floors.length > 1 ? (
          <SegmentedButton
            data={floorSegment}
            setData={setFloorSegment}
            onBlockClick={setFloor}
            width="14rem"
          />
        ) : (
          <div />
        )}
        {/* 버튼이 행 오른쪽 끝이라 달력을 오른쪽 기준으로 펼쳐요. DS 스타일(emotion)은 CSS 레이어 밖이라 left는 !important로 덮어요. */}
        {editingId ? (
          <FilledButton role="assistive" size="medium" disabled>
            {padDate(date.toDate())}
          </FilledButton>
        ) : (
          <div className="[&>div>div:last-child]:left-auto! [&>div>div:last-child]:right-0">
            <PickerTrigger
              content={({ onClose }) => (
                <DatePicker.Content
                  date={date.toDate()}
                  onChangeDate={changeDate}
                  onClose={onClose}
                  disablePast
                />
              )}
            >
              <FilledButton role="assistive" size="medium">
                {padDate(date.toDate())}
              </FilledButton>
            </PickerTrigger>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-160 border-separate border-spacing-x-2 border-spacing-y-2 -mx-2">
          <thead>
            <tr className="text-caption1 font-medium text-text-tertiary">
              <th className="text-left font-medium">실</th>
              <th className="text-left font-medium w-16">층</th>
              {WEEKEND_STUDY_PERIODS.map((period) => (
                <th key={period} className="font-medium w-[18%]">
                  {formatPeriod(period)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRooms.map((room) => (
              <tr key={room.id}>
                <td className="text-body1 font-medium whitespace-nowrap">
                  {room.name}
                </td>
                <td className="text-body1 text-text-tertiary whitespace-nowrap">
                  {room.floor}층
                </td>
                {WEEKEND_STUDY_PERIODS.map((period) => {
                  const state = getCellState(room, period);
                  return (
                    <td key={period}>
                      <button
                        type="button"
                        disabled={
                          state.type === "reserved" || state.type === "blocked"
                        }
                        aria-pressed={state.type === "selected"}
                        aria-label={`${room.name} ${formatPeriod(period)} ${CELL_TEXT[state.type]}`}
                        onClick={() => selectCell(room.id, period)}
                        className={`w-full h-12 rounded-medium flex flex-col items-center justify-center ${CELL_CLASS[state.type]}`}
                      >
                        <span className="text-label font-bold">
                          {CELL_TEXT[state.type]}
                        </span>
                        {"label" in state && state.label && (
                          <span className="text-caption2 truncate max-w-full px-1">
                            {state.label}
                          </span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRooms.length === 0 && (
          <p className="py-12 text-center text-body1 text-text-tertiary">
            대여 가능한 실이 없어요.
          </p>
        )}
      </div>
    </div>
  );
};

RoomReservationBoard.Skeleton = () => (
  <div className="w-full flex flex-col gap-4">
    <div className="skeleton h-7 w-40 rounded-small" />
    <div className="skeleton h-10 w-56 rounded-medium" />
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="skeleton h-12 w-full rounded-medium" />
    ))}
  </div>
);

export default RoomReservationBoard;
