export type OutSleepingStatus = "PENDING" | "ALLOWED" | "REJECTED";

export interface OutSleeping {
  publicId: string;
  reason: string;
  status: OutSleepingStatus;
  startAt: string;
  endAt: string;
}

export type OutSleepingApplyRequest = Omit<OutSleeping, "publicId" | "status">;

export interface OutSleepingApplication {
  publicId: string;
  reason: string;
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
