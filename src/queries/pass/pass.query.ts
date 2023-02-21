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
} from "@src/repository/pass/pass.param";
import passRepository from "@src/repository/pass/pass.repository";
import { MyPassesResponse } from "@src/types/pass/pass.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyPassesQuery = (
  options?: UseQueryOptions<
    MyPassesResponse,
    AxiosError,
    MyPassesResponse,
    string
  >
): UseQueryResult<MyPassesResponse, AxiosError> =>
  useQuery(QUERY_KEYS.pass.getMy, () => passRepository.getMyPasses(), options);

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
