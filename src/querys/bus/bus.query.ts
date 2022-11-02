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

export const useGetBuses = (
  options?: UseQueryOptions<
    BusesResponse,
    AxiosError,
    BusesResponse,
    "bus/getBuses"
  >
): UseQueryResult<BusesResponse, AxiosError> =>
  useQuery("bus/getBuses", () => busRepository.getBuses(), options);

export const useGetMyBus = (
  options?: UseQueryOptions<
    MyBusResponse,
    AxiosError,
    MyBusResponse,
    "bus/getMyBus"
  >
): UseQueryResult<MyBusResponse, AxiosError> =>
  useQuery("bus/getMyBus", () => busRepository.getMyBus(), options);

export const usePostMyBus = () => {
  const mutation = useMutation((idx: postMyBusParam) =>
    busRepository.postMyBus(idx)
  );
  return mutation;
};

export const usePatchMyBus = () => {
  const mutation = useMutation(({ idx, originIdx }: patchMyBusParam) =>
    busRepository.patchMyBus({ idx, originIdx })
  );
  return mutation;
};
