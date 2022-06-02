export interface getMyLeavesParam {
  date: string;
}

export interface postApplyLeaveParam {
  leaveData: {
    endTime: string;
    reason: string;
    startTime: string;
  };
}

export interface deleteMyLeaveParam {
  idx: String;
}

export interface putMyLeaveParam {
  leaveIdx: string;
  startTime: string;
  endTime: string;
  reason: string;
}
