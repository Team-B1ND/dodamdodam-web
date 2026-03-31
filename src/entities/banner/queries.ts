import { BannerApi } from "@/entities/banner/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetBannerQuery = () =>
  useSuspenseQuery({
    queryKey: ["banner"],
    queryFn: BannerApi.getBanner,
    staleTime: 1000 * 60 * 5,
  });
