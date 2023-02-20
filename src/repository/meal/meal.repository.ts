import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { MealResponse } from "@src/types/meal/meal.type";
import { getMealParam } from "./meal.param";

class MealRepository {
  public async getMeal({
    year,
    month,
    day,
  }: getMealParam): Promise<MealResponse> {
    const { data } = await dodamV6Axios.get(
      `/meal?year=${year}&month=${month}&day=${day}`
    );
    return data;
  }
}

export default new MealRepository();
