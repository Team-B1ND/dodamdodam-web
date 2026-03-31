import { useGetMeSuspenseQuery } from "@/entities/user/queries";

export const useGetMe = () => {
  const { data } = useGetMeSuspenseQuery();

  return {
    data: data.data
  }
}
