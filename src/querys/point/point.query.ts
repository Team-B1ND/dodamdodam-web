import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import pointRepository from "../../repository/point/point.repository";
import { PointResponse } from "../../types/point/point.type";

export const useGetMyPoint = (
  options?: UseQueryOptions<
    PointResponse,
    AxiosError,
    PointResponse,
    "point/getMyPoint"
  >
): UseQueryResult<PointResponse, AxiosError> =>
  useQuery("point/getMyPoint", () => pointRepository.getMyPoint(), options);
