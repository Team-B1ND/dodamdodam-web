import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import scheduleRepository from "@src/repository/schedule/schedule.repository";
import { TodayScheduleResponse } from "@src/types/schedule/schedule.type";

export const useGetTodayScheduleQuery = (
  options?: UseQueryOptions<
    TodayScheduleResponse,
    AxiosError,
    TodayScheduleResponse,
    "schedule/getTodaySchedule"
  >
): UseQueryResult<TodayScheduleResponse, AxiosError> =>
  useQuery(
    "schedule/getTodaySchedule",
    () => scheduleRepository.getTodaySchedules(),
    options
  );
