import { Leave } from "@src/types/leave/leave.type";

export interface postApplyLeaveParam extends Leave {}

export interface deleteMyLeaveParam {
  id: String;
}
export interface putMyLeaveParam extends Leave {
  outId: number;
}
