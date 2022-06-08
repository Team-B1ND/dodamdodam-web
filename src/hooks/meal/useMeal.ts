import { useEffect, useState } from "react";
import dateTransform from "../../util/date/dateTransform";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import { Meal } from "../../types/meal/meal.type";
import { useGetMeals } from "../../querys/meal/meal.query";

const useMeal = () => {
  const [date, setDate] = useState<string>(dateTransform.hyphen());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [tempMonth, setTempMonth] = useState<string>(
    dateTransform.hyphen().split("-")[1]
  );

  useEffect(() => {
    const month = date.split("-")[1];

    if (tempMonth !== month) {
      setTempMonth(month);
    }
  }, [date, tempMonth]);

  useEffect(() => {}, [tempMonth]);

  const handleMealDate = (e: MaterialUiPickersDate) => {
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
    handleMealDate,
    prevMealDate,
    nextMealDate,
  };
};

export default useMeal;
