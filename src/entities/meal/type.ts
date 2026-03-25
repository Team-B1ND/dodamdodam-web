export type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

export interface Meal {
  date: string;
  mealType: MealType;
  calorie: number;
  menus: string[];
}
