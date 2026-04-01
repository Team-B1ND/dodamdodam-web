import { ScheduleApi } from "@/entities/schedule/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetSchedulesQuery = (date: string) =>
  useQuery({
    queryKey: ["schedule", date],
    queryFn: () => ScheduleApi.getSchedules(date),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
