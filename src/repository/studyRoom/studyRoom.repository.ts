import { dodamV6Axios } from "../../lib/axios/customAxios";
import {
  MyDefaultStudyRoomResponse,
  MyStudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";
import { postApplyStudyRoomsParam } from "./studyRoom.param";

class StudyRoomRepository {
  public async getMyStudyRooms(): Promise<MyStudyRoomsResponse> {
    const { data } = await dodamV6Axios.get<MyStudyRoomsResponse>(
      `/study-room/my`
    );
    return data;
  }

  public async getMyDefaultStudyRooms(): Promise<MyDefaultStudyRoomResponse> {
    const { data } = await dodamV6Axios.get<MyDefaultStudyRoomResponse>(
      `/study-room/default`
    );
    return data;
  }

  public async postApplyStudyRooms({
    studyRoomList,
  }: postApplyStudyRoomsParam): Promise<void> {
    await dodamV6Axios.post("/study-room", { studyRoomList });
  }
}

export default new StudyRoomRepository();
