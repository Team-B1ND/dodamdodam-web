import { useCallback, useEffect, useState } from "react";
import dateTransform from "../../util/transform/dateTransform";
import dayjs from "dayjs";
import { Meal } from "../../types/meal/meal.type";
import mealRepository from "../../repository/meal/meal.repository";
import { track } from "@amplitude/analytics-browser";

const useMeal = () => {
  const [date, setDate] = useState<string>(dateTransform.hyphen());
  const [meal, setMeal] = useState<Meal>();
  const [validMeal, setValidMeal] = useState<Meal>();
  const [tempMonth, setTempMonth] = useState<string>(
    dateTransform.hyphen().split("-")[1]
  );

  const requestMeals = useCallback(async () => {
    try {
      const dates = date.split("-");

      const { data } = await mealRepository.getMeal({
        year: dates[0],
        month: dates[1],
        day: dates[2],
      });

      setMeal(data);
    } catch (error) {}
  }, [date]);

  //월이 달라졌을 때 바뀐 월에 맞게 리퀘스트 하는 부분
  useEffect(() => {
    requestMeals();
  }, [requestMeals]);

  const handleMealDate = (e: Date) => {
    setDate(dayjs(e).format("YYYY-MM-DD"));
    track("(메인페이지) 급식조회");
  };

  const prevMealDate = () => {
    setDate((prev) => dayjs(prev).subtract(1, "day").format("YYYY-MM-DD"));
    track("(메인페이지) 급식조회");
  };

  const nextMealDate = () => {
    setDate((prev) => dayjs(prev).add(1, "day").format("YYYY-MM-DD"));
    track("(메인페이지) 급식조회");
  };

  return {
    date,
    meal,
    handleMealDate,
    prevMealDate,
    nextMealDate,
  };
};

export default useMeal;
