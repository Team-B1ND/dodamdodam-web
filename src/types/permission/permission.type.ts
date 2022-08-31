import { Member } from "types/member/member.type";
import { Response } from "types/util/response.type";

export type PermissionType =
  | "CTRL_JOIN"
  | "CTRL_PERMISSION"
  | "CTRL_NOTICE"
  | "CTRL_OUT"
  | "CTRL_WAKE_UP_SONG"
  | "CTRL_SCHEDULE"
  | "CTRL_TIMETABLE"
  | "CTRL_CLASSROOM"
  | "CTRL_BUS"
  | "CTRL_PLACE"
  | "CTRL_STUDY_ROOM"
  | "CTRL_SMS"
  | "CTRL_POINT"
  | "CTRL_BANNER";

export interface Permission {
  id: number;
  member: Member;
  permission: PermissionType;
}

export interface MyPermissionResponse extends Response {
  data: Permission[];
}
