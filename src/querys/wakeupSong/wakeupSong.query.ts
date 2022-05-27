import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  getTodayWakeupSongParam,
  wakeupSongsParam,
} from "../../repository/wakeupSong/wakeupSong.param";
import wakeupSongRepository from "../../repository/wakeupSong/wakeupSong.repository";
import {
  MyWakeupSongsResponse,
  TodayWakeupSongsResponse,
} from "../../types/wakeupSong/wakeupSong.type";

export const useGetMyWakeupSongs = (
  { userId }: wakeupSongsParam,
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

export const useGetTodayWakeupSong = (
  { year, month, date }: getTodayWakeupSongParam,
  options?: UseQueryOptions<
    TodayWakeupSongsResponse,
    AxiosError,
    TodayWakeupSongsResponse,
    "wakeupsong/getTodayWakeupSong"
  >
): UseQueryResult<TodayWakeupSongsResponse, AxiosError> =>
  useQuery(
    "wakeupsong/getTodayWakeupSong",
    () => wakeupSongRepository.getTodayWakeupSongs({ year, month, date }),
    options
  );
