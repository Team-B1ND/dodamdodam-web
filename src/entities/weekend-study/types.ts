export type WeekendStudyStatus = "PENDING" | "ALLOWED" | "REJECTED";

export type WeekendStudyType = "PERSONAL" | "PROJECT";

export type WeekendStudyAttendanceStatus = "ATTENDANCE" | "LATE" | "ABSENT";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface WeekendStudyRoomInfo {
  id: number;
  name: string;
}

export interface PersonalWeekendStudy {
  id: string;
  /** `YYYY-MM-DD` */
  date: string;
  periods: number[];
  status: WeekendStudyStatus;
  rejectionReason: string | null;
}

export interface ProjectWeekendStudy extends PersonalWeekendStudy {
  name: string;
  description: string;
  isLeader: boolean;
  wishRoom: WeekendStudyRoomInfo | null;
  room: WeekendStudyRoomInfo | null;
}

export interface PersonalWeekendStudyApplyRequest {
  date: string;
  periods: number[];
}

export interface ProjectWeekendStudyApplyRequest {
  name: string;
  description: string;
  date: string;
  periods: number[];
  members: string[];
  wishRoomId?: number | null;
}

export interface WeekendStudyApplicant {
  publicId: string;
  username: string;
  name: string;
  phone: string | null;
  profileImage: string | null;
  status: string;
  roles: string[];
  student: {
    grade: number;
    room: number;
    number: number;
  } | null;
  teacher: {
    position: string;
  } | null;
}

export interface WeekendStudyApplication {
  id: string;
  type: WeekendStudyType;
  date: string;
  periods: number[];
  status: WeekendStudyStatus;
  rejectionReason: string | null;
  name: string | null;
  description: string | null;
  wishRoom: WeekendStudyRoomInfo | null;
  room: WeekendStudyRoomInfo | null;
  leader: WeekendStudyApplicant;
  members: WeekendStudyApplicant[];
}

export interface WeekendStudyApplicationsParams {
  date: string;
  type: WeekendStudyType;
  page: number;
  size?: number;
}

export interface WeekendStudyRoom {
  id: number;
  name: string;
  floor: number;
}

export interface SaveWeekendStudyRoomRequest {
  name: string;
  floor: number;
}

export interface WeekendStudyRoomBlock {
  id: number;
  period: number;
  description: string;
  startAt: string;
  endAt: string;
}

export interface BlockWeekendStudyRoomRequest {
  startAt: string;
  endAt: string;
  periods: number[];
  description: string;
}

export interface WeekendStudyDeadline {
  startDayOfWeek: DayOfWeek;
  /** `HH:mm:ss` */
  startTime: string;
  endDayOfWeek: DayOfWeek;
  endTime: string;
}

export interface CheckWeekendStudyAttendanceRequest {
  userId: string;
  date: string;
  period: number;
  status: WeekendStudyAttendanceStatus;
}

export interface WeekendStudyAttendanceSummary {
  student: WeekendStudyApplicant;
  attendance: number;
  late: number;
  absent: number;
}

export interface WeekendStudyAttendanceSummaryParams {
  startAt: string;
  endAt: string;
  page: number;
  size?: number;
}
