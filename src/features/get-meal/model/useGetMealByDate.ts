import { useGetMealByDateQuery } from "@/entities/meal/queries"
import { sortByLiteralOrder } from "@/shared/libs/sortByLiteralOrder";

/**
 * `YYYY-MM-DD` 를 넘기면 당일의 급식 정보를 리턴합니다.
 */
const useGetMealByDate = (
  date: string
) => {
  const { data } = useGetMealByDateQuery(date);

  return {
    data: sortByLiteralOrder(data.data, "mealType", ["BREAKFAST", "LUNCH", "DINNER"])
  }
}

export default useGetMealByDate