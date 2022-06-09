import { EMealType } from "../../../../enum/meal/meal.enum";
import { Meal } from "../../../../types/meal/meal.type";
import { MealItemContainer } from "./style";

interface Props {
  mealData: Meal;
  mealType: EMealType;
}

const MealItem = () => {
  return <MealItemContainer></MealItemContainer>;
};

export default MealItem;
