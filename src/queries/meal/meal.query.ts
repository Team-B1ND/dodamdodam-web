import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { getMealParam } from "@src/repository/meal/meal.param";
import mealRepository from "@src/repository/meal/meal.repository";
import { MealResponse } from "@src/types/meal/meal.type";

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
