import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getMyPointParam } from "@src/repository/point/point.param";
import pointRepository from "@src/repository/point/point.repository";
import { MyPointResponse } from "@src/types/point/point.type";

export const useGetMyPointQuery = (
  { year }: getMyPointParam,
  options?: UseQueryOptions<
    MyPointResponse,
    AxiosError,
    MyPointResponse,
    "point/getMyPoint"
  >
): UseQueryResult<MyPointResponse, AxiosError> =>
  useQuery(
    "point/getMyPoint",
    () => pointRepository.getMyPoint({ year }),
    options
  );
