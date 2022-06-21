import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import bannerRepository from "../../repository/banner/banner.repository";
import { BannersResponse } from "../../types/banner/banner.type";

export const useGetBanners = (
  options?: UseQueryOptions<
    BannersResponse,
    AxiosError,
    BannersResponse,
    "banner/getBanners"
  >
): UseQueryResult<BannersResponse, AxiosError> =>
  useQuery("banner/getBanners", () => bannerRepository.getBanners(), options);
