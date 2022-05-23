import { useQuery } from "react-query";
import { wakeupSongsParam } from "../../repository/wakeupSong/wakeupSong.param";
import wakeupSongRepository from "../../repository/wakeupSong/wakeupSong.repository";

export const useGetMyWakeupSongs = ({ userId }: wakeupSongsParam) =>
  useQuery("wakeupSong/getMyWakeupSongs", () =>
    wakeupSongRepository.getMyWakeupSongs({ userId })
  );
