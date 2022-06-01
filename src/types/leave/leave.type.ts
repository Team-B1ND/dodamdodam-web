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
