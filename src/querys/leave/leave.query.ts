import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getMyLeavesParam } from "../../repository/leave/leave.param";
import leaveRepository from "../../repository/leave/leave.repository";
import { MyLeavesResponse } from "../../types/leave/leave.type";

export const useGetMyLeaves = (
  { date }: getMyLeavesParam,
  options?: UseQueryOptions<
    MyLeavesResponse,
    AxiosError,
    MyLeavesResponse,
    "leave/getMyLeaves"
  >
): UseQueryResult<MyLeavesResponse, AxiosError> =>
  useQuery(
    "leave/getMyLeaves",
    () => leaveRepository.getMyLeaves({ date }),
    options
  );
