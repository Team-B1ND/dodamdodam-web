export type OutSleepingStatus = "PENDING" | "ALLOWED" | "DENIED";

export type OutSleepingReasonType =
  | "PERSONAL"
  | "TRAINING"
  | "INTERNSHIP"
  | "SILICON_VALLEY"
  | "SICK_LEAVE"
  | "ETC";

export interface OutSleeping {
  publicId: string;
  reasonType: OutSleepingReasonType;
  reason: string | null;
  status: OutSleepingStatus;
  startAt: string;
  endAt: string;
}

export interface OutSleepingApplyRequest {
  reasonType: OutSleepingReasonType;
  reason: string | null;
  startAt: string;
  endAt: string;
}

export interface OutSleepingApplication {
  publicId: string;
  reasonType: OutSleepingReasonType;
  reason: string | null;
  status: OutSleepingStatus;
  student: {
    name: string;
    grade: number;
    room: number;
    number: number;
  };
  startAt: string;
  endAt: string;
}
