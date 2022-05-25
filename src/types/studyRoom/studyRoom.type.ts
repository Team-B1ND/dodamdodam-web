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

export interface ApplyStudyRoom {
  checkedTeacherIdx: number | null;
  date: string;
  idx: number;
  isChecked: number;
  placeIdx: number;
  studentIdx: number;
  timeTableIdx: number;
}

export interface ApplyStudyRoomsResponse extends Response {
  data: {
    locations: (ApplyStudyRoom | null)[];
  };
}
