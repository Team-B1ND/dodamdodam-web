import { DevEventsResponse } from "../../types/devEvent/devEvent.type";
import { dodamV6Axios } from "../../lib/axios/customAxios";

class DevEventRepository {
  public async getDevEvents(): Promise<DevEventsResponse> {
    const { data } = await dodamV6Axios.get("/conference/codenary");
    return data;
  }
}

export default new DevEventRepository();
