export interface NightStudy {
  id: string;
  description: string;
  period: number;
  startAt: string;
  endAt: string;
  rejectionReason: string | null;
  isLeader: boolean;
  status: NightStudyStatus;
}

export interface ProjectNightStudy extends NightStudy {
  name: string;
}

export interface PersonalNightStudy extends NightStudy {
  needPhone: boolean;
  needPhoneReason: string | null;
}

export type NightStudyStatus = "PENDING" | "ALLOWED" | "REJECTED";

export type ProjectNightStudyApplyRequest = Omit<
  ProjectNightStudy,
  "isLeader" | "id" | "rejectionReason" | "status"
> & {
  members: string[];
};

export type PersonalNightStudyApplyRequest = Omit<
  PersonalNightStudy,
  "isLeader" | "id" | "rejectionReason" | "status"
>;

export interface BanStatusResponse {
  userId: string;
  reason: string;
  endAt: string;
  createdAt: string;
}
