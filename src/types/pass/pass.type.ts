export interface Pass {
  reason: string;
  startAt: string;
  endAt: string;
}

export interface AppliedPass extends Pass {
  arrivedDate: null | string;
  checkedDate: null | string;
  id: number;
  status: "ALLOWED" | "PENDING";
  student: {
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
  dinnerOrNot:boolean;
  idx: number;
}

export interface MyPassesResponse extends Response {
  data: AppliedPass[];
}
