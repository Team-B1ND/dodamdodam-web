import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import bannerRepository from "@src/repository/banner/banner.repository";
import { BannersResponse } from "@src/types/banner/banner.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetBannersQuery = (
  options?: UseQueryOptions<
    BannersResponse,
    AxiosError,
    BannersResponse,
    string
  >
): UseQueryResult<BannersResponse, AxiosError> =>
  useQuery(QUERY_KEYS.banner.get, () => bannerRepository.getBanners(), options);
