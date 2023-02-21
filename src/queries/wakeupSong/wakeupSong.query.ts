import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getTodayAllowedWakeupSongParam } from "@src/repository/wakeupSong/wakeupSong.param";

import wakeupSongRepository from "@src/repository/wakeupSong/wakeupSong.repository";
import {
  MyWakeupSongsResponse,
  TodayAllowedWakeupSongsResponse,
} from "@src/types/wakeupSong/wakeupSong.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyWakeupSongsQuery = (
  options?: UseQueryOptions<
    MyWakeupSongsResponse,
    AxiosError,
    MyWakeupSongsResponse,
    string
  >
): UseQueryResult<MyWakeupSongsResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.wakeupSong.getMy,
    () => wakeupSongRepository.getMyWakeupSongs(),
    options
  );

export const useGetTodayAllowedWakeupSongQuery = (
  { year, month, day }: getTodayAllowedWakeupSongParam,
  options?: UseQueryOptions<
    TodayAllowedWakeupSongsResponse,
    AxiosError,
    TodayAllowedWakeupSongsResponse,
    string
  >
): UseQueryResult<TodayAllowedWakeupSongsResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.wakeupSong.getToday,
    () => wakeupSongRepository.getTodayAllowedWakeupSongs({ year, month, day }),
    options
  );
