import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import {
  deleteMyLeaveParam,
  postApplyLeaveParam,
  putMyLeaveParam,
} from "@src/repository/leave/leave.param";
import leaveRepository from "@src/repository/leave/leave.repository";
import { MyLeavesResponse } from "@src/types/leave/leave.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyLeavesQuery = (
  options?: UseQueryOptions<
    MyLeavesResponse,
    AxiosError,
    MyLeavesResponse,
    string
  >
): UseQueryResult<MyLeavesResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.leave.getMy,
    () => leaveRepository.getMyLeaves(),
    options
  );

export const usePostApplyLeaveMutation = () => {
  const mutation = useMutation((leaveData: postApplyLeaveParam) =>
    leaveRepository.postApplyLeave(leaveData)
  );
  return mutation;
};

export const useDeleteApplyLeaveMutation = () => {
  const mutation = useMutation((idx: deleteMyLeaveParam) =>
    leaveRepository.deleteMyLeave(idx)
  );
  return mutation;
};

export const usePutApplyLeaveMutation = () => {
  const mutation = useMutation((leaveData: putMyLeaveParam) =>
    leaveRepository.putMyLeave(leaveData)
  );
  return mutation;
};
