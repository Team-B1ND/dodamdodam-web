import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { getMealsParam } from "../../repository/meal/meal.param";
import mealRepository from "../../repository/meal/meal.repository";
import { MealsResponse } from "../../types/meal/meal.type";

export const useGetMeals = (
  { year, month }: getMealsParam,
  options?: UseQueryOptions<
    MealsResponse,
    AxiosError,
    MealsResponse,
    "meal/getMeals"
  >
) =>
  useQuery(
    "meal/getMeals",
    () => mealRepository.getMeals({ year, month }),
    options
  );
