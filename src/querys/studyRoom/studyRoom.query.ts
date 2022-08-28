import { AxiosError } from "axios";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { postApplyStudyRoomsParam } from "../../repository/studyRoom/studyRoom.param";
import studyRoomRepository from "../../repository/studyRoom/studyRoom.repository";
import {
  MyDefaultStudyRoomResponse,
  MyStudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";

export const useGetMyStudyRooms = (
  options?: UseQueryOptions<
    MyStudyRoomsResponse,
    AxiosError,
    MyStudyRoomsResponse,
    "studyRoom/getMyStudyRooms"
  >
): UseQueryResult<MyStudyRoomsResponse, AxiosError> =>
  useQuery(
    "studyRoom/getMyStudyRooms",
    () => studyRoomRepository.getMyStudyRooms(),
    options
  );

export const useGetMyDefaultStudyRooms = (
  options?: UseQueryOptions<
    MyDefaultStudyRoomResponse,
    AxiosError,
    MyDefaultStudyRoomResponse,
    "studyRoom/getMyDefaultStudyRooms"
  >
): UseQueryResult<MyDefaultStudyRoomResponse, AxiosError> =>
  useQuery(
    "studyRoom/getMyDefaultStudyRooms",
    () => studyRoomRepository.getMyDefaultStudyRooms(),
    options
  );

export const usePostApplyStudyRooms = () => {
  const mutation = useMutation(({ studyRoomList }: postApplyStudyRoomsParam) =>
    studyRoomRepository.postApplyStudyRooms({ studyRoomList })
  );

  return mutation;
};
