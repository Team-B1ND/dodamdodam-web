import type { ScheduleEvent } from "@/entities/schedule/types";
import dayjs from "dayjs";
import { ScheduleEventItem } from "./ScheduleEventItem";

interface ScheduleCalendarCellProps {
  index: number;
  firstDay: number;
  daysInMonth: number;
  currentMonth: string;
  scheduleEvents: ScheduleEvent[];
  today: string;
}

export const ScheduleCalendarCell = ({
  index,
  firstDay,
  daysInMonth,
  currentMonth,
  scheduleEvents,
  today,
}: ScheduleCalendarCellProps) => {
  const colIndex = index % 7;
  const rowIndex = Math.floor(index / 7);
  const isLastCol = colIndex === 6;
  const isLastRow = rowIndex === 5;
  const cellBorderClass = `${!isLastCol ? "border-r " : ""}${!isLastRow ? "border-b" : ""}`;
  const dateNumber = index - firstDay + 1;
  const isInMonth = dateNumber >= 1 && dateNumber <= daysInMonth;

  if (!isInMonth) {
    return <div className={`${cellBorderClass} border-line-primary`} />;
  }

  const date = dayjs(currentMonth).date(dateNumber).format("YYYY-MM-DD");
  const cellDate = dayjs(date);
  const rowStartDate = cellDate.subtract(colIndex, "day");
  const rowEndDate = rowStartDate.add(6, "day");

  const daySchedules = scheduleEvents
    .filter((item) => {
      const startDate = dayjs(item.start);
      const endDate = dayjs(item.end);

      return (
        !cellDate.isBefore(startDate, "day") &&
        !cellDate.isAfter(endDate, "day")
      );
    })
    .sort((a, b) => {
      const durationA = dayjs(a.end).diff(dayjs(a.start), "day");
      const durationB = dayjs(b.end).diff(dayjs(b.start), "day");
      return durationB - durationA;
    });

  const isToday = date === today;

  return (
    <div
      key={date}
      className={`${cellBorderClass} border-line-primary px-2 py-1.5 flex flex-col items-end gap-1 relative overflow-visible`}
    >
      <span
        className={`text-body1 font-medium ${
          isToday
            ? "bg-brand-primary text-static-white rounded-[12px] min-w-8 h-8 px-2 inline-flex items-center justify-center leading-none"
            : "text-text-secondary"
        }`}
      >
        {dateNumber}
      </span>
      <div className="w-full flex flex-col gap-0.5">
        {daySchedules.slice(0, 2).map((item) => (
          <ScheduleEventItem
            key={item.id}
            item={item}
            cellDate={cellDate}
            rowStartDate={rowStartDate}
            rowEndDate={rowEndDate}
          />
        ))}
      </div>
    </div>
  );
};
