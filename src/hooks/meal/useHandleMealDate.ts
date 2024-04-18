import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { mealDateAtom } from "@src/store/meal/mealStore";
import { useLogGA } from "../ga/useLogGA";

const useHandleMealDate = () => {
  const [, setDate] = useRecoilState(mealDateAtom);
  const { handleGALogEvent } = useLogGA();

  const handleMealDate = (e: Date) => {
    setDate(dayjs(e).format("YYYY-MM-DD"));
  };

  const prevMealDate = () => {
    setDate((prev) => dayjs(prev).subtract(1, "day").format("YYYY-MM-DD"));
  };

  const nextMealDate = () => {
    setDate((prev) => dayjs(prev).add(1, "day").format("YYYY-MM-DD"));
  };

  return {
    handleMealDate,
    prevMealDate,
    nextMealDate,
  };
};

export default useHandleMealDate;
