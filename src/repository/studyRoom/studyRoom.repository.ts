import { dodamV2Axios } from "../../lib/axios/customAxios";
import {
  ApplyStudyRoomsResponse,
  StudyRoomsResponse,
} from "../../types/studyRoom/studyRoom.type";
import { myApplyStudyRoomsParam } from "./studyRoom.param";

class StudyRoomRepository {
  public async getStudyRooms(): Promise<StudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<StudyRoomsResponse>("place");
    return data;
  }

  public async getMyApplyStudyRooms({
    date,
  }: myApplyStudyRoomsParam): Promise<ApplyStudyRoomsResponse> {
    const { data } = await dodamV2Axios.get<ApplyStudyRoomsResponse>(
      `location/my?date=${date}`
    );
    return data;
  }
}

export default new StudyRoomRepository();
