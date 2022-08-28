import { Place } from "types/place/place.type";
import { TimeTable } from "types/timeTable/timeTable.type";

export interface StudyRoom {
  idx: number;
  name: string;
  placeType: number;
}

export interface AppliedStudyRoom {
  date: string;
  id: number;
  place: Place;
  status: "CHECKED" | "PENDING";
  student: {
    id: number;
  } | null;
  teacher: {
    id: number;
  } | null;
  timeTable: TimeTable;
}

export interface ApplyStudyRoom {
  placeId: number | null;
  timeTableId: number;
}

export interface DefaultStudyRoom extends AppliedStudyRoom {}

export interface MyStudyRoomsResponse extends Response {
  data: AppliedStudyRoom[];
}

export interface MyDefaultStudyRoomResponse {
  data: DefaultStudyRoom[];
}
