import { dodamTestAxios } from "@src/lib/axios/customAxios";
import { MyPointResponse } from "@src/types/point/point.type";
import { getMyPointParam } from "./point.param";

class PointRepository {
  public async getMyPoint({ type }: getMyPointParam): Promise<MyPointResponse> {
    const { data } = await dodamTestAxios.get<MyPointResponse>(
      `/point/my?type=${type}`
    );
    return data;
  }
}

export default new PointRepository();
