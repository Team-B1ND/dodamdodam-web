import { DevEventsResponse } from "../../types/devEvent/devEvent.type";
import { dodamV3Axios } from "../../lib/axios/customAxios";

class DevEventRepository {
  public async getDevEvents(): Promise<DevEventsResponse> {
    const { data } = await dodamV3Axios.get("/conference/codenary");
    return data;
  }
}

export default new DevEventRepository();
