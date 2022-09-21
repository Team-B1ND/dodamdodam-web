import axios from "axios";
import {
  CompetitionResponse,
  ConferencesResponse,
} from "types/conference/conference.type";
import Config from "../../config/config.json";

class ConferenceRepository {
  public async getConferences(): Promise<ConferencesResponse> {
    const { data } = await axios.get(
      `${Config.DEV_EVENT_URL}/?category=1&fields=14&order=publish&page=1&page_size=24`
    );

    return data;
  }

  public async getCompetition(): Promise<CompetitionResponse> {
    const { data } = await axios.get(
      "/?category=2&contypes=14&order=publish&page=1&page_size=24"
    );

    console.log(data);

    return data;
  }
}

export default new ConferenceRepository();
