import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import {
  deleteMyPassParam,
  getMyPassesParam,
  postApplyPassParam,
  putMyPassParam,
} from "../../repository/pass/pass.param";
import passRepository from "../../repository/pass/pass.repository";
import { MyPassesResponse } from "../../types/pass/pass.type";

export const useGetMyPasses = (
  { date }: getMyPassesParam,
  options?: UseQueryOptions<
    MyPassesResponse,
    AxiosError,
    MyPassesResponse,
    "pass/getMyPasses"
  >
): UseQueryResult<MyPassesResponse, AxiosError> =>
  useQuery(
    "pass/getMyPasses",
    () => passRepository.getMyPasses({ date }),
    options
  );

export const usePostApplyPass = () => {
  const mutation = useMutation((passData: postApplyPassParam) =>
    passRepository.postApplyPass(passData)
  );

  return mutation;
};

export const usePutApplyPass = () => {
  const mutation = useMutation((passData: putMyPassParam) =>
    passRepository.putMyPass(passData)
  );

  return mutation;
};

export const useDeleteMyPass = () => {
  const mutation = useMutation((idx: deleteMyPassParam) =>
    passRepository.deleteMyPass(idx)
  );

  return mutation;
};
