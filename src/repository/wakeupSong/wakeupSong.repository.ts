import { dodamV2Axios, dodamV3Axios } from "../../lib/axios/customAxios";
import {
  MyWakeupSongsResponse,
  TodayAllowedWakeupSongsResponse,
} from "../../types/wakeupSong/wakeupSong.type";
import { getTodayAllowedWakeupSongParam } from "./wakeupSong.param";

class WakeupSongRepository {
  public async getMyWakeupSongs(): Promise<MyWakeupSongsResponse> {
    const { data } = await dodamV3Axios.get<MyWakeupSongsResponse>(
      `/wakeup-song/my`
    );

    return data;
  }

  public async getTodayAllowedWakeupSongs({
    year,
    month,
    day,
  }: getTodayAllowedWakeupSongParam): Promise<TodayAllowedWakeupSongsResponse> {
    const { data } = await dodamV3Axios.get<TodayAllowedWakeupSongsResponse>(
      `/wakeup-song/allowed?year=${year}&month=${month}&day=${day}`
    );
    return data;
  }
}

export default new WakeupSongRepository();
