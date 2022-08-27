import { ApplyStudyRoom } from "types/studyRoom/studyRoom.type";

export interface getMyStudyRoomsParam {
  date: string;
}

export interface postApplyStudyRoomsParam {
  studyRoomList: ApplyStudyRoom[];
}
