import { SCHEDULE_CATEGORY_ITEMS } from "@/features/get-schedule/constants/schedule-category";
import type { ScheduleEvent } from "@/entities/schedule/types";
import dayjs from "dayjs";
import { getToday } from "@/shared/libs/day";
import { ScheduleCalendarCell } from "./ScheduleCalendarCell";
import { ChevronRight, ChevronLeft } from "@b1nd/dodam-design-system/icons";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface ScheduleCalendarProps {
  currentMonth: string;
  monthLabel: string;
  scheduleEvents: ScheduleEvent[];
  moveMonth: (direction: "prev" | "next") => void;
}

const ScheduleCalendar = ({
  currentMonth,
  monthLabel,
  scheduleEvents,
  moveMonth,
}: ScheduleCalendarProps) => {
  const firstDay = dayjs(currentMonth).startOf("month").day();
  const daysInMonth = dayjs(currentMonth).daysInMonth();
  const totalCells = 42;
  const today = getToday();

  return (
    <section className="w-full bg-background-surface rounded-large p-6 flex flex-col">
      <header className="w-full flex items-center gap-3">
        <h1 className="text-heading1 font-bold">학사 일정</h1>
        <div className="grow" />
        <div className="flex items-center text-label text-text-tertiary font-medium">
          <button
            onClick={() => moveMonth("prev")}
            className="px-2 py-1 cursor-pointer"
            aria-label="이전 달"
          >
            <ChevronLeft size={16} />
          </button>
          <span>{monthLabel}</span>
          <button
            onClick={() => moveMonth("next")}
            className="px-2 py-1 cursor-pointer"
            aria-label="다음 달"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <div className="h-4" />

      <div className="w-full flex justify-end items-center gap-3 pb-2">
        {SCHEDULE_CATEGORY_ITEMS.map((item) => (
          <div key={item.text} className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-caption1 text-text-secondary font-medium">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <div
        className="border rounded-small overflow-hidden"
        style={{ borderColor: "var(--dds-color-border-subtle)" }}
      >
        <div className="grid grid-cols-7">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="h-8 border-b flex items-center justify-center text-label text-text-tertiary"
              style={{ borderColor: "var(--dds-color-border-subtle)" }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-[96px]">
          {Array.from({ length: totalCells }).map((_, index) => (
            <ScheduleCalendarCell
              key={index}
              index={index}
              firstDay={firstDay}
              daysInMonth={daysInMonth}
              currentMonth={currentMonth}
              scheduleEvents={scheduleEvents}
              today={today}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleCalendar;
