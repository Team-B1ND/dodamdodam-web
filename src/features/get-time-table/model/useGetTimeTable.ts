import { useGetMyTimeTableQuery } from "@/entities/time-table/queries"
import type { TimeTable } from "@/entities/time-table/types";

const useGetTimeTable = () => {
  const { data } = useGetMyTimeTableQuery();

  return {
    data: Object.values(
      data?.reduce<Record<string, TimeTable[]>>((acc, cur) => {
        (acc[cur.date] ||= []).push(cur);
        return acc;
      }, {}),
    ).map((group) => group.sort((a, b) => a.period - b.period)),
  };
}

export default useGetTimeTable