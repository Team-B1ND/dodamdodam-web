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
  };
  teacher: {
    id: number;
  };
  timeTable: TimeTable;
}

export interface ApplyStudyRoom {
  placeId: number | null;
  timeTableId: number;
}

export interface DefaultStudyRoom {
  id: number;
  place: Place;
  student: {
    id: number;
  };
  timeTable: TimeTable;
}

export interface MyStudyRoomsResponse extends Response {
  data: AppliedStudyRoom[];
}

export interface MyDefaultStudyRoomResponse {
  data: DefaultStudyRoom[];
}
