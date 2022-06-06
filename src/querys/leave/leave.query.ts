import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import {
  deleteMyLeaveParam,
  getMyLeavesParam,
  postApplyLeaveParam,
  putMyLeaveParam,
} from "../../repository/leave/leave.param";
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

export const usePostApplyLeave = () => {
  const mutation = useMutation((leaveData: postApplyLeaveParam) =>
    leaveRepository.postApplyLeave(leaveData)
  );
  return mutation;
};

export const useDeleteApplyLeave = () => {
  const mutation = useMutation((idx: deleteMyLeaveParam) =>
    leaveRepository.deleteMyLeave(idx)
  );
  return mutation;
};

export const usePutApplyLeave = () => {
  const mutation = useMutation((leaveData: putMyLeaveParam) =>
    leaveRepository.putMyLeave(leaveData)
  );
  return mutation;
};
