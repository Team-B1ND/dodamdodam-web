import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import bannerRepository from "@src/repository/banner/banner.repository";
import { BannersResponse } from "@src/types/banner/banner.type";

export const useGetBannersQuery = (
  options?: UseQueryOptions<
    BannersResponse,
    AxiosError,
    BannersResponse,
    "banner/getBanners"
  >
): UseQueryResult<BannersResponse, AxiosError> =>
  useQuery("banner/getBanners", () => bannerRepository.getBanners(), options);
