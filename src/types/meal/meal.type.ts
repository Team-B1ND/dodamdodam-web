export interface Meal {
  breakfast: string;
  date: string;
  dinner: string;
  exists: boolean;
  lunch: string;
}

export interface MealsResponse {
  data: {
    meal: Meal[];
  };
}
