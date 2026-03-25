import { MyTimeTableApi } from "@/entities/time-table/api";
import type { TimeTable } from "@/entities/time-table/types";
import { useSuspenseQuery, type UseSuspenseQueryOptions, type UseSuspenseQueryResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetMyTimeTableQuery = (
  options?: UseSuspenseQueryOptions<TimeTable[], AxiosError>,
): UseSuspenseQueryResult<TimeTable[], AxiosError> =>
  useSuspenseQuery({
    queryKey: ["time-table", "my"],
    queryFn: () => MyTimeTableApi(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });