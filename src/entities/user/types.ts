export interface User {
  publicId: string;
  username: string;
  name: string;
  phone: string;
  profileImage?: string;
  status: string;
  roles: UserRole[];
  student?: StudentInfo;
  teacher?: TeacherInfo;
  admin?: AdminInfo;
  createdAt: string;
}

export interface StudentInfo {
  grade: number;
  room: number;
  number: number;
  isGraduated: boolean;
}

export interface TeacherInfo {
  position: string;
}

export interface AdminInfo {
  githubId: string;
}

export type UserRole =
  | "STUDENT"
  | "TEACHER"
  | "ADMIN"
  | "BROADCASTER"
  | "DORMITORY_MANAGER";

export interface FixPassword {
  postPassword: string;
  newPassword: string;
}