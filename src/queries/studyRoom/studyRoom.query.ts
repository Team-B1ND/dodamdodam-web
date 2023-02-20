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

export const useGetMyStudyRoomsQuery = (
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

export const useGetMyDefaultStudyRoomsQuery = (
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

export const usePostApplyStudyRoomsMutation = () => {
  const mutation = useMutation(({ studyRoomList }: postApplyStudyRoomsParam) =>
    studyRoomRepository.postApplyStudyRooms({ studyRoomList })
  );

  return mutation;
};
