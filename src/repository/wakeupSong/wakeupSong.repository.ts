import { dodamV2Axios } from "../../lib/axios/customAxios";
import { MyWakeupSongsResponse } from "../../types/wakeupSong/wakeupSong.type";
import { wakeupSongsParam } from "./wakeupSong.param";

class WakeupSongRepository {
  public async getMyWakeupSongs({
    userId,
  }: wakeupSongsParam): Promise<MyWakeupSongsResponse> {
    const { data } = await dodamV2Axios.get<MyWakeupSongsResponse>(
      `/wakeup-song/user?id=${userId}`
    );

    return data;
  }
}

export default new WakeupSongRepository();
