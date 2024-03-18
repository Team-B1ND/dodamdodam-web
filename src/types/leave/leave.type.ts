import { Student } from "../member/member.type";
import { Response } from "../util/response.type";

export interface Leave {
  endAt: string;
  reason: string;
  startAt: string;
}

export interface AppliedLeave {
  id: number;
  reason: string;
  status: string; //ALLOWED, PENDING, DENY
  student: Student;
  startAt: string;
  endAt: string;
  createdAt: string;
  modifiedAt: string;
}

export interface ApplyLeave {
  reason: string;
  startTimeDate: string;
  startTimeHour: string;
  startTimeMinute: string;
  endTimeDate: string;
  endTimeHour: string;
  endTimeMinute: string;
  idx: number;
}

export interface MyLeavesResponse extends Response {
  data: AppliedLeave[];
}
