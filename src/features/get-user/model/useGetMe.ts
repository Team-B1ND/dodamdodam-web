import { useGetMeQuery } from "@/entities/user/queries";

export const useGetMe = () => {
  const { data } = useGetMeQuery();

  return {
    data: data.data
  }
}
