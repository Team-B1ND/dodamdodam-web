import { EMealType } from "../../../enum/meal/meal.enum";
import useMeal from "../../../hooks/meal/useMeal";
import MealDatePicker from "./mealDatePicker/mealDatePicker";
import MealItem from "./mealItem/mealItem";
import { MealContainer, MealItemWrap } from "./style";
import MealBreakfastIcon from "../../../assets/icons/meal/morning.svg";
import MealLunchIcon from "../../../assets/icons/meal/afternoon.svg";
import MealDinnerIcon from "../../../assets/icons/meal/night.svg";
import dayjs from "dayjs";
import dateTransform from "../../../util/date/dateTransform";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const Meal = () => {
  const { date, validMeal, handleMealDate, prevMealDate, nextMealDate } =
    useMeal();

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
          mealData={validMeal?.breakfast!}
          mealType={BREAKFAST}
          mealIconSrc={MealBreakfastIcon}
          isMealTime={currentDate.isBetween(
            `${date} 05:00`,
            `${date} 07:50`,
            "minute"
          )}
        />
        <MealItem
          mealData={validMeal?.lunch!}
          mealType={LUNCH}
          mealIconSrc={MealLunchIcon}
          isMealTime={currentDate.isBetween(
            `${date} 07:50`,
            `${date} 13:20`,
            "minute"
          )}
        />
        <MealItem
          mealData={validMeal?.dinner!}
          mealType={DINNER}
          mealIconSrc={MealDinnerIcon}
          isMealTime={currentDate.isBetween(
            `${date} 13:20`,
            `${date} 19:10`,
            "minute"
          )}
        />
      </MealItemWrap>
    </MealContainer>
  );
};

export default Meal;
