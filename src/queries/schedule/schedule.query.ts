import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import scheduleRepository from "@src/repository/schedule/schedule.repository";
import { TodayScheduleResponse } from "@src/types/schedule/schedule.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetTodayScheduleQuery = (
  options?: UseQueryOptions<
    TodayScheduleResponse,
    AxiosError,
    TodayScheduleResponse,
    string
  >
): UseQueryResult<TodayScheduleResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.schedule.getToday,
    () => scheduleRepository.getTodaySchedules(),
    options
  );
