import { useGetBannerQuery } from "@/entities/banner/queries"

export const useGetBanner = () => {
  const { data } = useGetBannerQuery();

  return {
    data: data.data.filter(item => item.isActive),
  }
}