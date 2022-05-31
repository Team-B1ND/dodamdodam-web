export interface AppliedPass {
  arrivedTime: null | string;
  checkTeacherTime: null | string;
  createAt: string;
  endTime: string;
  idx: number;
  isAllow: number;
  reason: string;
  startTime: string;
  studentIdx: number;
  teacherIdx: null | number;
}

export interface ApplyPass {
  reason: string;
  startTimeHour: string;
  startTimeMinute: string;
  endTimeHour: string;
  endTimeMinute: string;
  idx: number;
}

export interface MyPassesResponse extends Response {
  data: {
    pass: AppliedPass[];
  };
}
