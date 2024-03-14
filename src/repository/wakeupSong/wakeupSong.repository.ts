import { dodamTestAxios, dodamV6Axios } from "@src/lib/axios/customAxios";
import {
  MyWakeupSongsResponse,
  TodayAllowedWakeupSongsResponse,
} from "@src/types/wakeupSong/wakeupSong.type";
import { getTodayAllowedWakeupSongParam } from "./wakeupSong.param";

class WakeupSongRepository {
  public async getMyWakeupSongs(): Promise<MyWakeupSongsResponse> {
    const { data } = await dodamTestAxios.get("/wakeup-song/my");
    return data;
  }

  public async getTodayAllowedWakeupSongs({
    year,
    month,
    day,
  }: getTodayAllowedWakeupSongParam): Promise<TodayAllowedWakeupSongsResponse> {
    const { data } = await dodamTestAxios.get(
      `/wakeup-song/allowed?year=${year}&month=${month}&day=${day}`
    );
    return data;
  }
}

export default new WakeupSongRepository();
