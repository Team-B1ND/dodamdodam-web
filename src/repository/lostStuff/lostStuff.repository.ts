import { dodamV6Axios } from "../../lib/axios/customAxios";
import { MyLostStuffsResponse } from "../../types/lostStuff/lostStuff.type";

class LostStuffRepository {
  public async getMyLostStuffs(): Promise<MyLostStuffsResponse> {
    const { data } = await dodamV6Axios.get("/lostfound/my");
    return data;
  }
}

export default new LostStuffRepository();
