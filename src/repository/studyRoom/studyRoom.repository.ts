import { dodamV2Axios } from "../../lib/axios/customAxios";
import {
  MyDefaultStudyRoomResponse,
  MyStudyRoomsResponse,
  StudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";
import {
  getMyDefaultStudyRoomsParam,
  getMyStudyRoomsParam,
  putApplyStudyRoomsParam,
} from "./studyRoom.param";

class StudyRoomRepository {
  public async getStudyRooms(): Promise<StudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<StudyRoomsResponse>("/place");
    return data;
  }

  public async getMyStudyRooms({
    date,
  }: getMyStudyRoomsParam): Promise<MyStudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<MyStudyRoomsResponse>(
      `/location/my?date=${date}`
    );
    return data;
  }

  public async getMyDefaultStudyRooms({
    dayIdx,
  }: getMyDefaultStudyRoomsParam): Promise<MyDefaultStudyRoomResponse> {
    const { data } = await dodamV2Axios.get<MyDefaultStudyRoomResponse>(
      `/location/default/${dayIdx}`
    );
    return data;
  }

  public async postApplyStudyRooms({
    locations,
  }: putApplyStudyRoomsParam): Promise<void> {
    await dodamV2Axios.post("/location", { locations });
  }
}

export default new StudyRoomRepository();
