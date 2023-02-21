import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { postMyBusParam, patchMyBusParam } from "@src/repository/bus/bus.param";
import busRepository from "@src/repository/bus/bus.repository";
import { BusesResponse, MyBusResponse } from "@src/types/bus/bus.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetBusesQuery = (
  options?: UseQueryOptions<BusesResponse, AxiosError, BusesResponse, string>
): UseQueryResult<BusesResponse, AxiosError> =>
  useQuery(QUERY_KEYS.bus.get, () => busRepository.getBuses(), options);

export const useGetMyBusQuery = (
  options?: UseQueryOptions<MyBusResponse, AxiosError, MyBusResponse, string>
): UseQueryResult<MyBusResponse, AxiosError> =>
  useQuery(QUERY_KEYS.bus.getMy, () => busRepository.getMyBus(), options);

export const usePostMyBusMutation = () => {
  const mutation = useMutation((idx: postMyBusParam) =>
    busRepository.postMyBus(idx)
  );
  return mutation;
};

export const usePatchMyBusMutation = () => {
  const mutation = useMutation(({ idx, originIdx }: patchMyBusParam) =>
    busRepository.patchMyBus({ idx, originIdx })
  );
  return mutation;
};
