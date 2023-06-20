import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import bannerRepository from "@src/repository/banner/banner.repository";
import { BannersResponse } from "@src/types/banner/banner.type";
import { QUERY_KEYS } from "../queryKey";
import { PostBannerParam } from "@src/repository/banner/banner.param";

export const useGetBannersQuery = (
  options?: UseQueryOptions<
    BannersResponse,
    AxiosError,
    BannersResponse,
    string
  >
): UseQueryResult<BannersResponse, AxiosError> =>
  useQuery(QUERY_KEYS.banner.get, () => bannerRepository.getBanners(), options);

export const useUploadBannerMutation = () => {
  const mutation = useMutation((bannerData: PostBannerParam) =>
    bannerRepository.postBanners(bannerData)
  );
  return mutation;
};
