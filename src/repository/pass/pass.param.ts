export interface getMyPassesParam {
  date: string;
}

export interface deleteMyPassParam {
  idx: string;
}

export interface postApplyPassParam {
  passData: { endTime: string; reason: string; startTime: string };
}

export interface putMyPassParam {
  passIdx: string;
  passData: { endTime: string; reason: string; startTime: string };
}
