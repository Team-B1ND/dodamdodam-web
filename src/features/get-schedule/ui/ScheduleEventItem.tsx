import type { ScheduleEvent } from "@/entities/schedule/types";
import { parseDate } from "@/shared/utils/parse-date";
import { Dialog, useOverlay } from "@b1nd/dodam-design-system/components";
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
  const { open } = useOverlay();
  const startDate = dayjs(item.start);
  const endDate = dayjs(item.end);
  const isSingleDay = startDate.isSame(endDate, "day");

  const openDetailDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title={item.title}
        onClose={close}
        onExited={exit}
        closeOnDimmerClick
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 text-body1">
            <div className="flex gap-2">
              <span className="text-text-secondary w-20 shrink-0">기간</span>
              <span>
                {parseDate(item.start)}
                {!isSingleDay && ` ~ ${parseDate(item.end)}`}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-text-secondary w-20 shrink-0">대상</span>
              <span>{item.attendees.join(", ")}</span>
            </div>
          </div>
          <Dialog.FilledButton role="assistive" onClick={close}>
            닫기
          </Dialog.FilledButton>
        </div>
      </Dialog>
    ));
  };

  if (isSingleDay) {
    return (
      <button
        type="button"
        onClick={openDetailDialog}
        className="w-full flex items-center gap-1 appearance-none border-0 bg-transparent p-0 font-[inherit] text-left cursor-pointer"
      >
        <span
          className="size-1.5 rounded-full shrink-0"
          style={{ backgroundColor: item.backgroundColor }}
        />
        <span className="text-text-secondary overflow-hidden text-ellipsis text-nowrap">
          {item.title}
        </span>
      </button>
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
    <button
      type="button"
      onClick={openDetailDialog}
      className="h-5 rounded-[3px] px-1.5 text-static-white flex items-center whitespace-nowrap overflow-hidden relative z-10 appearance-none border-0 bg-transparent py-0 font-[inherit] text-left cursor-pointer"
      style={{
        backgroundColor: item.backgroundColor,
        width: `calc(${spanDays * 100}% + ${spanDays - 1}px + ${1.05 * spanDays}rem - 1rem)`,
      }}
    >
      <span className="text-static-white overflow-hidden text-ellipsis text-nowrap">{item.title}</span>
    </button>
  ) : isInSegmentRange ? (
    <div className="h-5" aria-hidden />
  ) : null;
};
