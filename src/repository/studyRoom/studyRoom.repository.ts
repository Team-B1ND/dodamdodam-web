import { dodamV2Axios, dodamV3Axios } from "../../lib/axios/customAxios";
import {
  MyDefaultStudyRoomResponse,
  MyStudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";
import {
  getMyStudyRoomsParam,
  postApplyStudyRoomsParam,
} from "./studyRoom.param";

class StudyRoomRepository {
  public async getMyStudyRooms({
    date,
  }: getMyStudyRoomsParam): Promise<MyStudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<MyStudyRoomsResponse>(
      `/location/my?date=${date}`
    );
    return data;
  }

  public async getMyDefaultStudyRooms(): Promise<MyDefaultStudyRoomResponse> {
    const { data } = await dodamV2Axios.get<MyDefaultStudyRoomResponse>(
      `/study-room/default`
    );
    return data;
  }

  public async postApplyStudyRooms({
    studyRoomList,
  }: postApplyStudyRoomsParam): Promise<void> {
    await dodamV3Axios.post("/study-room", studyRoomList);
  }
}

export default new StudyRoomRepository();
