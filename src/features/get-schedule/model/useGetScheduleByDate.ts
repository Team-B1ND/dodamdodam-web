import { useGetSchedulesQuery } from "@/entities/schedule/queries";
import type { ScheduleEvent } from "@/entities/schedule/types";
import { toScheduleEvent } from "@/features/get-schedule/lib/to-schedule-event";
import dayjs from "dayjs";
import { useMemo, useState, useTransition } from "react";

const useGetScheduleByDate = () => {
  const [currentMonth, setCurrentMonth] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const [isMonthTransitionPending, startMonthTransition] = useTransition();

  const date = dayjs(currentMonth).startOf("month").format("YYYY-MM-DD");

  const { data, isFetching } = useGetSchedulesQuery(date);
  const scheduleList = data?.data ?? [];

  const scheduleEvents = useMemo(
    () => scheduleList.map((schedule) => toScheduleEvent(schedule)),
    [scheduleList],
  );

  const groupedSchedules = useMemo(() => {
    const grouped = scheduleEvents.reduce(
      (acc, item) => {
        const key = item.start;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(item);
        return acc;
      },
      {} as Record<string, ScheduleEvent[]>,
    );

    return Object.keys(grouped)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .reduce(
        (acc, key) => {
          acc[key] = grouped[key];
          return acc;
        },
        {} as Record<string, ScheduleEvent[]>,
      );
  }, [scheduleEvents]);

  const moveMonth = (direction: "prev" | "next") => {
    startMonthTransition(() => {
      setCurrentMonth((prev) =>
        dayjs(prev)
          .add(direction === "next" ? 1 : -1, "month")
          .format("YYYY-MM-DD"),
      );
    });
  };

  return {
    currentMonth,
    monthLabel: dayjs(currentMonth).format("YYYY년 M월"),
    scheduleEvents,
    groupedSchedules,
    isFetching,
    isMonthTransitionPending,
    moveMonth,
  };
};

export default useGetScheduleByDate;
