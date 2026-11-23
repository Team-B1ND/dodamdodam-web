import {
  WEEKEND_STUDY_PERIODS,
  formatPeriod,
  getWeekendStudyDate,
  groupContinuousPeriods,
} from "@/entities/weekend-study/constants";
import {
  useGetMyProjectWeekendStudyQuery,
  useGetWeekendStudyRoomsQuery,
} from "@/entities/weekend-study/queries";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { Calendar } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { useState } from "react";
import { useApplyProjectWeekendStudy } from "../hooks/useApplyProjectWeekendStudy";

type CellState =
  | { type: "available" }
  | { type: "selected" }
  | { type: "reserved"; label: string };

const CELL_CLASS: Record<CellState["type"], string> = {
  available:
    "border border-border-normal bg-background-surface text-brand-primary hover:bg-fill-primary cursor-pointer",
  selected: "bg-brand-primary text-static-white cursor-pointer",
  reserved: "bg-fill-primary text-text-tertiary cursor-not-allowed",
};

const CELL_TEXT: Record<CellState["type"], string> = {
  available: "예약 가능",
  selected: "선택됨",
  reserved: "예약됨",
};

const LEGENDS = [
  {
    label: "예약 가능",
    className: "border border-border-normal bg-background-surface",
  },
  { label: "예약됨 (내 신청)", className: "bg-fill-primary" },
  { label: "내가 선택한 시간", className: "bg-brand-primary" },
];

const RoomReservationBoard = () => {
  const { data: rooms } = useGetWeekendStudyRoomsQuery();
  const { data: myProjects } = useGetMyProjectWeekendStudyQuery();
  const { form, selectCell } = useApplyProjectWeekendStudy();
  const date = getWeekendStudyDate();
  const dateText = date.format("YYYY-MM-DD");

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

  /** 학생은 다른 팀의 예약을 조회할 수 없어서, 내가 이미 신청한 실·교시만 예약됨으로 표시해요. */
  const reservedMap = new Map<string, string>();
  myProjects.data
    .filter(
      (project) => project.date === dateText && project.status !== "REJECTED",
    )
    .forEach((project) => {
      const room = project.room ?? project.wishRoom;
      if (!room) return;
      project.periods.forEach((period) =>
        reservedMap.set(`${room.id}-${period}`, project.name),
      );
    });

  const getCellState = (roomId: number, period: number): CellState => {
    const reserved = reservedMap.get(`${roomId}-${period}`);
    if (reserved) return { type: "reserved", label: reserved };
    if (form.roomId === roomId && form.periods.includes(period)) {
      return { type: "selected" };
    }
    return { type: "available" };
  };

  const visibleRooms = rooms.data.filter(
    (room) => !floor || room.floor === Number(floor),
  );
  const selectedRoom = rooms.data.find((room) => room.id === form.roomId);
  const selectedRanges = groupContinuousPeriods(form.periods)
    .map((group) => `${group[0]}:00–${group.at(-1)! + 1}:00`)
    .join(", ");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline font-bold">실 예약 현황</h1>
        <p className="text-caption2 text-status-error">
          (원하는 실과 시간을 눌러 선택하세요. 실 대여는 선착순으로 승인되며,
          실이 모두 소진된 경우 대기중으로 표시됩니다.)
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
        <div className="flex items-center gap-3">
          <p className="text-headline font-regular text-brand-primary">
            {date.month() + 1}월 {date.date()}일
          </p>
          <Calendar size={24} color={colors.brand.primary} />
        </div>
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
                  const state = getCellState(room.id, period);
                  return (
                    <td key={period}>
                      <button
                        type="button"
                        disabled={state.type === "reserved"}
                        aria-pressed={state.type === "selected"}
                        aria-label={`${room.name} ${formatPeriod(period)} ${CELL_TEXT[state.type]}`}
                        onClick={() => selectCell(room.id, period)}
                        className={`w-full h-12 rounded-medium flex flex-col items-center justify-center transition-colors ${CELL_CLASS[state.type]}`}
                      >
                        <span className="text-label font-bold">
                          {CELL_TEXT[state.type]}
                        </span>
                        {state.type === "reserved" && (
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
          <p className="py-8 text-center text-border-normal">
            대여 가능한 실이 없어요.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {LEGENDS.map((legend) => (
          <div key={legend.label} className="flex items-center gap-1.5">
            <span
              className={`size-3.5 rounded-extrasmall ${legend.className}`}
            />
            <span className="text-caption1 text-text-tertiary">
              {legend.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full rounded-medium bg-fill-primary px-4 py-2.5 flex items-center gap-2">
        <span className="text-body2 text-text-tertiary shrink-0">
          선택한 실
        </span>
        <span className="text-body2 font-bold truncate">
          {selectedRoom && form.periods.length
            ? `${selectedRoom.name} · ${date.month() + 1}월 ${date.date()}일 ${selectedRanges} (${form.periods.length}시간)`
            : "아직 선택하지 않았어요."}
        </span>
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
