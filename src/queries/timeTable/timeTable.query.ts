import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import timeTableRepository from "@src/repository/timeTable/timeTable.repository";
import { TimeTablesResponse } from "@src/types/timeTable/timeTable.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetTimeTableQuery = (
  options?: UseQueryOptions<
    TimeTablesResponse,
    AxiosError,
    TimeTablesResponse,
    string
  >
): UseQueryResult<TimeTablesResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.timeTable.get,
    () => timeTableRepository.getTimeTables(),
    options
  );
