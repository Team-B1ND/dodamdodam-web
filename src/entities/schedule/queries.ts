import { ScheduleApi } from "@/entities/schedule/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetSchedulesQuery = (date: string) =>
  useSuspenseQuery({
    queryKey: ["schedule", date],
    queryFn: () => ScheduleApi.getSchedules(date),
    staleTime: 1000 * 60,
  });
