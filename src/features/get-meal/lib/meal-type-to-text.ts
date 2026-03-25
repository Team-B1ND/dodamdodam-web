import type { MealType } from "@/entities/meal/type";

/** `MealType` 을 넣으면 맞는 텍스트로 바꿔줍니다. */
export const mealTypeToText = (
  mealType: MealType
) => {
  const mealTimeMapper: Record<MealType, string> = {
    "BREAKFAST": "아침",
    "LUNCH": "점심",
    "DINNER": "저녁"
  }
  return mealTimeMapper[mealType]
}