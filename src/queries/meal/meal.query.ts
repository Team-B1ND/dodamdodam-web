import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { getMealParam } from "@src/repository/meal/meal.param";
import mealRepository from "@src/repository/meal/meal.repository";
import { MealResponse } from "@src/types/meal/meal.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMealsQuery = (
  { year, month, day }: getMealParam,
  options?: UseQueryOptions<MealResponse, AxiosError, MealResponse, string>
) =>
  useQuery(
    QUERY_KEYS.meal.get,
    () => mealRepository.getMeal({ year, month, day }),
    options
  );
