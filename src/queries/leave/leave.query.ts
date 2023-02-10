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
} from "../../repository/leave/leave.param";
import leaveRepository from "../../repository/leave/leave.repository";
import { MyLeavesResponse } from "../../types/leave/leave.type";

export const useGetMyLeavesQuery = (
  options?: UseQueryOptions<
    MyLeavesResponse,
    AxiosError,
    MyLeavesResponse,
    "leave/getMyLeaves"
  >
): UseQueryResult<MyLeavesResponse, AxiosError> =>
  useQuery("leave/getMyLeaves", () => leaveRepository.getMyLeaves(), options);

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
