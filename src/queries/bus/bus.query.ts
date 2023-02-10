import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import {
  postMyBusParam,
  patchMyBusParam,
} from "../../repository/bus/bus.param";
import busRepository from "../../repository/bus/bus.repository";
import { BusesResponse, MyBusResponse } from "../../types/bus/bus.type";

export const useGetBusesQuery = (
  options?: UseQueryOptions<
    BusesResponse,
    AxiosError,
    BusesResponse,
    "bus/getBuses"
  >
): UseQueryResult<BusesResponse, AxiosError> =>
  useQuery("bus/getBuses", () => busRepository.getBuses(), options);

export const useGetMyBusQuery = (
  options?: UseQueryOptions<
    MyBusResponse,
    AxiosError,
    MyBusResponse,
    "bus/getMyBus"
  >
): UseQueryResult<MyBusResponse, AxiosError> =>
  useQuery("bus/getMyBus", () => busRepository.getMyBus(), options);

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
