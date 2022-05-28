import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getWakeupSongsParam } from "../../repository/wakeupSong/wakeupSong.param";
import wakeupSongRepository from "../../repository/wakeupSong/wakeupSong.repository";
import { MyWakeupSongsResponse } from "../../types/wakeupSong/wakeupSong.type";

export const useGetMyWakeupSongs = (
  { userId }: getWakeupSongsParam,
  options?: UseQueryOptions<
    MyWakeupSongsResponse,
    AxiosError,
    MyWakeupSongsResponse,
    "wakeupSong/getMyWakeupSongs"
  >
): UseQueryResult<MyWakeupSongsResponse, AxiosError> =>
  useQuery(
    "wakeupSong/getMyWakeupSongs",
    () => wakeupSongRepository.getMyWakeupSongs({ userId }),
    options
  );
