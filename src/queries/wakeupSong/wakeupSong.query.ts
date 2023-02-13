import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getTodayAllowedWakeupSongParam } from "../../repository/wakeupSong/wakeupSong.param";

import wakeupSongRepository from "../../repository/wakeupSong/wakeupSong.repository";
import {
  MyWakeupSongsResponse,
  TodayAllowedWakeupSongsResponse,
} from "../../types/wakeupSong/wakeupSong.type";

export const useGetMyWakeupSongsQuery = (
  options?: UseQueryOptions<
    MyWakeupSongsResponse,
    AxiosError,
    MyWakeupSongsResponse,
    "wakeupSong/getMyWakeupSongs"
  >
): UseQueryResult<MyWakeupSongsResponse, AxiosError> =>
  useQuery(
    "wakeupSong/getMyWakeupSongs",
    () => wakeupSongRepository.getMyWakeupSongs(),
    options
  );

export const useGetTodayAllowedWakeupSongQuery = (
  { year, month, day }: getTodayAllowedWakeupSongParam,
  options?: UseQueryOptions<
    TodayAllowedWakeupSongsResponse,
    AxiosError,
    TodayAllowedWakeupSongsResponse,
    "wakeupsong/getTodayAllowedWakeupSong"
  >
): UseQueryResult<TodayAllowedWakeupSongsResponse, AxiosError> =>
  useQuery(
    "wakeupsong/getTodayAllowedWakeupSong",
    () => wakeupSongRepository.getTodayAllowedWakeupSongs({ year, month, day }),
    options
  );
