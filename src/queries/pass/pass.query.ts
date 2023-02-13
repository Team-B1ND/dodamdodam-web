import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import {
  deleteMyPassParam,
  postApplyPassParam,
  putMyPassParam,
} from "../../repository/pass/pass.param";
import passRepository from "../../repository/pass/pass.repository";
import { MyPassesResponse } from "../../types/pass/pass.type";

export const useGetMyPassesQuery = (
  options?: UseQueryOptions<
    MyPassesResponse,
    AxiosError,
    MyPassesResponse,
    "pass/getMyPasses"
  >
): UseQueryResult<MyPassesResponse, AxiosError> =>
  useQuery("pass/getMyPasses", () => passRepository.getMyPasses(), options);

export const usePostApplyPassMutation = () => {
  const mutation = useMutation((passData: postApplyPassParam) =>
    passRepository.postApplyPass(passData)
  );

  return mutation;
};

export const usePutApplyPassMutation = () => {
  const mutation = useMutation((passData: putMyPassParam) =>
    passRepository.putMyPass(passData)
  );

  return mutation;
};

export const useDeleteMyPassMutation = () => {
  const mutation = useMutation((idx: deleteMyPassParam) =>
    passRepository.deleteMyPass(idx)
  );

  return mutation;
};
