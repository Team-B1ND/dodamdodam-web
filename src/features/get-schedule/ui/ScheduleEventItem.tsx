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
        <span className="text-text-secondary">
          <span>
            <strong>09:00</strong>&nbsp;
            <span>{item.title}</span>
          </span>
        </span>
      </div>
    );
  }

  const segmentStart = startDate.isAfter(rowStartDate, "day")
    ? startDate
    : rowStartDate;

  if (!cellDate.isSame(segmentStart, "day")) {
    return null;
  }

  const segmentEnd = endDate.isBefore(rowEndDate, "day") ? endDate : rowEndDate;
  const spanDays = segmentEnd.diff(segmentStart, "day") + 1;

  return (
    <div
      className="h-5 rounded-[3px] px-1.5 text-static-white flex items-center whitespace-nowrap overflow-hidden relative z-10"
      style={{
        backgroundColor: item.backgroundColor,
        width: `calc(${spanDays * 100}% + ${spanDays - 1}px)`,
      }}
    >
      <span className="text-static-white">
        <span>
          <strong>09:00</strong>&nbsp;
          <span>{item.title}</span>
        </span>
      </span>
    </div>
  );
};
