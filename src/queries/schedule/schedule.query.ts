import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import scheduleRepository from "../../repository/schedule/schedule.repository";
import { TodayScheduleResponse } from "../../types/schedule/schedule.type";

export const useGetTodaySchedule = (
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
