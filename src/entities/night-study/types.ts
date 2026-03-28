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

export interface NightStudyUser {
  publicId: string;
  username: string;
  name: string;
  phone?: string;
  profileImage?: string;
  status: string;
  roles: string[];
  student?: {
    grade: number;
    room: number;
    number: number;
  };
  teacher?: {
    position: string;
  };
}

export interface PersonalNightStudyApplication {
  id: string;
  description: string;
  period: number;
  startAt: string;
  endAt: string;
  rejectionReason: string | null;
  status: NightStudyStatus;
  needPhone: boolean;
  needPhoneReason: string | null;
  leader: NightStudyUser;
  members: NightStudyUser[];
  type: "PERSONAL";
  room: NightStudyRoom | null;
}

export interface ProjectNightStudyApplication {
  id: string;
  name: string;
  description: string;
  period: number;
  startAt: string;
  endAt: string;
  rejectionReason: string | null;
  status: NightStudyStatus;
  needPhone: boolean;
  needPhoneReason: string | null;
  leader: NightStudyUser;
  members: NightStudyUser[];
  type: "PROJECT";
  room: NightStudyRoom | null;
}

export interface NightStudyRoom {
  id: number;
  name: string;
}

export interface CreateBanRequest {
  userId: string;
  reason: string;
  endAt: string;
}

export interface ApplicationTableFilters {
  keyword?: string;
  status?: NightStudyStatus;
  grade?: number;
  room?: number;
}
