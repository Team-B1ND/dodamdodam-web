import { track } from "@amplitude/analytics-browser";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { mealDateAtom } from "../../store/meal/mealStore";

const useHandleMealDate = () => {
  const [, setDate] = useRecoilState(mealDateAtom);

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
    handleMealDate,
    prevMealDate,
    nextMealDate,
  };
};

export default useHandleMealDate;
