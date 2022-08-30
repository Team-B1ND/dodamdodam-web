export interface Meal {
  readonly breakfast: string;
  readonly date: string;
  readonly dinner: string;
  readonly exists: boolean;
  readonly lunch: string;
}

export interface MealResponse {
  data: Meal;
}
