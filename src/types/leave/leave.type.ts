import { Response } from "../util/response.type";

export interface AppliedLeave {
  arrivedTime: null | string;
  checkParenTime: null | string;
  checkTeacherTime: null | string;
  createAt: string;
  endTime: string;
  idx: number;
  isAllowParent: number;
  isAllowTeacher: number;
  parentIdx: null | number;
  reason: string;
  startTime: string;
  studentIdx: null | number;
  teacherIdx: null | number;
}

export interface ApplyLeave {
  reason: string;
  startDate: string;
  startTimeHour: string;
  startTimeMinute: string;
  endTimeDate: string;
  endTimeHour: string;
  endTimeMinute: string;
  idx: number;
}

export interface MyLeavesResponse extends Response {
  data: {
    leave: AppliedLeave[];
  };
}
