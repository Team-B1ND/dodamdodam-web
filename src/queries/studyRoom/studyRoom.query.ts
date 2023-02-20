import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { postApplyStudyRoomsParam } from "@src/repository/studyRoom/studyRoom.param";
import studyRoomRepository from "@src/repository/studyRoom/studyRoom.repository";
import {
  MyDefaultStudyRoomResponse,
  MyStudyRoomsResponse,
} from "@src/types/studyRoom/studyRoom.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyStudyRoomsQuery = (
  options?: UseQueryOptions<
    MyStudyRoomsResponse,
    AxiosError,
    MyStudyRoomsResponse,
    string
  >
): UseQueryResult<MyStudyRoomsResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.studyRooms.getMy,
    () => studyRoomRepository.getMyStudyRooms(),
    options
  );

export const useGetMyDefaultStudyRoomsQuery = (
  options?: UseQueryOptions<
    MyDefaultStudyRoomResponse,
    AxiosError,
    MyDefaultStudyRoomResponse,
    string
  >
): UseQueryResult<MyDefaultStudyRoomResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.studyRooms.getMyDefault,
    () => studyRoomRepository.getMyDefaultStudyRooms(),
    options
  );

export const usePostApplyStudyRoomsMutation = () => {
  const mutation = useMutation(({ studyRoomList }: postApplyStudyRoomsParam) =>
    studyRoomRepository.postApplyStudyRooms({ studyRoomList })
  );

  return mutation;
};
