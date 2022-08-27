import { useCallback, useEffect, useState } from "react";
import dateTransform from "../../util/transform/dateTransform";
import dayjs from "dayjs";
import { Meal } from "../../types/meal/meal.type";
import mealRepository from "../../repository/meal/meal.repository";

const useMeal = () => {
  const [date, setDate] = useState<string>(dateTransform.hyphen());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [validMeal, setValidMeal] = useState<Meal>();
  const [tempMonth, setTempMonth] = useState<string>(
    dateTransform.hyphen().split("-")[1]
  );

  //   const mealsData = useGetMeals({
  //     year: dateTransform.hyphen().split("-")[0],
  //     month: tempMonth,
  //   }).data?.data.meal;

  useEffect(() => {
    setValidMeal(meals[Number(date.split("-")[2]) - 1]);
  }, [date, meals]);

  //날짜를 바꾸다가 월이 달라졌을때를 확인하는 부분
  useEffect(() => {
    const month = date.split("-")[1];

    if (tempMonth !== month) {
      setTempMonth(month);
    }
  }, [date, tempMonth]);

  const requestMeals = useCallback(async () => {
    try {
      const {
        data: { meal },
      } = await mealRepository.getMeals({
        year: dateTransform.hyphen().split("-")[0],
        month: tempMonth,
      });

      setMeals(meal);
    } catch (error) {}
  }, [tempMonth]);

  //월이 달라졌을 때 바뀐 월에 맞게 리퀘스트 하는 부분
  useEffect(() => {
    requestMeals();
  }, [requestMeals, tempMonth]);

  const handleMealDate = (e: Date) => {
    setDate(dayjs(e).format("YYYY-MM-DD"));
  };

  const prevMealDate = () => {
    dayjs(date).subtract(1, "day");
    setDate((prev) => dayjs(prev).subtract(1, "day").format("YYYY-MM-DD"));
  };

  const nextMealDate = () => {
    setDate((prev) => dayjs(prev).add(1, "day").format("YYYY-MM-DD"));
  };

  return {
    date,
    validMeal,
    handleMealDate,
    prevMealDate,
    nextMealDate,
  };
};

export default useMeal;
