import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { getMyApplyStudyRoomsParam } from "../../repository/studyRoom/studyRoom.param";
import studyRoomRepository from "../../repository/studyRoom/studyRoom.repository";
import {
  ApplyStudyRoomsResponse,
  StudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";

export const useGetStudyRooms = (
  options?: UseQueryOptions<
    StudyRoomsResponse,
    AxiosError,
    StudyRoomsResponse,
    "studyRoom/getStudyRooms"
  >
) =>
  useQuery(
    "studyRoom/getStudyRooms",
    () => studyRoomRepository.getStudyRooms(),
    options
  );

export const useGetMyApplyStudyRooms = (
  { date }: getMyApplyStudyRoomsParam,
  options?: UseQueryOptions<
    ApplyStudyRoomsResponse,
    AxiosError,
    ApplyStudyRoomsResponse,
    "studyRoom/getMyApplyStudyRooms"
  >
) =>
  useQuery(
    "studyRoom/getMyApplyStudyRooms",
    () => studyRoomRepository.getMyApplyStudyRooms({ date }),
    options
  );
