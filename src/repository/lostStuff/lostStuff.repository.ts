import { dodamV6Axios } from "@src/lib/axios/customAxios";
import { MyLostStuffsResponse } from "@src/types/lostStuff/lostStuff.type";

class LostStuffRepository {
  public async getMyLostStuffs(): Promise<MyLostStuffsResponse> {
    const { data } = await dodamV6Axios.get("/lostfound/my");
    return data;
  }
}

export default new LostStuffRepository();
