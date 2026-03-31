import { TimeTableApi } from "@/entities/time-table/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetMyTimeTableQuery = () =>
  useSuspenseQuery({
    queryKey: ["time-table", "my"],
    queryFn: TimeTableApi.getMyTimeTable,
    staleTime: 1000 * 60 * 5,
  });
