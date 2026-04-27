import { useGetMyTimeTableQuery } from "@/entities/time-table/queries"
import type { TimeTableType } from "@/entities/time-table/types";
import dayjs from "dayjs";

const WEEKDAY_ORDER = [1, 2, 3, 4, 5] as const;

const useGetTimeTable = () => {
  const { data } = useGetMyTimeTableQuery();
  const groupedByDate = data.data.reduce<Record<string, TimeTableType[]>>(
    (acc, cur) => {
      (acc[cur.date] ||= []).push(cur);
      return acc;
    },
    {},
  );

  const groupedByWeekday = Object.entries(groupedByDate).reduce<
    Partial<Record<(typeof WEEKDAY_ORDER)[number], TimeTableType[]>>
  >((acc, [date, items]) => {
    const weekday = dayjs(date).day();

    if (WEEKDAY_ORDER.includes(weekday as (typeof WEEKDAY_ORDER)[number])) {
      acc[weekday as (typeof WEEKDAY_ORDER)[number]] = items.sort(
        (a, b) => a.period - b.period,
      );
    }

    return acc;
  }, {});

  return {
    data: WEEKDAY_ORDER.map((weekday) => groupedByWeekday[weekday] ?? []),
  };
}

export default useGetTimeTable
