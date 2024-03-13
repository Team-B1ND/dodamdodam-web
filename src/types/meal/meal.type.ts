export interface MealData {
  details: {
    name: string;
    allergies: number[];
  }[];
  calorie: number;
}

export interface Meal {
  readonly exists: boolean;
  readonly date: string;
  readonly breakfast: MealData;
  readonly dinner: MealData;
  readonly lunch: MealData;
}

export interface MealResponse {
  data: Meal;
}
