import { dodamV2Axios } from "../../lib/axios/customAxios";
import { MealsResponse } from "../../types/meal/meal.type";
import { getMealsParam } from "./meal.param";

class MealRepository {
  public async getMeals({
    year,
    month,
  }: getMealsParam): Promise<MealsResponse> {
    const { data } = await dodamV2Axios.get(`meal?year=${year}&month=${month}`);
    return data;
  }
}

export default new MealRepository();
