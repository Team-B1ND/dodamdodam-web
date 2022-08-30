import { EMealType } from "../../../enum/meal/meal.enum";
import useMeal from "../../../hooks/meal/useMeal";
import MealDatePicker from "./mealDatePicker/mealDatePicker";
import MealItem from "./mealItem/mealItem";
import { MealContainer, MealItemWrap } from "./style";
import MealBreakfastIcon from "../../../assets/icons/meal/morning.svg";
import MealLunchIcon from "../../../assets/icons/meal/afternoon.svg";
import MealDinnerIcon from "../../../assets/icons/meal/night.svg";
import dayjs from "dayjs";
import dateTransform from "../../../util/transform/dateTransform";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const Meal = () => {
  const { date, meal, handleMealDate, prevMealDate, nextMealDate } = useMeal();

  const { BREAKFAST, LUNCH, DINNER } = EMealType;
  const currentTime = dateTransform.fullDate().split(" ")[1];
  const currentDate = dayjs(dateTransform.fullDate(date + currentTime));

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
          mealData={meal?.breakfast!}
          mealType={BREAKFAST}
          mealIconSrc={MealBreakfastIcon}
          isMealTime={
            currentDate.isBetween(
              `${dateTransform.hyphen()} 05:00`,
              `${dateTransform.hyphen()} 07:50`,
              "minute"
            ) && meal?.breakfast! !== null
          }
        />
        <MealItem
          mealData={meal?.lunch!}
          mealType={LUNCH}
          mealIconSrc={MealLunchIcon}
          isMealTime={
            currentDate.isBetween(
              `${dateTransform.hyphen()} 07:50`,
              `${dateTransform.hyphen()} 13:20`,
              "minute"
            ) && meal?.lunch! !== null
          }
        />
        <MealItem
          mealData={meal?.dinner!}
          mealType={DINNER}
          mealIconSrc={MealDinnerIcon}
          isMealTime={
            currentDate.isBetween(
              `${dateTransform.hyphen()} 13:20`,
              `${dateTransform.hyphen()} 19:10`,
              "minute"
            ) && meal?.dinner! !== null
          }
        />
      </MealItemWrap>
    </MealContainer>
  );
};

export default Meal;
