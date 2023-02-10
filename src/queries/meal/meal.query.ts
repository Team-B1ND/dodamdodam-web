import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { getMealParam } from "../../repository/meal/meal.param";
import mealRepository from "../../repository/meal/meal.repository";
import { MealResponse } from "../../types/meal/meal.type";

export const useGetMealsQuery = (
  { year, month, day }: getMealParam,
  options?: UseQueryOptions<
    MealResponse,
    AxiosError,
    MealResponse,
    "meal/getMeal"
  >
) =>
  useQuery(
    "meal/getMeal",
    () => mealRepository.getMeal({ year, month, day }),
    options
  );
