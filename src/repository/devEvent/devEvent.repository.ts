import axios from "axios";
import { DevEventsResponse } from "../../types/devEvent/devEvent.type";
import Config from "../../config/config.json";

class DevEventRepository {
  public async getDevEvents(): Promise<DevEventsResponse> {
    const { data } = await axios.get(
      `${Config.DEV_EVENT_URL}/?sort=deadline&payable=all&category=tag.it2`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return data;
  }
}

export default new DevEventRepository();
