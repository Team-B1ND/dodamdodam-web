export type OutSleepingStatus = "PENDING" | "ALLOWED" | "REJECTED";

export interface OutSleeping {
  publicId: string;
  reason: string;
  status: OutSleepingStatus;
  startAt: string;
  endAt: string;
}

export type OutSleepingApplyRequest = Omit<OutSleeping, "publicId" | "status">