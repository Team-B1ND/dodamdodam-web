import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getMyPointParam } from "repository/point/point.param";
import pointRepository from "../../repository/point/point.repository";
import { MyPointResponse } from "../../types/point/point.type";

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
