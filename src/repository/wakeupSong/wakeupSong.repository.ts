import { dodamV2Axios } from "../../lib/axios/customAxios";
import {
  MyWakeupSongsResponse,
  TodayWakeupSongsResponse,
} from "../../types/wakeupSong/wakeupSong.type";
import {
  getTodayWakeupSongParam,
  getWakeupSongsParam,
} from "./wakeupSong.param";

class WakeupSongRepository {
  public async getMyWakeupSongs({
    userId,
  }: getWakeupSongsParam): Promise<MyWakeupSongsResponse> {
    const { data } = await dodamV2Axios.get<MyWakeupSongsResponse>(
      `/wakeup-song/user?id=${userId}`
    );

    return data;
  }

  public async getTodayWakeupSongs({
    year,
    month,
    date,
  }: getTodayWakeupSongParam): Promise<TodayWakeupSongsResponse> {
    const { data } = await dodamV2Axios.get<TodayWakeupSongsResponse>(
      `/wakeup-song?year=${year}&month=${month}&date=${date}`
    );
    return data;
  }
}

export default new WakeupSongRepository();
