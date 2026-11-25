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
}

export interface ProjectWeekendStudy extends PersonalWeekendStudy {
  name: string;
  description: string;
  isLeader: boolean;
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
  roomId: number;
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
  name: string | null;
  description: string | null;
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
  /** 꺼진 실은 학생 실 목록·현황표에 나오지 않고 신청도 받지 않아요. */
  enabled: boolean;
}

export type WeekendStudyRoomPeriodStatus = "AVAILABLE" | "RESERVED" | "BLOCKED";

export interface WeekendStudyRoomStatus
  extends Omit<WeekendStudyRoom, "enabled"> {
  periods: {
    period: number;
    status: WeekendStudyRoomPeriodStatus;
    /** 사용 제한 사유예요. `BLOCKED`일 때만 내려와요. */
    reason: string | null;
  }[];
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

export type WeekendStudyTime = string | { hour: number; minute: number };

export interface WeekendStudyDeadline {
  startDayOfWeek: DayOfWeek;
  /** Jackson 설정에 따라 `HH:mm:ss` 문자열 또는 객체로 내려와요. */
  startTime: WeekendStudyTime;
  endDayOfWeek: DayOfWeek;
  endTime: WeekendStudyTime;
}

export interface CheckWeekendStudyAttendanceRequest {
  userId: string;
  date: string;
  period: number;
  status: WeekendStudyAttendanceStatus;
  /** 슬롯이 끝난 뒤 고칠 때 남기는 사유예요. */
  reason?: string | null;
}

export interface CancelWeekendStudyAttendanceRequest {
  userId: string;
  date: string;
  period: number;
}

/** 학생·교시마다 한 행이에요. 아직 체크하지 않았으면 `status`가 `null`이에요. */
export interface WeekendStudyAttendanceStatusItem {
  student: WeekendStudyApplicant;
  period: number;
  type: WeekendStudyType;
  status: WeekendStudyAttendanceStatus | null;
  /** `YYYY-MM-DDTHH:mm:ss` */
  checkedAt: string | null;
  reason: string | null;
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
