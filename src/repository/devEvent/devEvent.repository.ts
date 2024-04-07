import { DevEventsResponse } from "@src/types/devEvent/devEvent.type";
import { dodamAxios } from "@src/lib/axios/customAxios";

class DevEventRepository {
  public async getDevEvents(): Promise<DevEventsResponse> {
    const { data } = await dodamAxios.get("/conference");
    return data;
  }
}

export default new DevEventRepository();
