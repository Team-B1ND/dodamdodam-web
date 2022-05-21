import { dodamV2Axios } from "../../lib/axios/customAxios";
import { MyLostStuffsResponse } from "../../types/lostStuff/lostStuff.type";

class LostStuffRepository {
  public async getMyLostStuffs(): Promise<MyLostStuffsResponse> {
    const { data } = await dodamV2Axios.get("/lost/my");
    return data;
  }
}

export default new LostStuffRepository();
