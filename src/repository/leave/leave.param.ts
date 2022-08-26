import { Leave } from "types/leave/leave.type";

export interface postApplyLeaveParam extends Leave {}

export interface deleteMyLeaveParam {
  outsleepingId: String;
}
export interface putMyLeaveParam extends Leave {
  outId: number;
}
