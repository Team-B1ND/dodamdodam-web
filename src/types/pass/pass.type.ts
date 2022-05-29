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
  endTime: string;
  reason: string;
  startTime: string;
}

export interface MyPassesResponse extends Response {
  data: {
    pass: AppliedPass[];
  };
}
