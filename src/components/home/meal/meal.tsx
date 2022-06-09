import useMeal from "../../../hooks/meal/useMeal";
import MealDatePicker from "./mealDatePicker/mealDatePicker";
import { MealContainer, MealItemWrap } from "./style";

const Meal = () => {
  const { date, validMeal, handleMealDate, prevMealDate, nextMealDate } =
    useMeal();

  return (
    <MealContainer>
      <MealDatePicker
        date={date}
        handleMealDate={handleMealDate}
        prevMealDate={prevMealDate}
        nextMealDate={nextMealDate}
      />
      <MealItemWrap></MealItemWrap>
    </MealContainer>
  );
};

export default Meal;
