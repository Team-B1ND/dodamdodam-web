export interface StudyRoom {
  idx: number;
  name: string;
  placeType: number;
}

export interface StudyRoomsResponse extends Response {
  data: {
    places: StudyRoom[];
  };
}

export interface AppliedStudyRoom {
  checkedTeacherIdx: number | null;
  date: string;
  idx: number;
  isChecked: number;
  placeIdx: number;
  studentIdx: number;
  timeTableIdx: number;
}

export interface ApplyStudyRoom {
  idx: number;
  applyStudyData: StudyRoom | null;
}

export interface MyStudyRoomsResponse extends Response {
  data: {
    locations: (AppliedStudyRoom | null)[];
  };
}
