import { dodamV2Axios } from "../../lib/axios/customAxios";
import { WakeupSongsResponse } from "../../types/wakeupSong/wakeupSong.type";
import { wakeupSongsParam } from "./wakeupSong.param";

class WakeupSongRepository {
  public async getWakeupSongs({
    userId,
  }: wakeupSongsParam): Promise<WakeupSongsResponse> {
    const { data } = await dodamV2Axios.get<WakeupSongsResponse>(
      `/wakeup-song/user?id=${userId}`
    );

    return data;
  }
}

export default new WakeupSongRepository();
