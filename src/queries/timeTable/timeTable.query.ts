import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import timeTableRepository from "@src/repository/timeTable/timeTable.repository";
import { TimeTablesResponse } from "@src/types/timeTable/timeTable.type";

export const useGetTimeTableQuery = (
  options?: UseQueryOptions<
    TimeTablesResponse,
    AxiosError,
    TimeTablesResponse,
    "timeTable/getTimeTables"
  >
): UseQueryResult<TimeTablesResponse, AxiosError> =>
  useQuery(
    "timeTable/getTimeTables",
    () => timeTableRepository.getTimeTables(),
    options
  );
