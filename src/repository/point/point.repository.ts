import { dodamV2Axios } from "lib/axios/customAxios";
import { PointResponse } from "types/point/point.type";

class PointRepository {
  public async getMyMerit(): Promise<PointResponse> {
    const { data } = await dodamV2Axios.get("/point/my/thisyear?type=1");
    return data;
  }

  public async getMyDemerit(): Promise<PointResponse> {
    const { data } = await dodamV2Axios.get("/point/my/thisyear?type=2");
    return data;
  }

  public async getMyOffsetPoint(): Promise<PointResponse> {
    const { data } = await dodamV2Axios.get("/point/my/thisyear?type=3");

    return data;
  }
}

export default new PointRepository();
