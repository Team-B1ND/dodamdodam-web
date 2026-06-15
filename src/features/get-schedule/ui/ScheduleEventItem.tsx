import type { ScheduleEvent } from "@/entities/schedule/types";
import dayjs from "dayjs";

interface ScheduleEventItemProps {
  item: ScheduleEvent;
  cellDate: dayjs.Dayjs;
  rowStartDate: dayjs.Dayjs;
  rowEndDate: dayjs.Dayjs;
}

export const ScheduleEventItem = ({
  item,
  cellDate,
  rowStartDate,
  rowEndDate,
}: ScheduleEventItemProps) => {
  const startDate = dayjs(item.start);
  const endDate = dayjs(item.end);
  const isSingleDay = startDate.isSame(endDate, "day");

  if (isSingleDay) {
    return (
      <div className="w-full flex items-center gap-1">
        <span
          className="size-1.5 rounded-full shrink-0"
          style={{ backgroundColor: item.backgroundColor }}
        />
        <span className="text-text-secondary overflow-hidden text-ellipsis text-nowrap">{item.title}</span>
      </div>
    );
  }

  const segmentStart = startDate.isAfter(rowStartDate, "day")
    ? startDate
    : rowStartDate;

  const segmentEnd = endDate.isBefore(rowEndDate, "day") ? endDate : rowEndDate;
  const spanDays = segmentEnd.diff(segmentStart, "day") + 1;
  const isInSegmentRange =
    !cellDate.isBefore(segmentStart, "day") &&
    !cellDate.isAfter(segmentEnd, "day");

  return cellDate.isSame(segmentStart, "day") ? (
    <div
      className="h-5 rounded-[3px] px-1.5 text-static-white flex items-center whitespace-nowrap overflow-hidden relative z-10"
      style={{
        backgroundColor: item.backgroundColor,
        width: `calc(${spanDays * 100}% + ${spanDays - 1}px + ${1.05 * spanDays}rem - 1rem)`,
      }}
    >
      <span className="text-static-white overflow-hidden text-ellipsis text-nowrap">{item.title}</span>
    </div>
  ) : isInSegmentRange ? (
    <div className="h-5" aria-hidden />
  ) : null;
};
