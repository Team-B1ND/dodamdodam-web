import useMeal from "../../../hooks/meal/useMeal";
import MealDatePicker from "./mealDatePicker/mealDatePicker";
import { MealContainer } from "./style";

const Meal = () => {
  const { date, handleMealDate, prevMealDate, nextMealDate } = useMeal();

  return (
    <MealContainer>
      <MealDatePicker
        date={date}
        handleMealDate={handleMealDate}
        prevMealDate={prevMealDate}
        nextMealDate={nextMealDate}
      />
    </MealContainer>
  );
};

export default Meal;
