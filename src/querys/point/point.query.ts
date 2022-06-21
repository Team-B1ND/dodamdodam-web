import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import pointRepository from "repository/point/point.repository";
import { PointResponse } from "types/point/point.type";

export const useGetMyMerit = (
  options?: UseQueryOptions<
    PointResponse,
    AxiosError,
    PointResponse,
    "point/getMyMerit"
  >
): UseQueryResult<PointResponse, AxiosError> =>
  useQuery("point/getMyMerit", () => pointRepository.getMyMerit(), options);

export const useGetMyDemerit = (
  options?: UseQueryOptions<
    PointResponse,
    AxiosError,
    PointResponse,
    "point/getMyDemerit"
  >
): UseQueryResult<PointResponse, AxiosError> =>
  useQuery("point/getMyDemerit", () => pointRepository.getMyDemerit(), options);

export const useGetMyOffsetPoint = (
  options?: UseQueryOptions<
    PointResponse,
    AxiosError,
    PointResponse,
    "point/getMyOffsetPoint"
  >
): UseQueryResult<PointResponse, AxiosError> =>
  useQuery(
    "point/getMyOffsetPoint",
    () => pointRepository.getMyOffsetPoint(),
    options
  );
