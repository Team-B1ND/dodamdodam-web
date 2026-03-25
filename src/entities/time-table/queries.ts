import { MyTimeTableApi } from "@/entities/time-table/api";
import type { TimeTableType } from "@/entities/time-table/types";
import { useSuspenseQuery, type UseSuspenseQueryOptions, type UseSuspenseQueryResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetMyTimeTableQuery = (
  options?: UseSuspenseQueryOptions<TimeTableType[], AxiosError>,
): UseSuspenseQueryResult<TimeTableType[], AxiosError> =>
  useSuspenseQuery({
    queryKey: ["time-table", "my"],
    queryFn: () => MyTimeTableApi(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });