import type { Meal } from "@/entities/meal/type"
import { apiClient } from "@/shared/libs/api-client"

const MEAL_BASE = "/neis/meal";

export const MealApi = {
  async getMealByDate(date: string) {
    return await apiClient.get<Meal[]>(`${MEAL_BASE}?date=${date}`);
  }
}