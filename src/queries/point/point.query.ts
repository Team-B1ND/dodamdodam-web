import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getMyPointParam } from "@src/repository/point/point.param";
import pointRepository from "@src/repository/point/point.repository";
import { MyPointResponse } from "@src/types/point/point.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyPointQuery = (
  { type }: getMyPointParam,
  options?: UseQueryOptions<
    MyPointResponse,
    AxiosError,
    MyPointResponse,
    string[]
  >
): UseQueryResult<MyPointResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.point.getMy(type),
    () => pointRepository.getMyPoint({ type }),
    options
  );
