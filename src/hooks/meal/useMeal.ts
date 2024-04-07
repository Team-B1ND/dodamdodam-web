import { useCallback, useEffect, useState } from "react";
import { Meal } from "@src/types/meal/meal.type";
import mealRepository from "@src/repository/meal/meal.repository";
import { useRecoilValue } from "recoil";
import { mealDateAtom } from "@src/store/meal/mealStore";
import * as Sentry from "@sentry/react";

const useMeal = () => {
  const mealDate = useRecoilValue(mealDateAtom);

  const [meal, setMeal] = useState<Meal>();

  const requestMeals = useCallback(async () => {
    try {
      const dates = mealDate.split("-");

      const { data } = await mealRepository.getMeal({
        year: dates[0],
        month: dates[1],
        day: dates[2],
      });

      setMeal(data);
    } catch (error) {
      Sentry.captureMessage("급식 불러오기 실패");
    }
  }, [mealDate]);

  //월이 달라졌을 때 바뀐 월에 맞게 리퀘스트 하는 부분
  useEffect(() => {
    requestMeals();
  }, [requestMeals]);

  return {
    meal,
  };
};

export default useMeal;
