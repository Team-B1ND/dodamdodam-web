import { dodamV2Axios } from "../../lib/axios/customAxios";
import {
  ApplyStudyRoomsResponse,
  StudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";
import {
  getMyApplyStudyRoomsParam,
  putApplyStudyRoomsParam,
} from "./studyRoom.param";

class StudyRoomRepository {
  public async getStudyRooms(): Promise<StudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<StudyRoomsResponse>("place");
    return data;
  }

  public async getMyApplyStudyRooms({
    date,
  }: getMyApplyStudyRoomsParam): Promise<ApplyStudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<ApplyStudyRoomsResponse>(
      `location/my?date=${date}`
    );
    return data;
  }

  public async putApplyStudyRooms({
    applyStudyRooms,
  }: putApplyStudyRoomsParam): Promise<void> {
    await dodamV2Axios.put("/location", applyStudyRooms);
  }
}

export default new StudyRoomRepository();
