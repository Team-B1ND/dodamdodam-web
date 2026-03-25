import { useGetMealByDateQuery } from "@/entities/meal/queries"

/**
 * `YYYY-MM-DD` 를 넘기면 당일의 급식 정보를 리턴합니다.
 */
const useGetMealByDate = (
  date: string
) => {
  const { data } = useGetMealByDateQuery(date);
  return { data }
}

export default useGetMealByDate