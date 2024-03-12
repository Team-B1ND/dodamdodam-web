import { DevEventsResponse } from "@src/types/devEvent/devEvent.type";
import { dodamTestAxios, dodamV6Axios } from "@src/lib/axios/customAxios";

class DevEventRepository {
  public async getDevEvents(): Promise<DevEventsResponse> {
    const { data } = await dodamTestAxios.get("/conference");
    return data;
  }
}

export default new DevEventRepository();
