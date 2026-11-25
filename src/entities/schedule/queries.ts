import { ScheduleApi } from "@/entities/schedule/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetSchedulesQuery = (date: string) =>
  useQuery({
    queryKey: ["schedule", date],
    queryFn: async () => ({
      ...(await ScheduleApi.getSchedules(date)),
      requestedDate: date,
    }),
    placeholderData: keepPreviousData,
    throwOnError: (_error, query) => query.state.data === undefined,
    staleTime: 1000 * 60,
  });
