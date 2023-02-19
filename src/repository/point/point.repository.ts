import { dodamV6Axios } from "../../lib/axios/customAxios";
import { MyPointResponse } from "../../types/point/point.type";
import { getMyPointParam } from "./point.param";

class PointRepository {
  public async getMyPoint({ year }: getMyPointParam): Promise<MyPointResponse> {
    const { data } = await dodamV6Axios.get<MyPointResponse>(
      `/point/my/score/year?year=${year}`
    );
    return data;
  }
}

export default new PointRepository();
