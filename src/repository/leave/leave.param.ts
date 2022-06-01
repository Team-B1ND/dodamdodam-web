export interface getMyLeavesParam {
  date: string;
}

export interface deleteMyLeaveParam {
  idx: String;
}

export interface putMyLeaveParam {
  passIdx: string;
  startTime: string;
  endTime: string;
  reason: string;
}
