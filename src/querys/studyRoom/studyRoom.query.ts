import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getMyStudyRoomsParam } from "../../repository/studyRoom/studyRoom.param";
import studyRoomRepository from "../../repository/studyRoom/studyRoom.repository";
import {
  MyStudyRoomsResponse,
  StudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";

export const useGetStudyRooms = (
  options?: UseQueryOptions<
    StudyRoomsResponse,
    AxiosError,
    StudyRoomsResponse,
    "studyRoom/getStudyRooms"
  >
): UseQueryResult<StudyRoomsResponse, AxiosError> =>
  useQuery(
    "studyRoom/getStudyRooms",
    () => studyRoomRepository.getStudyRooms(),
    options
  );

export const useGetMyStudyRooms = (
  { date }: getMyStudyRoomsParam,
  options?: UseQueryOptions<
    MyStudyRoomsResponse,
    AxiosError,
    MyStudyRoomsResponse,
    "studyRoom/getMyStudyRooms"
  >
): UseQueryResult<MyStudyRoomsResponse, AxiosError> =>
  useQuery(
    "studyRoom/getMyStudyRooms",
    () => studyRoomRepository.getMyStudyRooms({ date }),
    options
  );
