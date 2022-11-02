export interface Pass {
  endOutDate: string;
  reason: string;
  startOutDate: string;
}

export interface AppliedPass extends Pass {
  arrivedDate: null | string;
  checkedDate: null | string;
  id: number;
  status: "ALLOWED" | "PENDING";
  studenr: {
    id: number;
  };
  teacher: {
    id: number;
  };
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
  data: AppliedPass[];
}
