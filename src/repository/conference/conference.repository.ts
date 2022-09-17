import axios from "axios";
import { ConferencesResponse } from "types/conference/conference.type";
import Config from "../../config/config.json";

class ConferenceRepository {
  public async getConferences(): Promise<ConferencesResponse> {
    const { data } = await axios.get(Config.DEV_EVENT_URL);
    return data;
  }
}

export default new ConferenceRepository();
