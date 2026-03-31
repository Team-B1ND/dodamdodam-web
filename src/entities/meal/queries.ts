import { MealApi } from "@/entities/meal/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetMealByDateQuery = (
  date: string
) =>
  useSuspenseQuery({
    queryKey: ["meal", date],
    queryFn: () => MealApi.getMealByDate(date),
    staleTime: 1000 * 60 * 5
  })