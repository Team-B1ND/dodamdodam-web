import { EMealType } from "../../../enum/meal/meal.enum";
import useMeal from "../../../hooks/meal/useMeal";
import MealDatePicker from "./mealDatePicker/mealDatePicker";
import MealItem from "./mealItem/mealItem";
import { MealContainer, MealItemWrap } from "./style";
import MealBreakfastIcon from "../../../assets/icons/meal/morning.svg";
import MealLunchIcon from "../../../assets/icons/meal/afternoon.svg";
import MealDinnerIcon from "../../../assets/icons/meal/night.svg";

const Meal = () => {
  const { date, validMeal, handleMealDate, prevMealDate, nextMealDate } =
    useMeal();

  const { BREAKFAST, LUNCH, DINNER } = EMealType;

  return (
    <MealContainer>
      <MealDatePicker
        date={date}
        handleMealDate={handleMealDate}
        prevMealDate={prevMealDate}
        nextMealDate={nextMealDate}
      />

      <MealItemWrap>
        <MealItem
          mealData={validMeal?.breakfast!}
          mealType={BREAKFAST}
          mealIconSrc={MealBreakfastIcon}
        />
        <MealItem
          mealData={validMeal?.lunch!}
          mealType={LUNCH}
          mealIconSrc={MealLunchIcon}
        />
        <MealItem
          mealData={validMeal?.dinner!}
          mealType={DINNER}
          mealIconSrc={MealDinnerIcon}
        />
      </MealItemWrap>
    </MealContainer>
  );
};

export default Meal;
