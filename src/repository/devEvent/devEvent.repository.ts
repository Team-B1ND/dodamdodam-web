import { DevEventsResponse } from "@src/types/devEvent/devEvent.type";
import { dodamV6Axios } from "@src/lib/axios/customAxios";

class DevEventRepository {
  public async getDevEvents(): Promise<DevEventsResponse> {
    const { data } = await dodamV6Axios.get("/conference/codenary");
    return data;
  }
}

export default new DevEventRepository();
